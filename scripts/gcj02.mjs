// 一次性脚本：把城市 WGS-84 坐标转成 GCJ-02（Bing 中国版瓦片用 GCJ-02），
// 结果硬编码进 src/data.ts 的 MAP_*。运行：node scripts/gcj02.mjs
import pkg from 'coordtransform';
const { wgs84togcj02 } = pkg;

const CITIES_WGS84 = {
  // 可交互三城：车站级坐标
  beijing: [116.3785, 39.8652], // 北京南
  shanghai: [121.3208, 31.1946], // 上海虹桥
  hangzhou: [120.2129, 30.2916], // 杭州东
  // 其余 10 个点亮城市
  xiamen: [118.0894, 24.4798],
  suzhou: [120.5853, 31.2989],
  nanjing: [118.7969, 32.0603],
  guangzhou: [113.2644, 23.1291],
  shenzhen: [114.0579, 22.5431],
  wuhan: [114.3054, 30.5931],
  chengdu: [104.0665, 30.5723],
  xian: [108.9398, 34.3416],
  qingdao: [120.3826, 36.0671],
  changsha: [112.9388, 28.2282],
  // 3 个未访问城市
  kunming: [102.8329, 24.8801],
  shenyang: [123.4315, 41.8057],
  zhengzhou: [113.6254, 34.7466],
};

const r = (n) => Math.round(n * 10000) / 10000;
for (const [k, [lng, lat]] of Object.entries(CITIES_WGS84)) {
  const [glng, glat] = wgs84togcj02(lng, lat);
  console.log(`${k}: [${r(glng)}, ${r(glat)}],`);
}
const [clng, clat] = wgs84togcj02(104, 36);
console.log(`center: [${r(clng)}, ${r(clat)}],`);
