import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

// Bing 中国版瓦片 z5 的 country_region 图层：国界多边形缓冲坐标（最大 20852，extent=4096）
// 超出 MapLibre Native 的 int16 几何上限（32767×extent/8192=16384），ParseTile 抛
// "paths outside valid range of coordinate_type"。已采样 z0–z14 长三角/全国瓦片并尝试
// 调整瓦片请求参数（features/og/js 等），均无法消除——是 Bing 数据本身如此（gl-js 宽容、
// Native 严格）。后果仅为该瓦片的越界 feature 被丢弃（z5 国界线可能有轻微缺口），
// 故精确屏蔽这一条噪声日志，其余日志不受影响。详见 scripts/scan-tile-bounds.mjs。
LogBox.ignoreLogs([
  'Could not get geometries: paths outside valid range of coordinate_type',
]);

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

