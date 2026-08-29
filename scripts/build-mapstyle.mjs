// 一次性脚本：以 vendor 的 nearcade bing-style-zh-CN.json 为底本做减法，生成 src/mapstyle.ts。
//   保留：background、栅格背景 LOD 瓦片（海陆底色）、陆地/地貌填充、水系、岛屿、国界线
//   删掉：道路/铁路/POI/地名等 symbol 层（无 glyph 依赖）、fill-pattern 层（无 sprite 依赖）、
//         不可见层（line-width 0）、traffic/jk/buildings 等无关 source
// URL 处理照抄 nearcade 的 fixBingStyleUrls：raster:// → https://；栅格瓦片保留 {quadkey}
// 占位符（MapLibre Native 原生支持），t0 扩展到 t0–t3。运行：node scripts/build-mapstyle.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = new URL('./vendor/bing-style-zh-CN.json', import.meta.url);
const style = JSON.parse(readFileSync(SRC, 'utf8'));

const KEEP_SOURCES = new Set(['bing-mvt', 'background_LOD1', 'background_LOD7', 'background_LOD12']);
const KEEP_FILL_SL = new Set([
  'vector_background', // 陆地块底色
  'land_cover_grass',
  'land_cover_forest',
  'land_cover_urban',
  'land_cover_snow_and_ice',
  'water_feature',
  'island', // 含南海 entity-override（bkt 2083–2087）
]);
const KEEP_LINE_SL = new Set(['country_region', 'water_feature']);

// ---- sources ----
const sources = {};
for (const [id, src] of Object.entries(style.sources)) {
  if (!KEEP_SOURCES.has(id)) continue;
  const s = JSON.parse(JSON.stringify(src));
  if (Array.isArray(s.tiles)) {
    // raster:// → https://，并扩展 t0 → t0–t3
    const t0 = s.tiles.map((u) => u.replace('raster://', 'https://'));
    s.tiles = t0.flatMap((u) => [0, 1, 2, 3].map((i) => u.replace(/dynamic\.t\d+\./, `dynamic.t${i}.`)));
  }
  if (id === 'bing-mvt') s.attribution = '© Microsoft Corporation - GS(2025)3133号';
  sources[id] = s;
}

// ---- layers ----
const kept = [];
const dropped = {};
for (const layer of style.layers) {
  let keep = false;
  if (layer.type === 'background') keep = true;
  else if (layer.type === 'raster' && layer.source.startsWith('background_LOD')) keep = true;
  else if (layer.source === 'bing-mvt' && layer.type === 'fill') {
    keep =
      KEEP_FILL_SL.has(layer['source-layer']) &&
      !(layer.paint && layer.paint['fill-pattern']);
  } else if (layer.source === 'bing-mvt' && layer.type === 'line') {
    const w = layer.paint && layer.paint['line-width'];
    keep = KEEP_LINE_SL.has(layer['source-layer']) && !(typeof w === 'number' && w === 0);
  }
  if (keep) kept.push(layer);
  else dropped[layer.type] = (dropped[layer.type] || 0) + 1;
}

const out = { version: 8, name: 'lineage-bing-minimal', sources, layers: kept };

const ts =
  '// 本文件由 scripts/build-mapstyle.mjs 生成，请勿手改。\n' +
  '// 底本：scripts/vendor/bing-style-zh-CN.json（nearcade 线上验证过的 Bing 中国版样式）。\n' +
  '// 只保留地理底图层（栅格背景 LOD / 陆地 / 地貌 / 水系 / 岛屿 / 国界），\n' +
  '// 无 symbol 层（不需要 glyph 服务）、无 fill-pattern（不需要 sprite）。\n' +
  '// 城市点 / 光晕 / 导入动画由 RealMap.tsx 以 GeoJSONSource 叠加在顶层。\n' +
  `export const MAP_STYLE = ${JSON.stringify(out, null, 2)} as const;\n`;
writeFileSync(new URL('../src/mapstyle.ts', import.meta.url), ts);

console.log(`kept ${kept.length} layers, dropped by type: ${JSON.stringify(dropped)}`);
console.log('kept layers:');
for (const l of kept) {
  console.log(`  ${l.type.padEnd(10)} ${l['source-layer'] || '-'}  ${l.id}`);
}
console.log(`mapstyle.ts ${Buffer.byteLength(ts)} bytes`);
