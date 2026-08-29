// 极简 MapLibre style JSON（version 8）：只保留海面 / 陆地 / 国界 / 省界。
// 瓦片源为 Bing 中国版 MVT（GCJ-02），URL 模板照抄 nearcade 的 bing-style-zh-CN.json，
// t0–t3 四个域名。source-layer 与 filter 从 nearcade style 的对应 layer 原样摘取：
//   vector_background → microsoft.bing.maps.baseFeature.vector_land（陆地填充）
//   country_region    → country_region_line_1（bkt==434）+ entity_override_sovereign_boundary_china_line_1（bkt==1873）
//   admin_division1   → admin_division1_line_1（bkt==427，省界）
// 无 symbol layer，因此不需要 glyph 服务。
import { colors } from './theme';

const BING_TILE = (t: number) =>
  `https://dynamic.t${t}.tiles.ditu.live.com/comp/ch/{z}-{x}-{y}.mvt` +
  '?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1' +
  '&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38';

export const MAP_STYLE = {
  version: 8,
  name: 'lineage-minimal',
  sources: {
    bing: {
      type: 'vector',
      tiles: [BING_TILE(0), BING_TILE(1), BING_TILE(2), BING_TILE(3)],
      maxzoom: 18,
      promoteId: 'id',
      attribution: '© Microsoft Corporation - GS(2025)3133号',
    },
  },
  layers: [
    {
      id: 'sea',
      type: 'background',
      paint: { 'background-color': colors.sea },
    },
    {
      id: 'land',
      type: 'fill',
      source: 'bing',
      'source-layer': 'vector_background',
      paint: { 'fill-color': colors.land },
    },
    {
      id: 'boundary-country',
      type: 'line',
      source: 'bing',
      'source-layer': 'country_region',
      filter: ['in', ['get', 'bkt'], ['literal', [434, 1873]]],
      layout: { 'line-cap': 'round' },
      paint: { 'line-color': colors.landLine, 'line-width': 1 },
    },
    {
      id: 'boundary-province',
      type: 'line',
      source: 'bing',
      'source-layer': 'admin_division1',
      filter: ['==', ['get', 'bkt'], 427],
      layout: { 'line-cap': 'round' },
      paint: { 'line-color': colors.landLine, 'line-width': 0.6, 'line-opacity': 0.7 },
    },
  ],
};
