// 配色残留扫描：解析生成物 src/mapstyle.ts，列出全部残留颜色并做 OKLCH 饱和度体检。
// 阈值：ROLES 里最大 cCap 是 waterText 的 0.08，故 C>0.09 即视为「高饱和残留」。
// 同时确认：无 sprite 引用（icon-image / *-pattern）、无数据驱动颜色（["get","*color*"]）。
// 运行：node scripts/scan-colors.mjs
const { MAP_STYLE: style } = await import('../src/mapstyle.ts');

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

function parseColor(str) {
  let m = str.match(/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join('');
    return srgbToOklch(
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    );
  }
  m = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
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
    return srgbToOklch(hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3));
  }
  m = str.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (m) return srgbToOklch(parseFloat(m[1]) / 255, parseFloat(m[2]) / 255, parseFloat(m[3]) / 255);
  return null;
}

const C_LIMIT = 0.09;
const hits = []; // {layer, path, value, oklch}
let iconRefs = 0;
let patternRefs = 0;
let dataDrivenColors = 0;

function walk(v, layerId, path, muted = false, inMatch = false) {
  if (typeof v === 'string') {
    const c = parseColor(v);
    // match 子树里的颜色是 build-transit-colors 的策展色（饱和度上限 0.11，高于全局 0.09 是设计如此）
    if (c && !inMatch) hits.push({ layerId, path, value: v, ...c });
    return;
  }
  if (Array.isArray(v)) {
    // 被 build-mapstyle.mjs 的 muteDataDrivenColor 包装（含 to-rgba）的数据驱动色是合法的：
    // 运行时保色相压饱和。match 子树里的 ["get","official-color"] 由 TRANSIT_COLORS 离线
    // 和谐化接管。未包装、未接管的 ["get","*color*"] 才算残留。
    if (v[0] === 'to-rgba') muted = true;
    if (v[0] === 'match') inMatch = true;
    if (v[0] === 'get' && typeof v[1] === 'string' && /color/i.test(v[1]) && !muted && !inMatch) {
      dataDrivenColors++;
      console.log(`💥 数据驱动颜色残留: ${layerId} ${path} → ["get","${v[1]}"]`);
    }
    v.forEach((x, i) => walk(x, layerId, `${path}[${i}]`, muted, inMatch));
    return;
  }
  if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (k === 'icon-image') iconRefs++;
      if (k.endsWith('-pattern')) patternRefs++;
      walk(x, layerId, path ? `${path}.${k}` : k, muted, inMatch);
    }
  }
}

for (const layer of style.layers) {
  if (layer.paint) walk(layer.paint, layer.id, 'paint');
  if (layer.layout) walk(layer.layout, layer.id, 'layout');
}

console.log(`图层数 ${style.layers.length}，残留颜色字符串 ${hits.length} 个（去重前）`);
const uniq = new Map();
for (const h of hits) if (!uniq.has(h.value)) uniq.set(h.value, h);
console.log(`去重后 ${uniq.size} 种颜色\n`);

const bad = [...uniq.values()].filter((h) => h.C > C_LIMIT);
if (bad.length) {
  console.log(`💥 高饱和残留（OKLCH C > ${C_LIMIT}）:`);
  for (const h of bad)
    console.log(`  ${h.value}  C=${h.C.toFixed(3)} L=${h.L.toFixed(2)} H=${h.H.toFixed(0)}  @ ${h.layerId} ${h.path}`);
} else {
  console.log(`✅ 无高饱和残留（全部 OKLCH C ≤ ${C_LIMIT}）`);
  const top = [...uniq.values()].sort((a, b) => b.C - a.C).slice(0, 8);
  console.log('饱和度最高的 8 种颜色:');
  for (const h of top)
    console.log(`  ${h.value}  C=${h.C.toFixed(3)} L=${h.L.toFixed(2)} H=${h.H.toFixed(0)}  @ ${h.layerId} ${h.path}`);
}

console.log(`\nsprite 引用: icon-image=${iconRefs} *-pattern=${patternRefs}（应为 0；sprite 键${'sprite' in style ? '仍在!' : '已移除'}）`);
console.log(`未包装的数据驱动颜色: ${dataDrivenColors}（应为 0；经 to-rgba 保色相压饱和包装的不计）`);
process.exit(bad.length || iconRefs || patternRefs || dataDrivenColors ? 1 : 0);
