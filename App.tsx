import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurTargetView } from 'expo-blur';
import { colors, glassShadow } from './src/theme';
import { ALL_TRIPS, CITIES, CityId, dateKey, Trip } from './src/data';
import { routeFor } from './src/routes';
import MapView from './src/components/MapView';
import CityCard from './src/components/CityCard';
import Glass, { GlassBlurTargetContext } from './src/components/Glass';
import BottomSheet, { CityListData, Pane, ReviewMode } from './src/components/BottomSheet';
import TabBar from './src/components/TabBar';
import TicketModal from './src/components/TicketModal';
import { SearchIcon } from './src/components/icons';

function Screen() {
  const insets = useSafeAreaInsets();
  const { width: winW, height: winH } = useWindowDimensions();

  // ---------- 状态（对照 mock JS） ----------
  const [pane, setPane] = useState<Pane>('home');
  const [lastPane, setLastPane] = useState<Pane>('home');
  const [selectedCity, setSelectedCity] = useState<CityId>('hangzhou');
  const [cardVisible, setCardVisible] = useState(false); // 城市卡只在点选城市后出现（mock 默认显示杭州是演示残留）
  const [cityListReturn, setCityListReturn] = useState<'home' | 'review'>('home');
  const [cityList, setCityList] = useState<CityListData>({ title: '', sub: '', trips: [] });
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [tripStack, setTripStack] = useState<Trip[]>([]);
  const [reviewMode, setReviewMode] = useState<ReviewMode>('city');
  const [modelOpen, setModelOpen] = useState(false);
  const [lineageOpen, setLineageOpen] = useState<'train' | 'interval' | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const [ticketVisible, setTicketVisible] = useState(false);
  const [, bumpNotes] = useState(0); // 备注是就地改 mock 对象，用它触发重渲

  const tall = pane === 'city' || pane === 'review';
  const tabHeight = 47 + insets.bottom;
  // Android 真模糊的采样目标：包住地图，所有玻璃表面的 BlurView 从 context 取它
  const blurTargetRef = useRef<View>(null);

  // ---------- 城市卡 ----------
  const selectCity = useCallback((id: CityId) => {
    setSelectedCity(id);
    setCardVisible(true);
    setPane((p) => (p === 'home' ? p : 'home'));
  }, []);

  // ---------- 行程详情 ----------
  const openTrip = useCallback((t: Trip, viaLink: boolean, keepStack = false) => {
    if (viaLink && currentTrip) setTripStack((s) => [...s, currentTrip]);
    if (!viaLink && !keepStack) {
      setTripStack([]);
      setLastPane(pane); // 记住来路（home / city / review），返回时原路退回
    }
    setCurrentTrip(t);
    setModelOpen(false);
    setLineageOpen(null);
    setPane('trip');
  }, [currentTrip, pane]);

  // ---------- 城市卡「查看全部」 ----------
  const onShowCityTrips = useCallback(() => {
    const c = CITIES[selectedCity];
    setCityListReturn('home');
    setCityList({ title: c.name, sub: `来过 ${c.times} 次`, trips: c.trips });
    setCardVisible(false);
    setPane('city');
  }, [selectedCity]);

  // ---------- 全部行程（全局时间线） ----------
  const onAllTrips = useCallback(() => {
    setCityListReturn('home');
    setCityList({
      title: '全部行程',
      sub: `共 ${ALL_TRIPS.length} 次`,
      trips: ALL_TRIPS.slice().sort((a, b) => dateKey(b) - dateKey(a)),
    });
    setCardVisible(false);
    setPane('city');
  }, []);

  // ---------- 回顾 ----------
  const onOpenGroup = useCallback((title: string, sub: string, trips: Trip[]) => {
    setCityListReturn('review');
    setCityList({ title, sub, trips });
    setCardVisible(false);
    setPane('city');
  }, []);

  const onReviewTab = useCallback(() => {
    setCardVisible(false);
    setPane('review');
  }, []);

  // ---------- 返回 ----------
  const onBack = useCallback(() => {
    if (pane === 'trip') {
      if (tripStack.length) {
        const prev = tripStack[tripStack.length - 1];
        setTripStack((s) => s.slice(0, -1));
        openTrip(prev, false, true);
        return;
      }
      setPane(lastPane === 'city' ? 'city' : lastPane === 'review' ? 'review' : 'home');
      return;
    }
    if (pane === 'city' && cityListReturn === 'review') {
      setPane('review');
      return;
    }
    setPane('home');
  }, [pane, tripStack, lastPane, cityListReturn, openTrip]);

  // ---------- 导入 loop ----------
  const onImportConfirm = useCallback(() => {
    setPane('imported');
    setPulseKey((k) => k + 1); // 地图脉动 + 区间线浮现
  }, []);

  // ---------- 备注 toggle（就地演示「写上 ↔ 清空」） ----------
  const onToggleNote = useCallback(() => {
    if (!currentTrip) return;
    currentTrip.note = currentTrip.note ? '' : '出差';
    bumpNotes((v) => v + 1);
  }, [currentTrip]);

  // 地图满屏（absoluteFill），sheet / 搜索胶囊 / tab bar 全部叠在地图上，不再有底色接缝。
  // ChinaMap 降级方案按自身宽高比布局在顶部，不受影响。

  // ---------- 城市卡锚定（真实地图由 RealMap 相机事件驱动；降级地图停在搜索胶囊下方） ----------
  const cardPos = useRef(
    new Animated.ValueXY({ x: 16, y: insets.top + 8 + 48 + 12 })
  ).current;
  const [cardH, setCardH] = useState(140); // 估算值，onLayout 后校准
  const [cardArrow, setCardArrow] = useState({ up: true, x: 30 });
  const onCardMeta = useCallback(
    (m: { up: boolean; x: number }) =>
      setCardArrow((cur) => (cur.up === m.up && Math.abs(cur.x - m.x) < 0.5 ? cur : m)),
    []
  );
  const cardAnchor = useMemo(
    () => ({ pos: cardPos, cardH, onMeta: onCardMeta }),
    [cardPos, cardH, onCardMeta]
  );

  // trip 详情打开期间，把该行程发到站的真实铁路线形传给地图高亮；关闭即消失。
  // 双向复用同一份线形（routeFor 按 from→to 返回方向正确的坐标）。
  const tripRoute = pane === 'trip' && currentTrip
    ? routeFor(currentTrip.from, currentTrip.to)
    : null;

  return (
    <GlassBlurTargetContext.Provider value={blurTargetRef}>
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <BlurTargetView ref={blurTargetRef} style={StyleSheet.absoluteFill}>
        <MapView width={winW} height={winH} selected={cardVisible ? selectedCity : null} pulseKey={pulseKey} tripRoute={tripRoute} onCityPress={selectCity} cardAnchor={cardAnchor} />
      </BlurTargetView>

      {/* 搜索胶囊（车次反查入口，mock 中无点击行为） */}
      <Glass radius={24} style={[styles.search, glassShadow, { top: insets.top + 8 }]} contentStyle={styles.searchInner}>
        <SearchIcon color={colors.ink2} />
        <Text style={styles.searchText}>搜车次、城市或车站</Text>
      </Glass>

      <CityCard
        city={CITIES[selectedCity]}
        visible={cardVisible}
        pos={cardPos}
        arrowUp={cardArrow.up}
        arrowX={cardArrow.x}
        onHeight={setCardH}
        onClose={() => setCardVisible(false)}
        onShowAll={onShowCityTrips}
      />

      <BottomSheet
        pane={pane}
        tall={tall}
        tabHeight={tabHeight}
        cityList={cityList}
        currentTrip={currentTrip}
        reviewMode={reviewMode}
        modelOpen={modelOpen}
        lineageOpen={lineageOpen}
        onBack={onBack}
        onOpenTrip={(t, viaLink) => openTrip(t, viaLink)}
        onAllTrips={onAllTrips}
        onReviewMode={setReviewMode}
        onOpenGroup={onOpenGroup}
        onToggleModel={() => setModelOpen((v) => !v)}
        onToggleLineage={(which) => setLineageOpen((cur) => (cur === which ? null : which))}
        onToggleNote={onToggleNote}
        onExport={() => setTicketVisible(true)}
        onImportConfirm={onImportConfirm}
        onImportDone={() => setPane('home')}
      />

      <TabBar
        reviewActive={pane === 'review'}
        onReview={onReviewTab}
        onImport={() => setPane('import')}
      />

      <TicketModal
        visible={ticketVisible}
        trip={currentTrip}
        onClose={() => setTicketVisible(false)}
      />
    </View>
    </GlassBlurTargetContext.Provider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Screen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.sea },
  search: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 48,
  },
  searchInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  searchText: { fontSize: 15, color: colors.ink2 },
});
