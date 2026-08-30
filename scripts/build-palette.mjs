// 由 palette.mjs 生成 src/theme.ts。运行：node scripts/build-palette.mjs
import { writeFileSync } from 'node:fs';
import { paletteColors } from './palette.mjs';

const c = paletteColors();
const hex = (n) => c[n].hex;
const rgb = (n) => {
  const v = parseInt(hex(n).slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};
const [ir, ig, ib] = rgb('ink');

const ts = `// 本文件由 scripts/build-palette.mjs 生成，请勿手改（配色改 scripts/palette.mjs）。
// 色阶来自 @proj-airi/chromatic（OKLCH 色阶生成器），晨雾基调 = 各色相饱和度 30%，accent 65%。
export const colors = {
  sea: '${hex('sea')}', // 水系 / 屏幕底色
  land: '${hex('land')}', // 陆地
  landLine: '${hex('landLine')}', // 陆地边界
  ink: '${hex('ink')}', // 主文字
  ink2: '${hex('ink2')}', // 次级文字
  ink38: '${hex('ink38')}', // 轨道端点 / 座席
  ink35: '${hex('ink35')}', // 票价
  ink28: '${hex('ink28')}', // pill.on
  accent: '${hex('accent')}',
  accentHover: '${hex('accentHover')}',
  dotOff: '${hex('dotOff')}', // 未点亮城市点
  pageBg: '${hex('pageBg')}',
  // 玻璃盖板透明度：低于 mock 的 0.72——真模糊生效后，盖板越淡越能看出背后的模糊内容，
  // 0.72 会把模糊盖成白板（晨雾基调下地图本身就近白）。
  glass: 'rgba(255, 255, 255, 0.45)',
  glassBorder: 'rgba(255, 255, 255, 0.65)',
  tabBg: 'rgba(255, 255, 255, 0.5)',
};

// ink 加透明度的常用色
export const inkA = (a: number) => \`rgba(${ir}, ${ig}, ${ib}, \${a})\`;

export const glassShadow = {
  shadowColor: '${hex('ink')}',
  shadowOpacity: 0.1,
  shadowRadius: 28,
  shadowOffset: { width: 0, height: 8 },
  elevation: 6,
};
`;

writeFileSync(new URL('../src/theme.ts', import.meta.url), ts);
console.log('theme.ts written');
for (const [k, v] of Object.entries(c)) console.log(`  ${k}: ${v.hex}`);
