// mock 数据与工具函数：逐条对照 home-v1-morning-glass.html 的 <script>。

export interface Trip {
  train: string;
  from: string;
  to: string;
  date: string; // "8/24"
  dateLong: string; // "2025.08.24 周日 · 2 天前"
  dep: string;
  arr: string;
  dur: string;
  model: string;
  ticket: string; // "二等座 · 07 车 01A · 靠窗 · ¥73"
  note: string;
}

export interface City {
  name: string;
  times: number;
  recent: string;
  route: string;
  // 自绘 SVG 地图（ChinaMap 降级方案）里的 mock 坐标，真实地图用下方 GCJ-02 坐标
  x: number;
  y: number;
  trips: Trip[];
}

export type CityId = 'hangzhou' | 'shanghai' | 'beijing';

export const CITIES: Record<CityId, City> = {
  hangzhou: {
    name: '杭州', times: 9, recent: '最近 G7371 · 8/24', route: '常坐 上海虹桥 ↔ 杭州东',
    x: 285, y: 161,
    trips: [
      { train: 'G7371', from: '上海虹桥', to: '杭州东', date: '8/24', dateLong: '2025.08.24 周日 · 2 天前', dep: '14:02', arr: '15:07', dur: '1 时 05 分', model: 'CR400BF-A', ticket: '二等座 · 07 车 01A · 靠窗 · ¥73', note: '出差' },
      { train: 'G7529', from: '杭州东', to: '上海虹桥', date: '8/16', dateLong: '2025.08.16 周六 · 10 天前', dep: '18:44', arr: '19:47', dur: '1 时 03 分', model: 'CR400AF', ticket: '二等座 · 03 车 11F · 靠窗 · ¥73', note: '' },
      { train: 'G1383', from: '上海虹桥', to: '杭州东', date: '8/02', dateLong: '2025.08.02 周六 · 24 天前', dep: '09:15', arr: '10:26', dur: '1 时 11 分', model: 'CRH380D', ticket: '二等座 · 05 车 08C · 靠过道 · ¥73', note: '回家' },
      { train: 'G7511', from: '上海虹桥', to: '杭州东', date: '7/19', dateLong: '2025.07.19 周六 · 1 个月前', dep: '16:30', arr: '17:35', dur: '1 时 05 分', model: 'CR400BF-A', ticket: '二等座 · 02 车 14A · 靠窗 · ¥73', note: '' },
      { train: 'G7305', from: '杭州东', to: '上海虹桥', date: '7/05', dateLong: '2025.07.05 周六 · 1 个月前', dep: '08:02', arr: '09:10', dur: '1 时 08 分', model: 'CR400AF', ticket: '二等座 · 06 车 02D · 靠过道 · ¥73', note: '' },
      { train: 'G1373', from: '上海虹桥', to: '杭州东', date: '6/21', dateLong: '2025.06.21 周六 · 2 个月前', dep: '19:48', arr: '20:55', dur: '1 时 07 分', model: 'CRH380B', ticket: '二等座 · 08 车 05F · 靠窗 · ¥73', note: '看演唱会' },
      { train: 'G7585', from: '上海虹桥', to: '杭州东', date: '5/30', dateLong: '2025.05.30 周五 · 3 个月前', dep: '13:20', arr: '14:24', dur: '1 时 04 分', model: 'CR400BF-A', ticket: '二等座 · 04 车 12B · 靠过道 · ¥73', note: '' },
      { train: 'G7501', from: '杭州东', to: '上海虹桥', date: '4/12', dateLong: '2025.04.12 周六 · 4 个月前', dep: '10:36', arr: '11:42', dur: '1 时 06 分', model: 'CR400AF', ticket: '二等座 · 01 车 09A · 靠窗 · ¥73', note: '' },
      { train: 'G7511', from: '上海虹桥', to: '杭州东', date: '3/08', dateLong: '2025.03.08 周六 · 5 个月前', dep: '16:30', arr: '17:35', dur: '1 时 05 分', model: 'CR400BF-A', ticket: '二等座 · 02 车 06C · 靠过道 · ¥73', note: '' },
    ],
  },
  shanghai: {
    name: '上海', times: 18, recent: '最近 G7529 · 8/16', route: '常坐 杭州东 ↔ 上海虹桥',
    x: 290, y: 153,
    trips: [
      { train: 'G7529', from: '杭州东', to: '上海虹桥', date: '8/16', dateLong: '2025.08.16 周六 · 10 天前', dep: '18:44', arr: '19:47', dur: '1 时 03 分', model: 'CR400AF', ticket: '二等座 · 03 车 11F · 靠窗 · ¥73', note: '' },
      { train: 'G7305', from: '杭州东', to: '上海虹桥', date: '7/05', dateLong: '2025.07.05 周六 · 1 个月前', dep: '08:02', arr: '09:10', dur: '1 时 08 分', model: 'CR400AF', ticket: '二等座 · 06 车 02D · 靠过道 · ¥73', note: '' },
      { train: 'G12', from: '上海虹桥', to: '北京南', date: '6/30', dateLong: '2025.06.30 周一 · 2 个月前', dep: '09:00', arr: '13:26', dur: '4 时 26 分', model: 'CR400BF-B', ticket: '二等座 · 09 车 03A · 靠窗 · ¥553', note: '出差' },
      { train: 'G7501', from: '杭州东', to: '上海虹桥', date: '4/12', dateLong: '2025.04.12 周六 · 4 个月前', dep: '10:36', arr: '11:42', dur: '1 时 06 分', model: 'CR400AF', ticket: '二等座 · 01 车 09A · 靠窗 · ¥73', note: '' },
      { train: 'D2281', from: '上海虹桥', to: '厦门北', date: '2/14', dateLong: '2025.02.14 周五 · 6 个月前', dep: '07:40', arr: '15:12', dur: '7 时 32 分', model: 'CRH2A', ticket: '二等座 · 12 车 17D · 靠过道 · ¥388', note: '过年' },
    ],
  },
  beijing: {
    name: '北京', times: 5, recent: '最近 G12 · 6/30', route: '常坐 上海虹桥 ↔ 北京南',
    x: 268, y: 105,
    trips: [
      { train: 'G12', from: '上海虹桥', to: '北京南', date: '6/30', dateLong: '2025.06.30 周一 · 2 个月前', dep: '09:00', arr: '13:26', dur: '4 时 26 分', model: 'CR400BF-B', ticket: '二等座 · 09 车 03A · 靠窗 · ¥553', note: '出差' },
      { train: 'G19', from: '北京南', to: '上海虹桥', date: '7/04', dateLong: '2025.07.04 周五 · 1 个月前', dep: '16:00', arr: '20:28', dur: '4 时 28 分', model: 'CR400BF-B', ticket: '二等座 · 07 车 10F · 靠窗 · ¥553', note: '' },
      { train: 'G5', from: '北京南', to: '上海虹桥', date: '1/19', dateLong: '2025.01.19 周日 · 7 个月前', dep: '07:00', arr: '11:34', dur: '4 时 34 分', model: 'CR400AF-B', ticket: '二等座 · 05 车 01A · 靠窗 · ¥553', note: '回家过年' },
    ],
  },
};

