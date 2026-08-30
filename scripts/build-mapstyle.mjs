// 以 vendor 的 nearcade bing-style-zh-CN.json 为底本生成 src/mapstyle.ts。
//   保留：完整地理图层栈——陆地/地貌、水系、道路（各级）、铁路/地铁/电车/轮渡、
//         国界/省界/市界、各级地名标注（国家/省/市/镇/水体/岛屿）、交通类 POI（车站/机场/地铁/轮渡）
//   删掉：商业 POI（商场/医院/学校/景点…）、3D 建筑（buildings 栅格/footprint）、
//         交通流量（traffic/bing-traffic*）、jk/ssCoverage 等无关 source、
//         *_hd 图层组（Bing 在当前请求参数下从不下发 hd 瓦片，死图层；INCLUDE_HD 可 reopen）、
//         address（minzoom 18 超出相机 maxZoom 17）
//   调色：每个 hex/hsl 转 OKLCH 后按图层「角色」映射——亮度线性压进角色亮度带、
//         色相压向 theme 色板色相、饱和度大幅压低（晨雾玻璃基调）。角色定义见 ROLES。
//   栅格背景 LOD 瓦片是图片改不了 hex，用 raster paint 属性压淡海蓝融进 sea 色系（RASTER_PAINT）。
// URL 处理照抄 nearcade 的 fixBingStyleUrls：raster:// → https://；栅格瓦片保留 {quadkey}
// 占位符（MapLibre Native 原生支持），t0 扩展到 t0–t3。运行：node scripts/build-mapstyle.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = new URL('./vendor/bing-style-zh-CN.json', import.meta.url);
const style = JSON.parse(readFileSync(SRC, 'utf8'));

// Bing 在当前 it/features 参数下从不下发 *_hd 瓦片（z0–z18 采样验证），hd 图层组是死重量。
const INCLUDE_HD = false;

// ============ theme 色板（OKLCH，与 src/theme.ts 对应） ============
const THEME = {
  sea: { L: 0.93, C: 0.03, H: 205 },
  land: { L: 0.96, C: 0.01, H: 160 },
  landLine: { L: 0.86, C: 0.02, H: 175 },
  ink2: { L: 0.4, C: 0.02, H: 240 },
  pageBg: { L: 0.955, C: 0.015, H: 210 },
};

// ============ 角色调色参数（可调） ============
// band: 原色亮度 L∈[0,1] 线性映射到的目标亮度带；hue: 压向的色相（null=保留原色相）；
// cScale: 饱和度缩放；cCap: 饱和度上限。
const ROLES = {
  background: { fixed: THEME.pageBg },
  water: { band: [0.87, 0.955], hue: THEME.sea.H, cScale: 0.55, cCap: 0.055 },
  waterText: { band: [0.45, 0.6], hue: THEME.sea.H, cScale: 0.6, cCap: 0.08 },
  land: { band: [0.925, 0.97], hue: THEME.land.H, cScale: 1.0, cCap: 0.02 },
  landcover: { band: [0.85, 0.945], hue: THEME.land.H, cScale: 0.55, cCap: 0.06 },
  boundary: { band: [0.6, 0.86], hue: THEME.landLine.H, cScale: 0.5, cCap: 0.04 },
  // 道路分两层：casing（描边，先画）与 fill（_line_1/_line_2 后缀，盖在上面的路面）。
  // 保留原色相（高速的暖橙压淡后仍能区分等级），fill 接近白、casing 浅暖灰。
  roadCasing: { band: [0.72, 0.88], hue: null, cScale: 0.22, cCap: 0.05 },
  roadFill: { band: [0.945, 1.0], hue: null, cScale: 0.18, cCap: 0.045 },
  rail: { band: [0.42, 0.78], hue: THEME.ink2.H, cScale: 0.25, cCap: 0.03 },
  ferry: { band: [0.6, 0.8], hue: THEME.sea.H, cScale: 0.5, cCap: 0.06 },
  poiFill: { band: [0.85, 0.93], hue: THEME.landLine.H, cScale: 0.4, cCap: 0.035 },
  text: { band: [0.3, 0.5], hue: THEME.ink2.H, cScale: 0.4, cCap: 0.03 },
  textRoad: { band: [0.38, 0.55], hue: THEME.ink2.H, cScale: 0.3, cCap: 0.025 },
  halo: { band: [0.95, 1.0], hue: null, cScale: 0.2, cCap: 0.015 },
};

