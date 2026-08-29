// 真实地图：MapLibre + Bing 中国版矢量瓦片。
// 本文件只被 MapView.tsx 在探测到原生模块后懒加载 require，绝不能被静态 import。
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';
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
import { colors } from '../theme';
import { MAP_STYLE } from '../mapstyle';
import { CityId, MAP_BOUNDS, MAP_HUBS, MAP_LIT, MAP_OFF } from '../data';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const pt = (coord: [number, number], properties: GeoJSON.GeoJsonProperties = {}): GeoJSON.Feature => ({
  type: 'Feature',
  properties,
  geometry: { type: 'Point', coordinates: coord },
});
const fc = (features: GeoJSON.Feature[]): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features,
});

// 点亮城市 = 可交互三城 + 其余 10 城
const LIT_FC = fc([
  ...(Object.keys(MAP_HUBS) as CityId[]).map((id) => pt(MAP_HUBS[id], { id })),
  ...MAP_LIT.map((c) => pt(c)),
]);
const OFF_FC = fc(MAP_OFF.map((c) => pt(c)));
// 导入反馈的区间线：上海 → 杭州（mock 写死）
const IMPORT_LINE_FC = fc([{
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [MAP_HUBS.shanghai, MAP_HUBS.hangzhou] },
}]);

// Web Mercator 世界坐标（单位：pt，瓦片 512 基准）。旋转/俯仰已禁用，bearing/pitch 恒 0，
// 因此「经纬度 → 屏幕坐标」可以用 center+zoom 在本地精确换算，不必每帧走原生 project()。
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
  onCityPress: (id: CityId) => void;
  cardAnchor: CardAnchor;
}

export default function RealMap({ width, height, selected, pulseKey, onCityPress, cardAnchor }: Props) {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState(false);
  // 导入动画的屏幕坐标锚点（动画 2 秒内若用户拖动地图会漂移，播完即消失，可接受）
  const [hzPx, setHzPx] = useState<[number, number] | null>(null);
  const [shPx, setShPx] = useState<[number, number] | null>(null);

  const selFC = useMemo(() => fc([pt(MAP_HUBS[selected])]), [selected]);

  const pulse = useRef(new Animated.Value(0)).current;
  const arc = useRef(new Animated.Value(0)).current;

  // ---------- 城市卡锚定 ----------
  const { pos: cardPos, cardH, onMeta } = cardAnchor;
  // 最近一次相机状态（region 事件每帧更新；初始为 null，用一次性 project() 兜底）
  const viewState = useRef<{ center: [number, number]; zoom: number } | null>(null);

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

  const layoutFromViewState = useCallback(
    (center: [number, number], zoom: number, city: CityId) => {
      const ws = 512 * 2 ** zoom;
      const [cx, cy] = merc(center[0], center[1], ws);
      const c = MAP_HUBS[city];
      const [x, y] = merc(c[0], c[1], ws);
      layoutCard(x - cx + width / 2, y - cy + height / 2);
    },
    [layoutCard, width, height]
  );

  // 相机每帧变化（拖动/缩放中）与停下时都重投影卡片锚点
  const onRegionChange = useCallback(
    (e: NativeSyntheticEvent<ViewStateChangeEvent>) => {
      const { center, zoom } = e.nativeEvent;
      viewState.current = { center, zoom };
      layoutFromViewState(center, zoom, selected);
    },
    [layoutFromViewState, selected]
  );

  // 选中城市变化 / 卡片高度就位 / 地图就绪：立即重锚定一次
  useEffect(() => {
    const vs = viewState.current;
    if (vs) {
      layoutFromViewState(vs.center, vs.zoom, selected);
    } else if (mapReady) {
      mapRef.current?.project(MAP_HUBS[selected]).then((p) => {
        if (p) layoutCard(p[0], p[1]);
      });
    }
  }, [selected, mapReady, layoutFromViewState, layoutCard]);

  useEffect(() => {
    if (pulseKey === 0 || !mapReady) return;
    let cancelled = false;
    // 投影杭州/上海到屏幕坐标后播 RN Animated（对照 ChinaMap 的 pulse/arc）
    Promise.all([
      mapRef.current?.project(MAP_HUBS.hangzhou),
      mapRef.current?.project(MAP_HUBS.shanghai),
    ]).then(([hz, sh]) => {
      if (cancelled || !hz || !sh) return;
      setHzPx(hz);
      setShPx(sh);
      pulse.setValue(0);
      arc.setValue(0);
      Animated.parallel([
        Animated.loop(
          Animated.timing(pulse, { toValue: 1, duration: 1600, useNativeDriver: true }),
          { iterations: 2 }
        ),
        Animated.timing(arc, { toValue: 1, duration: 2800, useNativeDriver: false }),
      ]).start();
    });
    return () => {
      cancelled = true;
    };
  }, [pulseKey, mapReady, pulse, arc]);

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
  const arcOpacity = arc.interpolate({
    inputRange: [0, 0.15, 0.7, 1],
    outputRange: [0, 0.85, 0.6, 0],
  });
  const arcDash = arc.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });

  return (
    <View style={{ width, height }}>
      <Map
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        mapStyle={MAP_STYLE as unknown as StyleSpecification}
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
          maxZoom={12}
        />

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

      {/* 导入反馈：杭州位置脉动环 ×2 + 上海→杭州虚线浮现（RN Animated 叠加层） */}
      {hzPx && shPx && pulseKey > 0 && (
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
          <Svg style={StyleSheet.absoluteFill} width={width} height={height}>
            <AnimatedLine
              x1={shPx[0]}
              y1={shPx[1]}
              x2={hzPx[0]}
              y2={hzPx[1]}
              stroke={colors.accent}
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeDasharray="4 4"
              strokeDashoffset={arcDash}
              opacity={arcOpacity}
            />
          </Svg>
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
