// 一次性脚本：拉取 Bing 中国版矢量瓦片并解码，验证 mapstyle.ts 里猜的 source-layer。
// 打印每个瓦片的 layer 清单、feature 数量、geometry 类型分布、属性 keys，
// 以及 country_region / admin_division1 的 bkt 值分布。运行：node scripts/inspect-tile.mjs
import { gunzipSync } from 'node:zlib';
import { VectorTile } from '@mapbox/vector-tile';
import Pbf from 'pbf';

// 与 src/mapstyle.ts 的 BING_TILE 保持一致（t0 域名，查询参数照抄）
const TILE_URL = (z, x, y) =>
  `https://dynamic.t0.tiles.ditu.live.com/comp/ch/${z}-${x}-${y}.mvt` +
  '?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1' +
  '&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38';

// Web Mercator：经纬度 → 瓦片编号
function lngLatToTile(lng, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const rad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n
  );
  return [x, y];
}

// 采样点：中国中心 / 上海 / z2 全国（验证国界 bkt=434 起作用的级别）
const SAMPLES = [
  ['z2 全国偏西(90,40)', 2, ...lngLatToTile(90, 40, 2)],
  ['z3 中国中心(104,36)', 3, ...lngLatToTile(104, 36, 3)],
  ['z4 中国中心(104,36)', 4, ...lngLatToTile(104, 36, 4)],
  ['z5 上海(121.3,31.2)', 5, ...lngLatToTile(121.3, 31.2, 5)],
];

const GEOM_TYPES = { 1: 'Point', 2: 'LineString', 3: 'Polygon' };

async function inspect(label, z, x, y) {
  const url = TILE_URL(z, x, y);
  const res = await fetch(url, { headers: { 'Accept-Encoding': 'identity' } });
  console.log(`\n===== ${label} → z${z}/${x}/${y}  HTTP ${res.status} =====`);
  if (!res.ok) {
    console.log('请求失败，跳过');
    return;
  }
  let buf = Buffer.from(await res.arrayBuffer());
  // Bing 有时不标 Content-Encoding 直接发 gzip，按魔数兜底
  if (buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  console.log(`解码后 ${buf.length} bytes`);

  const tile = new VectorTile(new Pbf(buf));
  const names = Object.keys(tile.layers);
  console.log(`layers (${names.length}): ${names.join(', ')}`);

  for (const name of names) {
    const layer = tile.layers[name];
    const geomCount = {};
    for (let i = 0; i < layer.length; i++) {
      const t = layer.feature(i).type;
      geomCount[GEOM_TYPES[t] || t] = (geomCount[GEOM_TYPES[t] || t] || 0) + 1;
    }
    const sample = layer.feature(0);
    const keys = Object.keys(sample.properties);
    console.log(
      `\n  [${name}] extent=${layer.extent} features=${layer.length} geom=${JSON.stringify(geomCount)}`
    );
    console.log(`    property keys: ${keys.join(', ') || '(none)'}`);
    console.log(
      `    feature[0] props: ${JSON.stringify(sample.properties).slice(0, 300)}`
    );
    // 边界相关 layer：打印 bkt 分布
    if (name === 'country_region' || name === 'admin_division1' || name === 'vector_background' || name === 'island') {
      const bktCount = {};
      for (let i = 0; i < layer.length; i++) {
        const b = layer.feature(i).properties.bkt;
        bktCount[b] = (bktCount[b] || 0) + 1;
      }
      console.log(`    bkt 分布: ${JSON.stringify(bktCount)}`);
    }
    // 多边形 layer：打印 bbox 占瓦片比例，判断是「整瓦片底」还是「真实陆地轮廓」
    if (name === 'vector_background' || name === 'island') {
      for (let i = 0; i < Math.min(layer.length, 4); i++) {
        const geom = layer.feature(i).loadGeometry();
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const ring of geom) {
          for (const p of ring) {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
          }
        }
        const pct = (v) => ((v / layer.extent) * 100).toFixed(1);
        console.log(
          `    feature[${i}] bbox: x[${minX},${maxX}] y[${minY},${maxY}] ` +
          `(extent=${layer.extent}; 覆盖宽 ${pct(maxX - minX)}% × 高 ${pct(maxY - minY)}%)`
        );
      }
    }
  }
}

for (const [label, z, x, y] of SAMPLES) {
  await inspect(label, z, x, y);
}