// 栅格 LOD 底色压淡（可调）：压饱和度、略降对比、抬高黑点，让海蓝融进 sea 色系
const RASTER_PAINT = {
  'raster-saturation': 0.35,
  'raster-contrast': -0.06,
  'raster-brightness-min': 0.06,
  'raster-brightness-max': 1.0,
  'raster-hue-rotate': 0,
};

// ============ 颜色工具：hex/hsl(a)/rgb(a) → OKLCH → hex ============
// MapLibre Native 要求 line-dasharray 至少两个元素；底本里低 zoom 档位存在
// ["literal",[x]] 单元素写法（意为实线）。统一把单元素补成 [x, 0]（零间隙 = 实线）。
function fixDasharray(value) {
  if (!Array.isArray(value)) return value;
  if (value.length === 1 && typeof value[0] === 'number') return [value[0], 0];
  return value.map((v) =>
    Array.isArray(v) && v[0] === 'literal' && Array.isArray(v[1]) && v[1].length === 1
      ? ['literal', [v[1][0], 0]]
      : Array.isArray(v)
        ? fixDasharray(v)
        : v,
  );
}

function srgbToOklch(r, g, b) {
  const lin = (x) => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
  const rl = lin(r), gl = lin(g), bl = lin(b);
  const l = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
  const m = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
  const s = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, b2), H: ((Math.atan2(b2, a) * 180) / Math.PI + 360) % 360 };
}

function oklchToSrgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gam = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 5 / 12) - 0.055);
  const cl = (x) => Math.min(1, Math.max(0, x));
  return [r, g, bl].map((v) => cl(gam(cl(v))));
}

// 解析 #rgb/#rgba/#rrggbb/#rrggbbaa、hsl(a)()、rgb(a)() → { L, C, H, A }，无法解析返回 null
function parseColor(str) {
  let m = str.match(/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join('');
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const A = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { ...srgbToOklch(r, g, b), A };
  }
  m = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const h = parseFloat(m[1]) / 360, s = parseFloat(m[2]) / 100, l = parseFloat(m[3]) / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue2rgb = (t) => {
      t = ((t % 1) + 1) % 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const r = hue2rgb(h + 1 / 3), g = hue2rgb(h), b = hue2rgb(h - 1 / 3);
    const A = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { ...srgbToOklch(r, g, b), A };
  }
  m = str.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const A = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { ...srgbToOklch(parseFloat(m[1]) / 255, parseFloat(m[2]) / 255, parseFloat(m[3]) / 255), A };
  }
  return null;
}

function toHex({ L, C, H, A }) {
  const [r, g, b] = oklchToSrgb(L, C, H);
  const to = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  return '#' + to(r) + to(g) + to(b) + (A < 1 ? to(A) : '');
}

function applyRole(color, role) {
  const r = ROLES[role];
  if (r.fixed) return { ...r.fixed, A: color.A };
  const [l0, l1] = r.band;
  return {
    L: l0 + color.L * (l1 - l0),
    C: Math.min(color.C * r.cScale, r.cCap),
    H: r.hue ?? color.H,
    A: color.A,
  };
}

// ============ 图层角色分类 ============
function roleOf(layer) {
  const sl = layer['source-layer'] || '';
  const t = layer.type;
  if (t === 'background') return 'background';
  if (sl === 'water_feature' || sl === 'water_pattern_area' || sl === 'water_point')
    return t === 'symbol' ? 'waterText' : 'water';
  if (sl === 'ferry_route') return t === 'symbol' ? 'waterText' : 'ferry';
  if (sl === 'vector_background' || sl === 'island') return t === 'symbol' ? 'text' : 'land';
  if (
    sl.startsWith('land_cover') ||
    sl === 'reserve' ||
    sl === 'garden' ||
    sl === 'indigenous_peoples_reserve' ||
    sl === 'national_park'
  )
    return t === 'symbol' ? 'text' : 'landcover';
  if (sl === 'country_region' || sl.startsWith('admin_division'))
    return t === 'symbol' ? 'text' : 'boundary';
  if (sl === 'road' || sl === 'road_hd' || sl === 'divider') {
    if (t === 'symbol') return 'textRoad';
    return /_line_[12](-merged\d+)?$/.test(layer.id) ? 'roadFill' : 'roadCasing';
  }
  if (sl === 'junction' || sl === 'junction_hd') return 'textRoad';
  if (/^(railway|railway_cn|railway_hd|tramway|autorail|transit|transit_hd)$/.test(sl))
    return t === 'symbol' ? 'text' : 'rail';
  if (t === 'symbol') return 'text';
  return 'poiFill';
}