export const IMPORT_TRIP = CITIES.hangzhou.trips[0]; // G7371

// ---------------- 真实地图（MapLibre + Bing 中国版瓦片）城市坐标 ----------------
// Bing 中国版矢量瓦片是 GCJ-02 坐标系，以下坐标由 scripts/gcj02.mjs 从 WGS-84 转出后硬编码。
// [lng, lat]

// 可交互三城（车站级坐标：北京南 / 上海虹桥 / 杭州东）
export const MAP_HUBS: Record<CityId, [number, number]> = {
  beijing: [116.3847, 39.8666],
  shanghai: [121.3253, 31.1926],
  hangzhou: [120.2174, 30.2892],
};

// 其余 10 个点亮城市：厦门 / 苏州 / 南京 / 广州 / 深圳 / 武汉 / 成都 / 西安 / 青岛 / 长沙
export const MAP_LIT: [number, number][] = [
  [118.0944, 24.4772], // 厦门
  [120.5895, 31.2967], // 苏州
  [118.8021, 32.0582], // 南京
  [113.2697, 23.1264], // 广州
  [114.063, 22.5404], // 深圳
  [114.3108, 30.5907], // 武汉
  [104.069, 30.5698], // 成都
  [108.9445, 34.34], // 西安
  [120.3877, 36.0674], // 青岛
  [112.9442, 28.2247], // 长沙
];

// 3 个未访问城市：昆明 / 沈阳 / 郑州
export const MAP_OFF: [number, number][] = [
  [102.8343, 24.877], // 昆明
  [123.4376, 41.8081], // 沈阳
  [113.6314, 34.7454], // 郑州
];

