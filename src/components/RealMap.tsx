// 真实地图：MapLibre + Bing 中国版矢量瓦片。
// 本文件只被 MapView.tsx 在探测到原生模块后懒加载 require，绝不能被静态 import。
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
  type MapRef,
  type PressEventWithFeatures,
  type StyleSpecification,
  type ViewStateChangeEvent,
} from '@maplibre/maplibre-react-native';
import type { LineLayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { colors } from '../theme';
import { buildMapStyle } from '../mapstyle';
import { CITIES, CityId, IMPORT_TRIP, MAP_BOUNDS, MAP_HUBS, MAP_LIT, MAP_OFF, litCityNames } from '../data';
import { routeFor } from '../routes';

type GeoJSONLinePaint = NonNullable<LineLayerSpecification['paint']>;
type GeoJSONLineLayout = NonNullable<LineLayerSpecification['layout']>;

const line = (coords: [number, number][]): GeoJSON.Feature => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: coords },
});
const EMPTY_FC: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };

// 导入反馈的区间线形：沿真实铁路（沪杭段），构建期由 scripts/build-routes.mjs 生成
const IMPORT_ROUTE = routeFor(IMPORT_TRIP.from, IMPORT_TRIP.to);

const pt = (coord: [number, number], properties: GeoJSON.GeoJsonProperties = {}): GeoJSON.Feature => ({
  type: 'Feature',
  properties,
  geometry: { type: 'Point', coordinates: coord },
});
const fc = (features: GeoJSON.Feature[]): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features,
});

// 点亮城市 = 可交互三城 + 其余 10 城（name 用于城市名标注）
const LIT_FC = fc([
  ...(Object.keys(MAP_HUBS) as CityId[]).map((id) => pt(MAP_HUBS[id], { id, name: CITIES[id].name })),
  ...MAP_LIT.map((c) => pt(c.coord, { name: c.name })),
]);
const OFF_FC = fc(MAP_OFF.map((c) => pt(c.coord, { name: c.name })));

// 可视 bounds（含 padding）→ 屏幕坐标：墨卡托空间线性插值（bearing/pitch 恒 0，精确）。
function projectFromBounds(
  bounds: [number, number, number, number],
  coord: [number, number],
  width: number,
  height: number
): [number, number] {
  const [w, s, e, n] = bounds;
  const [x0, y0] = merc(w, n, 1); // 视口左上
  const [x1, y1] = merc(e, s, 1); // 视口右下
  const [x, y] = merc(coord[0], coord[1], 1);
  return [((x - x0) / (x1 - x0)) * width, ((y - y0) / (y1 - y0)) * height];
}

// Web Mercator 世界坐标（任意统一 scale 即可，只用相对比例）。旋转/俯仰已禁用，
// bearing/pitch 恒 0，因此经纬度在可视 bounds 内做墨卡托线性插值即得精确屏幕坐标。
function merc(lng: number, lat: number, worldSize: number): [number, number] {
  const x = ((lng + 180) / 360) * worldSize;
  const siny = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)) * worldSize;
  return [x, y];
}

// 相机事件里驱动城市卡位置用的锚点（App 持有 Animated.ValueXY，避免每帧 setState 重渲整屏）
export interface CardAnchor {
  pos: Animated.ValueXY;
  cardH: number;
  onMeta: (meta: { up: boolean; x: number }) => void; // 箭头朝向/水平位置，变化才回调
}

interface Props {
  width: number;
  height: number;
  selected: CityId;
  pulseKey: number; // 递增即重放导入动画
  tripRoute: [number, number][] | null; // 当前 trip 详情的发到站线形（GCJ-02），null 不显示
  onCityPress: (id: CityId) => void;
  cardAnchor: CardAnchor;
}

