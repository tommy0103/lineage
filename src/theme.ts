// 色板：由 home-v1-morning-glass.html 的 :root oklch 值经 scripts/oklch.mjs 精确换算。
export const colors = {
  sea: '#d2eef1', // oklch(93% 0.03 205) 屏幕底色
  land: '#ecf4ef', // oklch(96% 0.01 160)
  landLine: '#c4d6d0', // oklch(86% 0.02 175)
  ink: '#19232a', // oklch(25% 0.02 240)
  ink2: '#3e4952', // oklch(40% 0.02 240)
  ink38: '#39444c', // oklch(38% 0.02 240) 轨道端点 / 座席
  ink35: '#313c44', // oklch(35% 0.02 240) 票价
  ink28: '#202a32', // oklch(28% 0.02 240) pill.on
  accent: '#009c96', // oklch(62% 0.12 190)
  accentHover: '#008d87', // oklch(57% 0.12 190)
  dotOff: '#6f757a', // oklch(56% 0.01 240)
  pageBg: '#e5f3f6', // oklch(95.5% 0.015 210)
  // 玻璃盖板透明度：低于 mock 的 0.72——真模糊生效后，盖板越淡越能看出背后的模糊内容，
  // 0.72 会把模糊盖成白板（晨雾基调下地图本身就近白）。
  glass: 'rgba(255, 255, 255, 0.45)',
  glassBorder: 'rgba(255, 255, 255, 0.65)',
  tabBg: 'rgba(255, 255, 255, 0.5)',
};

// ink 加透明度的常用色
export const inkA = (a: number) => `rgba(25, 35, 42, ${a})`;

export const glassShadow = {
  shadowColor: '#19232a',
  shadowOpacity: 0.1,
  shadowRadius: 28,
  shadowOffset: { width: 0, height: 8 },
  elevation: 6,
};
