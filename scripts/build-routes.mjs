// 构建期拉取真实铁路线形：Overpass（WGS-84）→ 图裁剪 → RDP 简化 → coordtransform 转 GCJ-02
// → src/routes.ts（打进 bundle，运行时零网络依赖）。运行：node scripts/build-routes.mjs
//
// 方法：取 route=railway relation 的全部 way 几何，按端点坐标建图（并行股道/道岔区用 20m
// 网格合并零成本边），在图上 Dijkstra 出两站间最短路径。实测沪杭高速铁路 relation(14192552)
// 几何断裂走不通，改用沪昆高速线(10627959)全程裁剪上海虹桥→杭州东段。
import { writeFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pkg from 'coordtransform';
const { wgs84togcj02 } = pkg;
const execFileP = promisify(execFile);

// Node 自带 fetch 在本机环境直连 Overpass 不稳（undici fetch failed / 406），curl 实测可靠
async function postCurl(ep, query) {
  const { stdout } = await execFileP('curl', [
    '-sS', '-m', '300', '-f', ep, '--data-urlencode', 'data=' + query,
  ], { maxBuffer: 32 * 1024 * 1024 });
  return JSON.parse(stdout);
}

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

// 车站 WGS-84 坐标：前三者与 scripts/gcj02.mjs 一致；厦门北取 OSM station 节点均值
const STATIONS = {
  上海虹桥: [121.3208, 31.1946],
  杭州东: [120.2129, 30.2916],
  北京南: [116.3785, 39.8652],
  厦门北: [118.0685, 24.6399],
};

// 已核对过的 GCJ-02 站坐标（src/data.ts MAP_HUBS），用于产出前校验偏差
const HUBS_GCJ02 = {
  上海虹桥: [121.3253, 31.1926],
  杭州东: [120.2174, 30.2892],
  北京南: [116.3847, 39.8666],
};

const SEGMENTS = [
  { id: 'huhang', rel: 10627959, from: '上海虹桥', to: '杭州东' }, // 沪昆高速线沪杭段
  { id: 'jinghu', rel: 356778, from: '上海虹桥', to: '北京南' }, // 京沪高铁
  { id: 'hangshen', rel: 2052885, from: '杭州东', to: '厦门北' }, // 杭深铁路（杭州东→厦门北段）
];

// 对外产出的区间（沪厦 = 沪杭段 + 杭深段拼接，方向均存为 from→to）
const ROUTES = [
  { from: '上海虹桥', to: '杭州东', segs: ['huhang'] },
  { from: '上海虹桥', to: '北京南', segs: ['jinghu'] },
  { from: '上海虹桥', to: '厦门北', segs: ['huhang', 'hangshen'] },
];

const MERGE_M = 20; // 并行股道/断裂点合并半径
const RDP_M = 5; // 简化容差（约 5m，版图缩放下不可见）

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRelation(relId) {
  const q = `[out:json][timeout:280];rel(${relId});out geom;`;
  let lastErr;
  for (let attempt = 0; attempt < ENDPOINTS.length * 2; attempt++) {
    const ep = ENDPOINTS[attempt % ENDPOINTS.length];
    try {
      const d = await postCurl(ep, q);
      const rel = d.elements.find((e) => e.type === 'relation');
      if (!rel) throw new Error('relation not found');
      return rel;
    } catch (e) {
      lastErr = e;
      console.warn(`  ${ep} 失败（${e.message}），重试…`);
      await sleep(5000);
    }
  }
  throw lastErr;
}

// ---------- 图：顶点=四舍五入到 1e-6° 的坐标，边=way 内相邻点 ----------
const key = (lon, lat) => `${lon.toFixed(6)},${lat.toFixed(6)}`;
function havM(a, b) {
  const R = 6371000, rad = Math.PI / 180;
  const p1 = a[1] * rad, p2 = b[1] * rad, dp = p2 - p1, dl = (b[0] - a[0]) * rad;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function buildGraph(ways) {
  const V = new Map(); // key -> [lon, lat]
  const adj = new Map(); // key -> [[key2, dist]]
  const edge = (ka, kb, d) => {
    if (!adj.has(ka)) adj.set(ka, []);
    adj.get(ka).push([kb, d]);
  };
  for (const w of ways) {
    const g = w.geometry;
    for (let i = 0; i + 1 < g.length; i++) {
      const a = [g[i].lon, g[i].lat], b = [g[i + 1].lon, g[i + 1].lat];
      const ka = key(...a), kb = key(...b);
      V.set(ka, a); V.set(kb, b);
      const d = havM(a, b);
      edge(ka, kb, d); edge(kb, ka, d);
    }
  }
  return { V, adj };
}

// 网格哈希找 <eps 的顶点对，加零成本边（连接并行股道与 relation 成员间的小断裂）
function mergeClose(V, adj, epsM) {
  const cell = epsM / 111320;
  const grid = new Map();
  const ck = (x, y) => `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
  for (const [k, [x, y]] of V) {
    const c = ck(x, y);
    if (!grid.has(c)) grid.set(c, []);
    grid.get(c).push(k);
  }
  let added = 0;
  for (const [k, [x, y]] of V) {
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      for (const k2 of grid.get(ck((cx + dx) * cell, (cy + dy) * cell)) || []) {
        if (k2 <= k) continue;
        const [x2, y2] = V.get(k2);
        const d = Math.hypot((x - x2) * Math.cos((y * Math.PI) / 180) * 111320, (y - y2) * 110540);
        if (d < epsM) {
          adj.get(k).push([k2, 0]); adj.get(k2).push([k, 0]);
          added++;
        }
      }
    }
  }
  return added;
}

function nearestKey(V, lon, lat) {
  let best = null, bd = Infinity;
  const c = Math.cos((lat * Math.PI) / 180);
  for (const [k, [x, y]] of V) {
    const d = (x - lon) ** 2 + ((y - lat) * c) ** 2;
    if (d < bd) { bd = d; best = k; }
  }
  return [best, Math.sqrt(bd) * 111320];
}

function dijkstra(V, adj, start, goal) {
  const dist = new Map([[start, 0]]), prev = new Map();
  // 数据量小（<1 万顶点），用简易二叉堆
  const heap = [[0, start]];
  const push = (it) => { heap.push(it); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const pop = () => { const top = heap[0], last = heap.pop();
    if (heap.length) { heap[0] = last; let i = 0;
      for (;;) { const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } }
    return top; };
  while (heap.length) {
    const [d, u] = pop();
    if (u === goal) break;
    if (d > (dist.get(u) ?? Infinity)) continue;
    for (const [v, w] of adj.get(u) || []) {
      const nd = d + w;
      if (nd < (dist.get(v) ?? Infinity)) { dist.set(v, nd); prev.set(v, u); push([nd, v]); }
    }
  }
  if (!dist.has(goal)) return null;
  const path = [goal];
  while (path[path.length - 1] !== start) path.push(prev.get(path[path.length - 1]));
  path.reverse();
  return path.map((k) => V.get(k));
}

// ---------- RDP 简化（米制近似：经度按 cos(lat) 缩放） ----------
function rdp(coords, epsM) {
  if (coords.length <= 2) return coords;
  const lat = (coords[0][1] * Math.PI) / 180;
  const sx = Math.cos(lat) * 111320, sy = 110540;
  const keep = new Uint8Array(coords.length);
  keep[0] = keep[coords.length - 1] = 1;
  const stack = [[0, coords.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = [coords[a][0] * sx, coords[a][1] * sy];
    const [bx, by] = [coords[b][0] * sx, coords[b][1] * sy];
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy;
    let maxD = 0, maxI = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = [coords[i][0] * sx, coords[i][1] * sy];
      let d;
      if (len2 === 0) d = Math.hypot(px - ax, py - ay);
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
        d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      }
      if (d > maxD) { maxD = d; maxI = i; }
    }
    if (maxD > epsM) { keep[maxI] = 1; stack.push([a, maxI], [maxI, b]); }
  }
  return coords.filter((_, i) => keep[i]);
}

const r5 = (n) => Math.round(n * 1e5) / 1e5;

async function main() {
  const segPaths = {};
  for (const seg of SEGMENTS) {
    console.log(`拉取 relation ${seg.rel}（${seg.from}→${seg.to}）…`);
    const rel = await fetchRelation(seg.rel);
    const ways = rel.members.filter((m) => m.type === 'way' && m.geometry);
    const { V, adj } = buildGraph(ways);
    const merges = mergeClose(V, adj, MERGE_M);
    const a = STATIONS[seg.from], b = STATIONS[seg.to];
    const [ka, da] = nearestKey(V, ...a);
    const [kb, db] = nearestKey(V, ...b);
    const path = dijkstra(V, adj, ka, kb);
    if (!path) throw new Error(`${seg.id}: 图上无路（relation 几何断裂）`);
    let len = 0;
    for (let i = 0; i + 1 < path.length; i++) len += havM(path[i], path[i + 1]);
    console.log(`  ways ${ways.length} 顶点 ${V.size} 合并 ${merges} | 吸附 ${da.toFixed(0)}m/${db.toFixed(0)}m | ${path.length} 点 ${(len / 1000).toFixed(1)}km`);
    segPaths[seg.id] = path;
  }

  const out = {};
  for (const r of ROUTES) {
    // 拼接段（去重接点），首尾各补精确的 GCJ-02 站坐标让线落在城市点上
    let coords = [];
    for (const id of r.segs) {
      const p = segPaths[id];
      coords = coords.length ? coords.concat(p.slice(1)) : p.slice();
    }
    const g = (s) => { const [glng, glat] = wgs84togcj02(...STATIONS[s]); return [r5(glng), r5(glat)]; };
    const gcj = coords.map(([x, y]) => { const [glng, glat] = wgs84togcj02(x, y); return [r5(glng), r5(glat)]; });
    const simplified = rdp(gcj, RDP_M);
    const final = [g(r.from), ...simplified, g(r.to)];
    const k = [r.from, r.to].sort().join('↔');
    out[k] = { from: r.from, to: r.to, coords: final };
    // 校验：首尾与已知 GCJ-02 站坐标偏差 <0.01°
    for (const [s, pt] of [[r.from, final[0]], [r.to, final[final.length - 1]]]) {
      const hub = HUBS_GCJ02[s];
      if (hub) {
        const dev = Math.max(Math.abs(pt[0] - hub[0]), Math.abs(pt[1] - hub[1]));
        if (dev >= 0.01) throw new Error(`${k}: ${s} 端点偏差 ${dev.toFixed(4)}° ≥ 0.01°`);
      }
    }
    console.log(`${k}: ${coords.length} 点 → RDP ${simplified.length} 点`);
  }

  const here = dirname(fileURLToPath(import.meta.url));
  const file = join(here, '..', 'src', 'routes.ts');
  const body = `// 由 scripts/build-routes.mjs 生成（Overpass WGS-84 → GCJ-02，已简化），请勿手改。
// key = [发站, 到站].sort().join('↔')（双向复用同一线形）；coords 存的方向是 from→to。
export interface RailRoute {
  from: string;
  to: string;
  coords: [number, number][];
}

export const ROUTES: Record<string, RailRoute> = ${JSON.stringify(out, null, 1)};

export function routeKeyFor(from: string, to: string): string {
  return [from, to].sort().join('↔');
}

// 按 from→to 方向取线形（反向行程返回倒序坐标，供渐进绘制动画用）
export function routeFor(from: string, to: string): [number, number][] | null {
  const r = ROUTES[routeKeyFor(from, to)];
  if (!r) return null;
  return r.from === from ? r.coords : r.coords.slice().reverse();
}
`;
  writeFileSync(file, body);
  console.log(`已写出 ${file}（${(body.length / 1024).toFixed(0)}KB）`);
}

main().catch((e) => { console.error(e); process.exit(1); });