export default function RealMap({ width, height, selected, pulseKey, tripRoute, onCityPress, cardAnchor }: Props) {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState(false);
  // 导入动画的杭州屏幕锚点（脉动环是 RN 叠加层；线形本身是地图图层，天然跟手）
  const [hzPx, setHzPx] = useState<[number, number] | null>(null);
  // 导入线形渐进绘制进度 0..1；null = 未在播（源给空集合）
  const [importFrac, setImportFrac] = useState<number | null>(null);

  const selFC = useMemo(() => fc([pt(MAP_HUBS[selected])]), [selected]);
  // 选中行程的静态高亮线形（已加入档案，不动效）
  const tripRouteFC = useMemo(() => (tripRoute ? fc([line(tripRoute)]) : EMPTY_FC), [tripRoute]);
  // 导入动画：按进度截取真实线形的前缀
  const importRouteFC = useMemo(() => {
    if (importFrac == null || !IMPORT_ROUTE) return EMPTY_FC;
    const n = Math.max(2, Math.ceil(IMPORT_ROUTE.length * importFrac));
    return fc([line(IMPORT_ROUTE.slice(0, n))]);
  }, [importFrac]);
  // 底图样式按当前点亮城市名单构建（剔除 Bing 同名地名标注，避免与 lit-label 双标注）。
  // 数据接真库后：名单变化时重算并重建样式即可（setStyle 有 diff，瓦片缓存不受影响）。
  const mapStyle = useMemo(() => buildMapStyle(litCityNames()), []);

  const pulse = useRef(new Animated.Value(0)).current;

  // ---------- 城市卡锚定 ----------
  const { pos: cardPos, cardH, onMeta } = cardAnchor;
  // 最近一次可视 bounds（region 事件每帧更新；初始为 null，用一次性 project() 兜底）。
  // Camera 用了非对称 padding（底部 40% 留给 sheet），相机 center 不在屏幕中心，
  // 用 center+zoom 手算投影必然跑偏；事件的 bounds 是整个可视视口（含 padding 区）
  // 的经纬度范围（iOS visibleCoordinateBounds / Android projection.visibleRegion），
  // 在墨卡托空间线性插值天然含 padding，且同步无桥接延迟。
  const viewBounds = useRef<[number, number, number, number] | null>(null);

  // 把选中城市的屏幕坐标换算成卡片位置：默认卡片在点上方（箭头朝下），
  // 上方会盖住搜索胶囊则翻到点下方（箭头朝上，对应 mock 的 arrowTop），水平 clamp 留 12pt。
  const layoutCard = useCallback(
    (px: number, py: number) => {
      const cardW = 244 * (width / 390); // 同 CityCard 的宽度算法
      const GAP = 16;
      const topMin = insets.top + 8 + 48 + 12; // 搜索胶囊底部
      const left = Math.min(Math.max(px - cardW / 2, 12), width - cardW - 12);
      const aboveTop = py - GAP - cardH;
      const up = aboveTop < topMin;
      cardPos.setValue({ x: left, y: up ? py + GAP : aboveTop });
      onMeta({ up, x: Math.min(Math.max(px - left, 24), cardW - 24) });
    },
    [width, cardH, insets.top, cardPos, onMeta]
  );

  const layoutFromBounds = useCallback(
    (bounds: [number, number, number, number], city: CityId) => {
      const [px, py] = projectFromBounds(bounds, MAP_HUBS[city], width, height);
      layoutCard(px, py);
    },
    [layoutCard, width, height]
  );

  // 导入动画（脉动环）播放期间，RN 叠加层锚点要跟随相机逐帧重投影
  const importAnimActive = useRef(false);
  const importAnimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const importDrawTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 相机每帧变化（拖动/缩放中）与停下时都重投影卡片锚点
  const onRegionChange = useCallback(
    (e: NativeSyntheticEvent<ViewStateChangeEvent>) => {
      const { bounds } = e.nativeEvent;
      viewBounds.current = bounds;
      layoutFromBounds(bounds, selected);
      if (importAnimActive.current) {
        setHzPx(projectFromBounds(bounds, MAP_HUBS.hangzhou, width, height));
      }
    },
    [layoutFromBounds, selected, width, height]
  );

  // 选中城市变化 / 卡片高度就位 / 地图就绪：立即重锚定一次。
  // 还没有 bounds 时（首帧 region 事件未发）用原生 project() 兜底——它同样含 padding；
  // 必须等 mapReady，否则样式未就位时 project 结果不可靠。
  useEffect(() => {
    const b = viewBounds.current;
    if (b) {
      layoutFromBounds(b, selected);
    } else if (mapReady) {
      mapRef.current?.project(MAP_HUBS[selected]).then((p) => {
        if (p) layoutCard(p[0], p[1]);
      });
    }
  }, [selected, mapReady, layoutFromBounds, layoutCard]);

  useEffect(() => {
    if (pulseKey === 0 || !mapReady) return;
    let cancelled = false;
    // 投影杭州到屏幕坐标后播 RN 脉动环（对照 ChinaMap 的 pulse）；
    // 线形改为地图图层渐进绘制：沿真实沪杭线形按动画进度截取前缀 setData，
    // ~50ms 一帧、2.8s 画完（对照原 arc 时长）。图层在地理坐标系里，相机跟手天然解决。
    mapRef.current?.project(MAP_HUBS.hangzhou).then((hz) => {
      if (cancelled || !hz) return;
      setHzPx(hz);
      pulse.setValue(0);
      // 播放期间锚点跟随相机（onRegionChange 里逐帧重投影）；播完清除叠加层与线形
      importAnimActive.current = true;
      if (IMPORT_ROUTE) {
        const t0 = Date.now();
        if (importDrawTimer.current) clearInterval(importDrawTimer.current);
        importDrawTimer.current = setInterval(() => {
          const f = (Date.now() - t0) / 2800;
          setImportFrac(Math.min(f, 1));
          if (f >= 1 && importDrawTimer.current) {
            clearInterval(importDrawTimer.current);
            importDrawTimer.current = null;
          }
        }, 50);
      }
      if (importAnimTimer.current) clearTimeout(importAnimTimer.current);
      importAnimTimer.current = setTimeout(() => {
        importAnimActive.current = false;
        setHzPx(null);
        setImportFrac(null);
      }, 3000); // pulse 1.6s×2 与绘制 2.8s 取较长者 + 余量
      Animated.loop(
        Animated.timing(pulse, { toValue: 1, duration: 1600, useNativeDriver: true }),
        { iterations: 2 }
      ).start();
    });
    return () => {
      cancelled = true;
      importAnimActive.current = false;
      if (importAnimTimer.current) clearTimeout(importAnimTimer.current);
      if (importDrawTimer.current) clearInterval(importDrawTimer.current);
    };
  }, [pulseKey, mapReady, pulse]);

  const onHubPress = useCallback(
    (e: NativeSyntheticEvent<PressEventWithFeatures>) => {
      const id = e.nativeEvent.features[0]?.properties?.id as CityId | undefined;
      if (id) onCityPress(id);
    },
    [onCityPress]
  );

  // 脉动环：base 半径 13，scale 0.4 → 2.8，透明度 0.45 → 0（对照 mock）
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.8] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  // 线路高亮两层样式：白色 casing 让它从底图跳出来，accent 主线宽度随缩放插值（z3≈2pt / z10≈4pt）
  const routeCasingPaint = {
    'line-color': '#ffffff',
    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 5, 10, 8],
    'line-opacity': 0.9,
  } as GeoJSONLinePaint;
  const routeLinePaint = {
    'line-color': colors.accent,
    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2, 10, 4],
  } as GeoJSONLinePaint;
  const routeLineLayout = { 'line-cap': 'round', 'line-join': 'round' } as GeoJSONLineLayout;

  return (
    <View style={{ width, height }}>
      <Map
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        mapStyle={mapStyle as unknown as StyleSpecification}
        dragPan
        touchZoom
        doubleTapZoom
        doubleTapHoldZoom={false}
        touchRotate={false}
        touchPitch={false}
        compass={false}
        scaleBar={false}
        logo={false}
        attribution
        attributionPosition={{ top: insets.top + 68, left: 12 }}
        onRegionIsChanging={onRegionChange}
        onRegionDidChange={onRegionChange}
        onDidFinishLoadingMap={() => setMapReady(true)}
      >
        {/* bounds 适配任意屏幕尺寸装下中国；padding 底部给 sheet 留位、顶部避开搜索胶囊。
            minZoom 取 1.5：留了底部 padding 后初始 fit 可能低到约 1.9，再大就把中国裁掉。 */}
        <Camera
          initialViewState={{
            bounds: MAP_BOUNDS,
            padding: { top: insets.top + 76, right: 12, bottom: Math.round(height * 0.4), left: 12 },
          }}
          minZoom={1.5}
          maxZoom={17}
        />

        {/* 选中行程的线路高亮（真实铁路线形，静态）：渲染在城市点之下 */}
        <GeoJSONSource id="trip-route" data={tripRouteFC}>
          <Layer id="trip-route-casing" type="line" layout={routeLineLayout} paint={routeCasingPaint} />
          <Layer id="trip-route-line" type="line" layout={routeLineLayout} paint={routeLinePaint} />
        </GeoJSONSource>

        {/* 导入动画：同一份真实线形按进度渐进绘制（「产生连接」） */}
        <GeoJSONSource id="import-route" data={importRouteFC}>
          <Layer id="import-route-casing" type="line" layout={routeLineLayout} paint={routeCasingPaint} />
          <Layer id="import-route-line" type="line" layout={routeLineLayout} paint={routeLinePaint} />
        </GeoJSONSource>

        {/* 未到访城市：灰点 */}
        <GeoJSONSource id="off" data={OFF_FC}>
          <Layer
            id="off-dot"
            type="circle"
            paint={{
              'circle-radius': 2.6,
              'circle-color': colors.dotOff,
              'circle-stroke-color': '#fff',
              'circle-stroke-width': 1,
            }}
          />
        </GeoJSONSource>

        {/* 点亮城市：双层圆（16% 光晕 + 白描边实心点） */}
        <GeoJSONSource id="lit" data={LIT_FC}>
          <Layer
            id="lit-halo"
            type="circle"
            paint={{ 'circle-radius': 9, 'circle-color': colors.accent, 'circle-opacity': 0.16 }}
          />
          <Layer
            id="lit-dot"
            type="circle"
            paint={{
              'circle-radius': 3.4,
              'circle-color': colors.accent,
              'circle-stroke-color': '#fff',
              'circle-stroke-width': 1.3,
            }}
          />
          {/* 城市名标注：全景缩放下不至于「只剩光点」。Bing 地名层已剔除这 13 城
              （buildMapStyle 的运行时剔除），全程只有我们这一份标注。
              字号随缩放放大——点亮城市是用户数据的主角，不能被底图区域名压过。
              maxzoom 8：再放大进入街区细节，城市名标注就没有存在必要了。
              text-optional 允许字挤时省略标注但不藏点。 */}
          <Layer
            id="lit-label"
            type="symbol"
            maxzoom={8}
            layout={{
              'text-field': ['get', 'name'],
              'text-font': ['Roboto-Bold'],
              'text-size': ['interpolate', ['linear'], ['zoom'], 2, 11, 5, 14, 8, 19],
              'text-offset': [0, 1.1],
              'text-anchor': 'top',
              'text-optional': true,
            }}
            paint={{
              'text-color': colors.ink,
              'text-halo-color': 'rgba(255, 255, 255, 0.9)',
              'text-halo-width': 1.4,
            }}
          />
        </GeoJSONSource>

        {/* 选中城市：大光晕 + 加粗点 */}
        <GeoJSONSource id="sel" data={selFC}>
          <Layer
            id="sel-halo"
            type="circle"
            paint={{ 'circle-radius': 13, 'circle-color': colors.accent, 'circle-opacity': 0.22 }}
          />
          <Layer
            id="sel-dot"
            type="circle"
            paint={{
              'circle-radius': 4,
              'circle-color': colors.accent,
              'circle-stroke-color': '#fff',
              'circle-stroke-width': 1.4,
            }}
          />
        </GeoJSONSource>

        {/* 可交互热区：北京 / 上海 / 杭州（默认 44×44 hitbox） */}
        <GeoJSONSource id="hubs" data={LIT_FC} onPress={onHubPress}>
          <Layer
            id="hub-hit"
            type="circle"
            filter={['has', 'id']}
            paint={{ 'circle-radius': 10, 'circle-color': 'rgba(0,0,0,0)' }}
          />
        </GeoJSONSource>
      </Map>

      {/* 导入反馈：杭州位置脉动环 ×2（RN Animated 叠加层）；线形渐进绘制是地图图层，见上 */}
      {hzPx && pulseKey > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View
            style={[
              styles.ring,
              {
                left: hzPx[0] - 13,
                top: hzPx[1] - 13,
                opacity: ringOpacity,
                transform: [{ scale: ringScale }],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent,
  },
});
