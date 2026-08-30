// 本文件由 scripts/build-palette.mjs 生成，请勿手改（配色改 scripts/palette.mjs）。
// 色阶来自 @proj-airi/chromatic（OKLCH 色阶生成器），晨雾基调 = 各色相饱和度 30%，accent 65%。
export const colors = {
  sea: '#e5f5fb', // 水系 / 屏幕底色
  land: '#f8fbf9', // 陆地
  landLine: '#bdd5c7', // 陆地边界
  ink: '#202d36', // 主文字
  ink2: '#44657c', // 次级文字
  ink38: '#44657c', // 轨道端点 / 座席
  ink35: '#385061', // 票价
  ink28: '#2f4250', // pill.on
  accent: '#009c96',
  accentHover: '#008680',
  dotOff: '#94afc2', // 未点亮城市点
  pageBg: '#f7fbfc',
  // 玻璃盖板透明度：低于 mock 的 0.72——真模糊生效后，盖板越淡越能看出背后的模糊内容，
  // 0.72 会把模糊盖成白板（晨雾基调下地图本身就近白）。
  glass: 'rgba(255, 255, 255, 0.45)',
  glassBorder: 'rgba(255, 255, 255, 0.65)',
  tabBg: 'rgba(255, 255, 255, 0.5)',
};

// ink 加透明度的常用色
export const inkA = (a: number) => `rgba(32, 45, 54, ${a})`;

export const glassShadow = {
  shadowColor: '#202d36',
  shadowOpacity: 0.1,
  shadowRadius: 28,
  shadowOffset: { width: 0, height: 8 },
  elevation: 6,
};
