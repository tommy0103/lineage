// 校验生成后的 src/mapstyle.ts：
//   1. 所有 symbol 层的 text-font 字体栈在 style.glyphs 端点上真实可取（fetch range 0-255 验证）
//   2. 图层引用的 source-layer 在真实瓦片解码里存在——核心层缺失即失败，
//      其余缺失只告警（Bing 在当前请求参数下不下发 land_cover/admin_division1 等，见下）
// 运行：node scripts/validate-mapstyle.mjs
import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { VectorTile } from '@mapbox/vector-tile';
import Pbf from 'pbf';

const { MAP_STYLE: style } = await import('../src/mapstyle.ts');

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL: ${msg}`);
};
const warn = (msg) => console.warn(`warn: ${msg}`);

// ---------- 1. glyphs / text-font ----------
const EXPR_WORDS = new Set([
  'literal', 'match', 'get', 'step', 'zoom', 'case', 'concat', 'has', 'interpolate', 'linear',
]);
function collectFonts(v, out) {
  if (typeof v === 'string') {
    if (!EXPR_WORDS.has(v) && !/^\d/.test(v)) out.add(v);
  } else if (Array.isArray(v)) {
    // ["literal", ["Roboto-Regular"]] → 字体名在 literal 的数组参数里
    for (const item of v) collectFonts(item, out);
  }
}
const fonts = new Set();
for (const l of style.layers) {
  if (l.type === 'symbol' && l.layout?.['text-font']) collectFonts(l.layout['text-font'], fonts);
}
// 属性值（如 st-cn 的 "country_region_cn"）不是字体名，只保留真实请求过 glyphs 的栈名
const fontList = [...fonts].filter((f) => /^(Roboto|Segoe|Noto|Sora|Arial)/.test(f));
console.log(`symbol fonts: ${fontList.join(', ') || '(none)'}`);
if (!style.glyphs || !style.glyphs.includes('{fontstack}') || !style.glyphs.includes('{range}')) {
  fail(`style.glyphs 缺失或不含占位符: ${style.glyphs}`);
} else {
  for (const f of fontList) {
    const url = style.glyphs.replace('{fontstack}', encodeURIComponent(f)).replace('{range}', '0-255');
    const res = await fetch(url);
    if (!res.ok) fail(`glyphs 取字失败 ${f}: HTTP ${res.status}`);
    else console.log(`  glyphs ${f}: HTTP 200 (${(await res.arrayBuffer()).byteLength} bytes)`);
  }
}

// ---------- 2. source-layer 对照真实瓦片 ----------
const TILE_URL = (z, x, y) =>
  `https://dynamic.t0.tiles.ditu.live.com/comp/ch/${z}-${x}-${y}.mvt` +
  '?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1' +
  '&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38';
const lngLatToTile = (lng, lat, z) => {
  const n = 2 ** z;
  const rad = (lat * Math.PI) / 180;
  return [
    Math.floor(((lng + 180) / 360) * n),
    Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n),
  ];
};
const SAMPLES = [
  [2, ...lngLatToTile(90, 40, 2)],
  [5, ...lngLatToTile(121.3, 31.2, 5)],
  [10, ...lngLatToTile(121.3, 31.2, 10)],
  [12, ...lngLatToTile(121.47, 31.23, 12)],
  [14, ...lngLatToTile(121.47, 31.23, 14)],
  [10, ...lngLatToTile(119.5, 29.5, 10)],
];
const observed = new Set();
for (const [z, x, y] of SAMPLES) {
  const res = await fetch(TILE_URL(z, x, y), { headers: { 'Accept-Encoding': 'identity' } });
  if (!res.ok) {
    warn(`瓦片 z${z}/${x}/${y} HTTP ${res.status}，跳过`);
    continue;
  }
  let buf = Buffer.from(await res.arrayBuffer());
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  for (const name of Object.keys(new VectorTile(new Pbf(buf)).layers)) observed.add(name);
}
console.log(`\ntile layers observed: ${[...observed].sort().join(', ')}`);

// 核心层：缺失即失败。其余缺失只告警（Bing 按请求参数/区域选择性下发）。
const CORE = ['vector_background', 'water_feature', 'road', 'country_region', 'populated_place', 'railway_cn'];
const referenced = new Set(
  style.layers.filter((l) => l.source === 'bing-mvt').map((l) => l['source-layer'])
);
for (const sl of referenced) {
  if (observed.has(sl)) continue;
  if (CORE.includes(sl)) fail(`核心 source-layer 在采样瓦片中不存在: ${sl}`);
  else warn(`source-layer 未在采样瓦片出现（保留待 Bing 下发）: ${sl}`);
}

// ---------- 3. 引用完整性 ----------
for (const l of style.layers) {
  if (l.source && !style.sources[l.source]) fail(`图层 ${l.id} 引用了不存在的 source ${l.source}`);
  if (l.source === 'bing-mvt' && !l['source-layer']) fail(`图层 ${l.id} 缺 source-layer`);
}
// sprite 是可选的：当前样式已剔除全部 icon-image / *-pattern（位图调色够不到且高饱和），
// 只有重新引入引用 sprite 的图层而 sprite 键缺失才是问题。
const usesSprite = style.layers.some(
  (l) =>
    (l.layout && l.layout['icon-image']) ||
    (l.paint && (l.paint['fill-pattern'] || l.paint['line-pattern'] || l.paint['background-pattern']))
);
if (usesSprite && !style.sprite) fail('有图层引用 sprite 但 style.sprite 缺失');

console.log(failures ? `\n${failures} failure(s)` : '\nOK');
process.exit(failures ? 1 : 0);
