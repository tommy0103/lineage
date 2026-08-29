import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, glassShadow } from './src/theme';
import { ALL_TRIPS, CITIES, CityId, dateKey, Trip } from './src/data';
import MapView from './src/components/MapView';
import CityCard from './src/components/CityCard';
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
  const [cardVisible, setCardVisible] = useState(true); // mock 初始城市卡可见（杭州）
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

  const mapHeight = winH * 0.58; // 原 mock 地图视觉占比约屏高 55–60%
  const cardTop = insets.top + 8 + 48 + 12; // 搜索胶囊下方

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <MapView width={winW} height={mapHeight} selected={selectedCity} pulseKey={pulseKey} onCityPress={selectCity} />
      </View>

      {/* 搜索胶囊（车次反查入口，mock 中无点击行为） */}
      <View style={[styles.search, glassShadow, { top: insets.top + 8 }]}>
        <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 24 }]} />
        <SearchIcon color={colors.ink2} />
        <Text style={styles.searchText}>搜车次、城市或车站</Text>
      </View>

      <CityCard
        city={CITIES[selectedCity]}
        visible={cardVisible}
        top={cardTop}
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
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  searchText: { fontSize: 15, color: colors.ink2 },
});
