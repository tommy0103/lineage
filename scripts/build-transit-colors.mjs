// 从 Bing 瓦片提取地铁/轨道交通线的官方色（official-color），逐色做「保色相和谐化」，
// 产出 src/transit-colors.ts（官方色 → 晨雾基调色 的映射表）。
// 构建期脚本，离线数据进包，运行时不依赖网络。运行：node scripts/build-transit-colors.mjs
//
// 和谐化（culori OKLCH）：色相保留（线路可区分），亮度夹进 [0.56, 0.72]，
// 饱和度封顶 0.12。注意：压暗≠和谐——线是细要素，亮度带要偏中亮、给足饱和才读得出身份，
// 更早的 [0.45,0.68] + 0.11 出来全是脏深色，和浅底图不搭。
import { gunzipSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { VectorTile } from '@mapbox/vector-tile';
import Pbf from 'pbf';
import { converter, formatHex, clampChroma } from 'culori';

const toOklch = converter('oklch');
const toRgb = converter('rgb');

// 取样式里的瓦片 URL 模板（唯一事实源，不复制参数）
const { MAP_STYLE } = await import('../src/mapstyle.ts');
const TILE_URL = MAP_STYLE.sources['bing-mvt'].tiles[0];

// 主要地铁城市的市中心经纬度（WGS-84 即可，瓦片覆盖范围大，坐标系差异不影响取色）
const CITIES = [
  [116.4, 39.9], [121.47, 31.23], [113.26, 23.13], [114.06, 22.54], [120.21, 30.29],
  [104.07, 30.57], [114.31, 30.59], [108.94, 34.34], [118.8, 32.06], [106.55, 29.56],
  [117.2, 39.13], [120.59, 31.3], [120.38, 36.07], [112.94, 28.23], [118.09, 24.48],
  [123.44, 41.81], [102.83, 24.88], [113.63, 34.75], [117.0, 36.65], [125.32, 43.9],
];
const Z = 12;
function tileXY(lng, lat) {
  const n = 2 ** Z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n);
  return [x, y];
}

const found = new Map(); // 小写官方色 → 原始写法
for (const [lng, lat] of CITIES) {
  const [x, y] = tileXY(lng, lat);
  const url = TILE_URL.replace('{z}', Z).replace('{x}', x).replace('{y}', y);
  try {
    const res = await fetch(url);
    if (!res.ok) continue;
    let buf = Buffer.from(await res.arrayBuffer());
    try { buf = gunzipSync(buf); } catch { /* 未压缩 */ }
    const tile = new VectorTile(new Pbf(buf));
    for (const layer of Object.values(tile.layers)) {
      for (let i = 0; i < layer.length; i++) {
        const props = layer.feature(i).properties;
        const oc = props['official-color'] ?? props['official_color'] ?? props['colour'];
        if (typeof oc === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(oc)) {
          found.set(oc.toLowerCase(), oc);
        }
      }
    }
  } catch (e) {
    console.warn(`tile ${x},${y} 失败: ${e.message}`);
  }
}

// 和谐化：保色相，亮度夹带，饱和度封顶
function harmonize(hexColor) {
  const c = toOklch(hexColor);
  if (!c || c.h === undefined) return null;
  const L = Math.min(0.72, Math.max(0.56, c.l));
  const clamped = clampChroma({ mode: 'oklch', l: L, c: Math.min(c.c, 0.12), h: c.h });
  return formatHex(toRgb(clamped));
}

const entries = [...found.keys()]
  .map((k) => [k, harmonize(k)])
  .filter(([, v]) => v)
  .sort(([a], [b]) => a.localeCompare(b));

const ts =
  '// 本文件由 scripts/build-transit-colors.mjs 生成，请勿手改。\n' +
  '// 地铁/轨道官方色 → 晨雾基调和谐色（保色相、亮度夹带 [0.45,0.68]、饱和度封顶 0.11）。\n' +
  '// build-mapstyle.mjs 用它给 subway_chn 层生成 match 表达式；未收录的颜色走运行时压灰兜底。\n' +
  'export const TRANSIT_COLORS: Record<string, string> = ' +
  JSON.stringify(Object.fromEntries(entries), null, 2) +
  ';\n';
writeFileSync(new URL('../src/transit-colors.ts', import.meta.url), ts);
console.log(`提取到 ${found.size} 种官方色，和谐化 ${entries.length} 种`);
for (const [k, v] of entries) console.log(`  ${k} → ${v}`);
