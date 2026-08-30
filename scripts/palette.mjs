// 晨雾玻璃色板的唯一事实源：语义色 → chromatic 色阶参数（色相/档位/饱和度%）。
// 改配色只改这张表，然后跑：
//   node scripts/build-palette.mjs   # 重新生成 src/theme.ts
//   node scripts/build-mapstyle.mjs  # 重新生成 src/mapstyle.ts（地图与 UI 共享同一色阶）
import { chromaticColorFrom } from '@proj-airi/chromatic';
import { converter } from 'culori';

const toOklch = converter('oklch');

// 色阶饱和度：晨雾基调 30%；accent 要辨识度，85%（accent-500 恰为 mock 原色 #009c96）
const MIST = 30;
const ACCENT_SAT = 85;

export const PALETTE = {
  // 水系/页面底（偏蓝 222，保持浅亮）
  pageBg: { hue: 222, shade: 50, sat: MIST },
  sea: { hue: 222, shade: 100, sat: MIST },
  // 陆地（青绿 160）
  land: { hue: 160, shade: 50, sat: MIST },
  landLine: { hue: 160, shade: 300, sat: MIST },
  // 墨色文字（蓝灰 240）：ink950→ink28(900)→ink35(800)→ink38/ink2(700)，dotOff 用 400
  ink: { hue: 240, shade: 950, sat: MIST },
  ink28: { hue: 240, shade: 900, sat: MIST },
  ink35: { hue: 240, shade: 800, sat: MIST },
  ink38: { hue: 240, shade: 700, sat: MIST },
  ink2: { hue: 240, shade: 700, sat: MIST },
  dotOff: { hue: 240, shade: 400, sat: MIST },
  // 强调色（青 190）
  accent: { hue: 190, shade: 500, sat: ACCENT_SAT },
  accentHover: { hue: 190, shade: 600, sat: ACCENT_SAT },
};

// 角色名 → { hex, oklch: {l,c,h} }
export function paletteColors() {
  const out = {};
  for (const [name, { hue, shade, sat }] of Object.entries(PALETTE)) {
    const color = chromaticColorFrom(hue, { shade, saturation: sat });
    const { l, c, h } = toOklch(color.color);
    out[name] = { hex: color.toHex(), oklch: { l, c, h } };
  }
  return out;
}