// 递归改写图层里所有颜色字符串（含 interpolate/step/match/case 表达式内部的）；
// key 为 text-halo-color 时一律走 halo 角色
function recolor(value, role, key) {
  if (typeof value === 'string') {
    const c = parseColor(value);
    if (!c) return value;
    return toHex(applyRole(c, key === 'text-halo-color' ? 'halo' : role));
  }
  if (Array.isArray(value)) return value.map((v) => recolor(v, role, key));
  if (value && typeof value === 'object') {
    const o = {};
    for (const [k, v] of Object.entries(value)) o[k] = recolor(v, role, k);
    return o;
  }
  return value;
}

// ============ 数据驱动颜色 ============
// 地铁线颜色是 ["case",["has","official-color"],["get","official-color"],"#BFB9BD"]：
// 瓦片里每条线的官方色（大红大绿大紫）静态调色够不到，运行时才会取值。
// 不一刀切替换成固定色（那样高速/高铁/地铁糊成一片）——用 MapLibre 表达式在运行时做
// 「保色相压饱和 + 轻度提亮」：每个通道向灰度按 DD_DESAT 比例收拢（色相保留、线路可分），
// 再向白色提亮 DD_LIFT（去掉暗色线的沉重感）。to-rgba/rgba/let/var/at 都是 style spec
// 标准表达式，MapLibre Native 支持。
const DD_DESAT = 0.42; // 0=纯灰 1=原色：保留色相的比例
const DD_LIFT = 0.16; // 向白提亮的比例

function hasDataDrivenColor(v) {
  if (!Array.isArray(v)) return false;
  if (v[0] === 'get' && typeof v[1] === 'string' && /color/i.test(v[1])) return true;
  return v.some(hasDataDrivenColor);
}

function clamp255(e) {
  return ['max', 0, ['min', 255, e]];
}

function muteDataDrivenColor(colorExpr) {
  const ch = (i) => ['at', i, ['var', 'rgb']];
  const mixed = (i) => ['+', ['var', 'gray'], ['*', DD_DESAT, ['-', ch(i), ['var', 'gray']]]];
  const lifted = (i) => ['+', mixed(i), ['*', ['-', 255, mixed(i)], DD_LIFT]];
  return [
    'let', 'rgb', ['to-rgba', colorExpr],
    ['let', 'gray', ['+', ['*', 0.2126, ch(0)], ['*', 0.7152, ch(1)], ['*', 0.0722, ch(2)]],
      ['rgba', clamp255(lifted(0)), clamp255(lifted(1)), clamp255(lifted(2)), ch(3)],
    ],
  ];
}

function fixDataDrivenColors(paint, role) {
  for (const [k, v] of Object.entries(paint)) {
    if (!k.endsWith('-color') || !hasDataDrivenColor(v)) continue;
    paint[k] = muteDataDrivenColor(v);
    console.log(`  data-driven color → hue-preserving desat: ${k}`);
  }
}

// ============ sources ============
const KEEP_SOURCES = new Set(['bing-mvt', 'background_LOD1', 'background_LOD7', 'background_LOD12']);
const sources = {};
for (const [id, src] of Object.entries(style.sources)) {
  if (!KEEP_SOURCES.has(id)) continue;
  const s = JSON.parse(JSON.stringify(src));
  if (Array.isArray(s.tiles)) {
    const t0 = s.tiles.map((u) => u.replace('raster://', 'https://'));
    s.tiles = t0.flatMap((u) => [0, 1, 2, 3].map((i) => u.replace(/dynamic\.t\d+\./, `dynamic.t${i}.`)));
  }
  if (id === 'bing-mvt') s.attribution = '© Microsoft Corporation - GS(2025)3133号';
  sources[id] = s;
}

