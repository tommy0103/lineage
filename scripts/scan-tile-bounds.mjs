// 一次性排查脚本：MapLibre Native 报 "Could not get geometries: paths outside valid
// range of coordinate_type"（ParseTile）。下载样式同款参数的 Bing 瓦片，解码后统计
// 每个 layer 的几何坐标范围，判断是否超出 extent 缓冲（乃至 int16 有效范围）。
// 运行：node scripts/scan-tile-bounds.mjs
import { gunzipSync } from 'node:zlib';
import { VectorTile } from '@mapbox/vector-tile';
import Pbf from 'pbf';

// 与 src/mapstyle.ts 的 bing-mvt tiles 保持一致的完整参数
const PARAMS =
  '?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1' +
  '&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38';
const TILE_URL = (z, x, y, params = PARAMS) =>
  `https://dynamic.t0.tiles.ditu.live.com/comp/ch/${z}-${x}-${y}.mvt${params}`;

function lngLatToTile(lng, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const rad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n);
  return [x, y];
}

// 采样：真机报错现场（杭州 z14 高倍缩放 + 全景低 zoom）+ 长三角 z10
const SAMPLES = [
  ['z14 杭州市中心(120.15,30.27)', 14, ...lngLatToTile(120.15, 30.27, 14)],
  ['z14 杭州东偏(120.21,30.29)', 14, ...lngLatToTile(120.21, 30.29, 14)],
  ['z10 长三角(120.15,30.27)', 10, ...lngLatToTile(120.15, 30.27, 10)],
  ['z10 长三角(121.3,31.2)', 10, ...lngLatToTile(121.3, 31.2, 10)],
  ['z4 全国(104,36)', 4, ...lngLatToTile(104, 36, 4)],
];

async function scan(label, z, x, y, params) {
  const res = await fetch(TILE_URL(z, x, y, params), { headers: { 'Accept-Encoding': 'identity' } });
  if (!res.ok) {
    console.log(`\n===== ${label} z${z}/${x}/${y} HTTP ${res.status}，跳过 =====`);
    return [];
  }
  let buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  const tile = new VectorTile(new Pbf(buf));
  const offenders = [];
  console.log(`\n===== ${label} z${z}/${x}/${y} (${buf.length}B) =====`);
  for (const [name, layer] of Object.entries(tile.layers)) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < layer.length; i++) {
      for (const ring of layer.feature(i).loadGeometry()) {
        for (const p of ring) {
          if (p.x < minX) minX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.x > maxX) maxX = p.x;
          if (p.y > maxY) maxY = p.y;
        }
      }
    }
    if (!isFinite(minX)) continue;
    const e = layer.extent;
    // mbgl GeometryCoordinate=int16：坐标乘 (32767/extent?) 前原始值超 ±32767 必炸；
    // 常见缓冲约定是 [-extent, 2*extent]，超出即记为可疑。
    const over16 = minX < -32767 || minY < -32767 || maxX > 32767 || maxY > 32767;
    const overBuf = minX < -e || minY < -e || maxX > 2 * e || maxY > 2 * e;
    if (overBuf) {
      const rec = { label, z, x, y, layer: name, extent: e, minX, minY, maxX, maxY, over16 };
      offenders.push(rec);
      console.log(
        `  ⚠ ${name} extent=${e} x[${minX},${maxX}] y[${minY},${maxY}]` +
          ` 超出${over16 ? ' int16 范围!' : ' [-extent,2*extent] 缓冲'}`
      );
    }
  }
  if (!offenders.length) console.log('  全部 layer 坐标在 [-extent, 2*extent] 内');
  return offenders;
}

const all = [];
for (const [label, z, x, y] of SAMPLES) all.push(...(await scan(label, z, x, y)));

// 对照实验：去掉 features 里的 mvtfcall（疑似 full-coordinate 标记）看坐标范围是否收敛
if (all.length) {
  const paramsNoFcall = PARAMS.replace('mvt,mvtfcall,', 'mvt,');
  console.log('\n########## 对照：去掉 mvtfcall 参数 ##########');
  const [, z, x, y] = SAMPLES[0];
  await scan('z14 杭州市中心（无 mvtfcall）', z, x, y, paramsNoFcall);
}

console.log(`\n共 ${all.filter((o) => o.over16).length} 个 layer 超 int16，${all.length} 个超常规缓冲`);