// 初始相机中心（装下中国）
export const MAP_CENTER: [number, number] = [104.0026, 35.9998];
export const MAP_ZOOM = 3.1;

// 车型库：车系 / 编组 / 运营时速（mock 数据）
export const MODELS: Record<string, { family: string; cars: number; speed: string }> = {
  'CR400BF-A': { family: '复兴号', cars: 16, speed: '350 km/h' },
  'CR400AF': { family: '复兴号', cars: 8, speed: '350 km/h' },
  'CR400AF-B': { family: '复兴号', cars: 17, speed: '350 km/h' },
  'CR400BF-B': { family: '复兴号', cars: 17, speed: '350 km/h' },
  'CRH380B': { family: '和谐号', cars: 8, speed: '300 km/h' },
  'CRH380D': { family: '和谐号', cars: 8, speed: '380 km/h' },
  'CRH2A': { family: '和谐号', cars: 8, speed: '250 km/h' },
};

// 谱系：跨城市去重的全局行程表（同一次乘坐会在出发/到达两城的列表里各出现一次）
export const ALL_TRIPS: Trip[] = (() => {
  const seen: Record<string, 1> = {};
  const out: Trip[] = [];
  (Object.keys(CITIES) as CityId[]).forEach((k) => {
    CITIES[k].trips.forEach((t) => {
      const key = t.train + '|' + t.date + '|' + t.from;
      if (!seen[key]) { seen[key] = 1; out.push(t); }
    });
  });
  return out;
})();

export function dateKey(t: Trip): number {
  const p = t.date.split('/');
  return (+p[0]) * 100 + (+p[1]);
}
export function sameTrip(a: Trip, b: Trip): boolean {
  return a.train === b.train && a.date === b.date && a.from === b.from;
}
export function stationShort(s: string): string {
  return s.replace(/虹桥$/, '').replace(/[东南西北]$/, '');
}
export function pairKey(t: Trip): string {
  return [stationShort(t.from), stationShort(t.to)].sort().join('↔');
}
export function intervalName(t: Trip): string {
  const k = pairKey(t);
  if (k === '上海↔杭州') return '沪杭区间';
  if (k === '上海↔北京') return '京沪区间';
  return t.from + ' ↔ ' + t.to;
}
export function trainSame(t: Trip): Trip[] {
  return ALL_TRIPS.filter((o) => o.train === t.train)
    .sort((a, b) => dateKey(a) - dateKey(b));
}
export function trainOrdinal(t: Trip): number {
  const same = trainSame(t);
  for (let i = 0; i < same.length; i++) if (sameTrip(same[i], t)) return i + 1;
  return 1;
}
export function trainOthers(t: Trip): Trip[] {
  return trainSame(t).filter((o) => !sameTrip(o, t))
    .sort((a, b) => dateKey(b) - dateKey(a));
}
export function intervalOthers(t: Trip): Trip[] {
  const k = pairKey(t);
  return ALL_TRIPS.filter((o) => !sameTrip(o, t) && pairKey(o) === k)
    .sort((a, b) => dateKey(b) - dateKey(a));
}

// 票面拆分："二等座 · 07 车 01A · 靠窗 · ¥73"
export function ticketParts(t: Trip): [string, string, string, string] {
  const tk = t.ticket.split(' · ');
  return [tk[0] || '', tk[1] || '', tk[2] || '', tk[3] || ''];
}

// 票面座位解析：车 07 / 座 01A / 位置 靠窗
export function seatParts(t: Trip): { car: number; seat: string; pos: string } | null {
  const m = t.ticket.match(/(\d+) 车 ([0-9A-F]+) · ([^·¥]+)/);
  if (!m) return null;
  return { car: parseInt(m[1], 10), seat: m[2], pos: m[3].trim() };
}

export function ticketDateCN(t: Trip, pad: boolean): { full: string; file: string } {
  const m = t.dateLong.match(/(\d{4})\.(\d{2})\.(\d{2})/);
  if (!m) return { full: t.dateLong, file: '' };
  const mo = pad ? m[2] : String(+m[2]);
  const d = pad ? m[3] : String(+m[3]);
  return { full: m[1] + '年' + mo + '月' + d + '日', file: m[1] + m[2] + m[3] };
}

export function ticketSerial(t: Trip): string {
  // 由车次 + 日期派生稳定伪票号，仅作票面质感
  const s = t.train + t.date;
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) % 9000000;
  return 'H' + String(1000000 + n).slice(-7);
}