// ============ 图层取舍 ============
// fill：陆地/地貌/水系/岛屿/绿地/机场/车站类/道路分隔带
const KEEP_FILL_SL = new Set([
  'vector_background',
  'land_cover_grass', 'land_cover_forest', 'land_cover_urban', 'land_cover_snow_and_ice',
  'water_feature', 'water_pattern_area', 'island',
  'reserve', 'indigenous_peoples_reserve', 'garden',
  'airport', 'airport_runway', 'airport_terminal',
  'railway_station', 'metro_station', 'bus_station', 'ferry_terminal', 'transportation_structure',
  'divider',
]);
// line：国界/省界/市界、道路、铁路/地铁/电车/APM、轮渡、水系岸线、机场轮廓
const KEEP_LINE_SL = new Set([
  'country_region', 'admin_division1', 'admin_division2',
  'road', 'road_hd',
  'railway', 'railway_cn', 'railway_hd', 'tramway', 'autorail', 'ferry_route',
  'water_feature', 'water_pattern_area',
  'divider', 'airport', 'airport_runway', 'airport_terminal',
]);
// symbol：地名（国家/省/市/镇/街区/水体/岛屿/山/公园）、道路名与编号、交通 POI
const KEEP_SYMBOL_SL = new Set([
  'continent', 'country_region', 'sov_capital', 'beijing', 'macao', 'taipei', 'new_taipei', 'taoyuan',
  'admin_division1', 'admin_division2', 'neighborhood', 'populated_place',
  'label_orientation_bottom', 'label_orientation_bottom_left', 'label_orientation_bottom_right',
  'label_orientation_middle_left', 'label_orientation_middle_right',
  'label_orientation_top_center', 'label_orientation_top_right',
  'water_feature', 'water_point', 'water_pattern_area', 'archipelago', 'island',
  'mountain', 'national_park', 'reserve', 'indigenous_peoples_reserve',
  'railway_station', 'metro_station', 'metro_transfer_station', 'multi_modal_station',
  'bus_station', 'bus_station_hd', 'ferry_terminal',
  'airport', 'airport_runway', 'airport_terminal',
  'transit', 'transit_hd', 'station_entrance',
  'railway_cn', 'railway_hd', 'autorail', 'tramway', 'ferry_route',
  'road', 'road_hd', 'junction', 'junction_hd',
]);

const KEEP_BY_TYPE = { fill: KEEP_FILL_SL, line: KEEP_LINE_SL, symbol: KEEP_SYMBOL_SL };

const kept = [];
const dropped = {};
for (const layer of style.layers) {
  let keep = false;
  if (layer.type === 'background') keep = true;
  else if (layer.type === 'raster' && layer.source.startsWith('background_LOD')) keep = true;
  else if (layer.source === 'bing-mvt' && KEEP_BY_TYPE[layer.type]) {
    const sl = layer['source-layer'];
    keep =
      KEEP_BY_TYPE[layer.type].has(sl) &&
      (INCLUDE_HD || !sl.endsWith('_hd')) &&
      // line-width 恒 0 的层不可见，是死重量
      !(layer.paint && layer.paint['line-width'] === 0);
  }
  if (!keep) {
    const k = `${layer.type}:${layer['source-layer'] || layer.source || '-'}`;
    dropped[k] = (dropped[k] || 0) + 1;
    continue;
  }
  const l = JSON.parse(JSON.stringify(layer));
  if (l.type === 'raster') {
    l.paint = { ...l.paint, ...RASTER_PAINT };
  } else {
    // sprite 位图（道路盾牌、地铁/车站 POI 图标、单行道箭头、红绿灯、湿地纹理）
    // 调色够不到且高饱和：pattern 层与纯图标 symbol 层整层删除；
    // 带文字的 symbol 层删掉 icon-* 只留文字。
    if (l.paint && (l.paint['fill-pattern'] || l.paint['line-pattern'])) {
      dropped[`pattern:${l['source-layer']}`] = (dropped[`pattern:${l['source-layer']}`] || 0) + 1;
      continue;
    }
    if (l.type === 'symbol' && l.layout && l.layout['icon-image']) {
      if (!l.layout['text-field']) {
        dropped[`icon-only:${l['source-layer']}`] = (dropped[`icon-only:${l['source-layer']}`] || 0) + 1;
        continue;
      }
      for (const k of Object.keys(l.layout)) if (k.startsWith('icon-')) delete l.layout[k];
    }
    const role = roleOf(l);
    if (l.paint) {
      l.paint = recolor(l.paint, role, null);
      fixDataDrivenColors(l.paint, role);
      if (l.paint['line-dasharray']) l.paint['line-dasharray'] = fixDasharray(l.paint['line-dasharray']);
    }
    if (l.layout) l.layout = recolor(l.layout, role, null);
  }
  kept.push(l);
}

// glyphs：复用 Bing 自带字形端点（与瓦片同域，text-font 的 Roboto-* 栈原生对齐，含 CJK）。
// sprite：图标/pattern 已全部剔除（见上），若未来重新引入带 icon-image 或 *-pattern
// 的图层，需恢复 sprite: style.sprite.replace('raster://', 'https://')。
const spriteUsed = kept.some(
  (l) =>
    (l.layout && l.layout['icon-image']) ||
    (l.paint && (l.paint['fill-pattern'] || l.paint['line-pattern'] || l.paint['background-pattern'])),
);
if (spriteUsed) throw new Error('仍有图层引用 sprite，检查图标剔除逻辑');
const out = {
  version: 8,
  name: 'lineage-bing-morning-glass',
  glyphs: style.glyphs,
  sources,
  layers: kept,
};

const ts =
  '// 本文件由 scripts/build-mapstyle.mjs 生成，请勿手改（调参改生成器里的 ROLES / RASTER_PAINT）。\n' +
  '// 底本：scripts/vendor/bing-style-zh-CN.json（nearcade 线上验证过的 Bing 中国版样式）。\n' +
  '// 完整地理图层栈（道路/铁路/水系/地貌/边界/地名/交通 POI），OKLCH 晨雾玻璃调色，\n' +
  '// glyphs 用 Bing 端点（Roboto-* 栈）；sprite 图标/pattern 已全部剔除（位图调色够不到且高饱和），\n' +
  '// 数据驱动颜色（地铁官方色等）由运行时表达式保色相压饱和（生成器 DD_DESAT/DD_LIFT）。\n' +
  '// 城市点 / 光晕 / 导入动画由 RealMap.tsx 以 GeoJSONSource 叠加在顶层。\n' +
  `export const MAP_STYLE = ${JSON.stringify(out, null, 2)} as const;\n` +
  '\n' +
  '// 点亮城市的 Bing 地名剔除是运行时行为：名单来自当前数据（data.ts 的 litCityNames()），\n' +
  '// 新城市被点亮时用新名单重建样式即可，与生成器解耦。\n' +
  'export function buildMapStyle(excludeNames: string[]) {\n' +
  '  if (!excludeNames.length) return MAP_STYLE;\n' +
  '  const layers = (MAP_STYLE.layers as readonly Record<string, unknown>[]).map((l) => {\n' +
  "    const sl = l['source-layer'];\n" +
  "    // populated_place/sov_capital 是常规地名；beijing/taipei/new_taipei/macao 是首都/特区专属层\n" +
  "    if (l.type === 'symbol' && ['populated_place', 'sov_capital', 'beijing', 'taipei', 'new_taipei', 'macao'].includes(sl as string)) {\n" +
  "      const excl = ['!', ['in', ['get', 'name'], ['literal', excludeNames]]];\n" +
  "      return { ...l, filter: l.filter ? ['all', l.filter, excl] : excl };\n" +
  '    }\n' +
  '    return l;\n' +
  '  });\n' +
  '  return { ...MAP_STYLE, layers };\n' +
  '}\n';
writeFileSync(new URL('../src/mapstyle.ts', import.meta.url), ts);

console.log(`kept ${kept.length}/${style.layers.length} layers`);
console.log('dropped by type:source-layer:');
for (const [k, v] of Object.entries(dropped).sort()) console.log(`  ${v}× ${k}`);
const roles = {};
for (const l of kept) roles[roleOf(l)] = (roles[roleOf(l)] || 0) + 1;
console.log('kept by role:', JSON.stringify(roles));
console.log(`mapstyle.ts ${Buffer.byteLength(ts)} bytes`);
