import React from 'react';
import {
  Pressable, ScrollView, StyleSheet, Text, TextStyle, useWindowDimensions, View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, glassShadow, inkA } from '../theme';
import {
  ALL_TRIPS, CITIES, CityId, dateKey, intervalName, intervalOthers, MODELS,
  seatParts, ticketParts, trainOrdinal, trainOthers, Trip,
} from '../data';
import {
  BackIcon, ChevronDown, ChevronRow, ChevronSmall, ClockIcon,
  SwapIcon, TicketIcon, TrackIcon,
} from './icons';

export type Pane = 'home' | 'city' | 'review' | 'trip' | 'import' | 'imported';
export type ReviewMode = 'city' | 'month';

export interface CityListData {
  title: string;
  sub: string;
  trips: Trip[];
}

interface Props {
  pane: Pane;
  tall: boolean;
  tabHeight: number;
  cityList: CityListData;
  currentTrip: Trip | null;
  reviewMode: ReviewMode;
  modelOpen: boolean;
  lineageOpen: 'train' | 'interval' | null;
  onBack: () => void;
  onOpenTrip: (t: Trip, viaLink: boolean) => void;
  onAllTrips: () => void;
  onReviewMode: (m: ReviewMode) => void;
  onOpenGroup: (title: string, sub: string, trips: Trip[]) => void;
  onToggleModel: () => void;
  onToggleLineage: (which: 'train' | 'interval') => void;
  onToggleNote: () => void;
  onExport: () => void;
  onImportConfirm: () => void;
  onImportDone: () => void;
}

const tabular: TextStyle = { fontVariant: ['tabular-nums'] };

// 行程行（首页最近 + 城市列表 + 谱系列表共用）
function TripRow({ t, viaLink, onPress, hairline }: {
  t: Trip; viaLink: boolean; hairline: boolean;
  onPress: (t: Trip, viaLink: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(t, viaLink)}
      style={({ pressed }) => [
        styles.tripRow,
        hairline && styles.rowHairline,
        pressed && { backgroundColor: inkA(0.05) },
      ]}
    >
      <Text style={styles.tripTrain}>{t.train}</Text>
      <Text style={styles.tripText}>{t.from}</Text>
      <Text style={styles.tripArrow}>→</Text>
      <Text style={styles.tripText}>{t.to}</Text>
      {t.note ? (
        <Text style={styles.tripNote}>{t.note}</Text>
      ) : null}
      <Text style={styles.tripDate}>{t.date}</Text>
      <ChevronRow color={colors.ink2} />
    </Pressable>
  );
}

function SheetHead({ title, sub, onBack }: {
  title: React.ReactNode; sub?: string; onBack?: () => void;
}) {
  return (
    <View style={styles.sheetHead}>
      {onBack ? (
        <Pressable style={styles.back} onPress={onBack} hitSlop={4}>
          <BackIcon color={colors.ink2} />
        </Pressable>
      ) : null}
      {typeof title === 'string' ? <Text style={styles.sheetTitle}>{title}</Text> : title}
      {sub ? <Text style={styles.sheetSub}>{sub}</Text> : null}
    </View>
  );
}

export default function BottomSheet(props: Props) {
  const { pane, tall, tabHeight } = props;
  const insets = useSafeAreaInsets();
  const { height: winH } = useWindowDimensions();
  const tallTop = insets.top + 70;
  const bottom = tabHeight + 16;
  // 非 tall 时 sheet 高度由内容决定，但给个上限让 trip pane 内部可滚
  const maxH = winH - tallTop - bottom;

  return (
    <View
      style={[
        styles.sheet,
        glassShadow,
        { bottom },
        tall ? { top: tallTop } : { maxHeight: maxH },
      ]}
    >
      <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 20 }]} />
      <View style={styles.grabber} />
      {pane === 'home' && <HomePane {...props} />}
      {pane === 'city' && <CityPane {...props} />}
      {pane === 'review' && <ReviewPane {...props} />}
      {pane === 'trip' && <TripPane {...props} />}
      {pane === 'import' && <ImportPane {...props} />}
      {pane === 'imported' && <ImportedPane {...props} />}
    </View>
  );
}

function HomePane({ onOpenTrip, onAllTrips }: Props) {
  const recent = [CITIES.hangzhou.trips[0], CITIES.hangzhou.trips[1]];
  return (
    <View>
      <Text style={styles.stats}>已点亮 14 城 · 47 次出行</Text>
      <View style={styles.insight}>
        <SwapIcon color={colors.ink2} />
        <Text style={styles.insightText}>沪杭区间 · 今年第 6 次往返</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.recentLabel}>最近行程</Text>
      <View>
        {recent.map((t, i) => (
          <TripRow key={i} t={t} viaLink={false} hairline={false} onPress={onOpenTrip} />
        ))}
      </View>
      <Pressable
        onPress={onAllTrips}
        style={({ pressed }) => [styles.recentMore, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.recentMoreText}>全部 {ALL_TRIPS.length} 次行程</Text>
        <ChevronSmall color={colors.ink2} />
      </Pressable>
    </View>
  );
}

function CityPane({ cityList, onBack, onOpenTrip }: Props) {
  return (
    <View style={styles.paneFlex}>
      <SheetHead title={cityList.title} sub={cityList.sub} onBack={onBack} />
      <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
        {cityList.trips.map((t, i) => (
          <TripRow key={i} t={t} viaLink={false} hairline={i > 0} onPress={onOpenTrip} />
        ))}
      </ScrollView>
    </View>
  );
}

function ReviewPane({ reviewMode, onBack, onReviewMode, onOpenGroup }: Props) {
  let rows: { key: string; name: string; meta: string; onTap: () => void }[];
  if (reviewMode === 'city') {
    const keys = (Object.keys(CITIES) as CityId[])
      .sort((a, b) => CITIES[b].times - CITIES[a].times);
    rows = keys.map((k) => {
      const c = CITIES[k];
      return {
        key: k, name: c.name, meta: `来过 ${c.times} 次`,
        onTap: () => onOpenGroup(c.name, `来过 ${c.times} 次`, c.trips),
      };
    });
  } else {
    const groups: Record<number, Trip[]> = {};
    ALL_TRIPS.forEach((t) => {
      const m = +t.date.split('/')[0];
      (groups[m] = groups[m] || []).push(t);
    });
    const months = Object.keys(groups).map(Number).sort((a, b) => b - a);
    rows = months.map((m) => {
      const ts = groups[m].slice().sort((a, b) => dateKey(b) - dateKey(a));
      return {
        key: String(m), name: `${m} 月`, meta: `${ts.length} 次出行`,
        onTap: () => onOpenGroup(`2025 年 ${m} 月`, `${ts.length} 次出行`, ts),
      };
    });
  }
  return (
    <View style={styles.paneFlex}>
      <SheetHead title="回顾" sub="2025 年" onBack={onBack} />
      <Text style={styles.reviewSum}>今年 47 次出行 · 最常去 上海</Text>
      <View style={styles.seg}>
        {(['city', 'month'] as ReviewMode[]).map((m) => (
          <Pressable
            key={m}
            onPress={() => onReviewMode(m)}
            style={[styles.segBtn, reviewMode === m && styles.segBtnOn]}
          >
            <Text style={[styles.segText, reviewMode === m && styles.segTextOn]}>
              {m === 'city' ? '按城市' : '按月份'}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
        {rows.map((r, i) => (
          <Pressable
            key={r.key}
            onPress={r.onTap}
            style={({ pressed }) => [
              styles.rvRow,
              i > 0 && styles.rowHairline,
              pressed && { backgroundColor: inkA(0.05) },
            ]}
          >
            <View style={styles.rvDot} />
            <Text style={styles.rvName}>{r.name}</Text>
            <Text style={styles.rvMeta}>{r.meta}</Text>
            <View style={{ opacity: 0.55 }}>
              <ChevronRow color={colors.ink2} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function TripPane(props: Props) {
  const {
    currentTrip: t, modelOpen, lineageOpen,
    onBack, onOpenTrip, onToggleModel, onToggleLineage, onToggleNote, onExport,
  } = props;
  if (!t) return null;

  const model = MODELS[t.model] || { family: '动车组', cars: 8, speed: '' };
  const seat = seatParts(t);
  const [tkClass, tkSeat, tkPos, tkPrice] = ticketParts(t);
  const dl = t.dateLong.split(' · ');
  const tO = trainOthers(t);
  const iO = intervalOthers(t);
  const trainLabel = tO.length ? `这趟车的其他 ${tO.length} 次` : '这趟车只坐过这一次';
  const intervalLabel = iO.length ? `${intervalName(t)} 的其他 ${iO.length} 次` : '这条线今年第一次走';

  const renderLink = (which: 'train' | 'interval', label: string, others: Trip[]) => {
    const disabled = others.length === 0;
    const open = lineageOpen === which;
    return (
      <View>
        <Pressable
          disabled={disabled}
          onPress={() => onToggleLineage(which)}
          style={({ pressed }) => [
            styles.lineageLink,
            pressed && !disabled && { backgroundColor: inkA(0.05) },
          ]}
        >
          <Text style={[styles.lineageLabel, disabled && { color: colors.ink2 }]}>{label}</Text>
          {!disabled && (
            <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
              <ChevronSmall color={colors.ink2} />
            </View>
          )}
        </Pressable>
        {open && (
          <View style={styles.lineageList}>
            <ScrollView style={{ maxHeight: 172 }} nestedScrollEnabled
              showsVerticalScrollIndicator={false}>
              {others.map((o, i) => (
                <TripRow key={i} t={o} viaLink hairline={false} onPress={onOpenTrip} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.paneFlex}>
      <SheetHead
        onBack={onBack}
        sub={`第 ${trainOrdinal(t)} 次乘坐`}
        title={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sheetTitle}>{t.train}</Text>
            <Pressable onPress={onToggleModel} style={styles.modelToggle}>
              <Text style={styles.modelChipText}>{t.model}</Text>
              <View style={{ transform: [{ rotate: modelOpen ? '180deg' : '0deg' }] }}>
                <ChevronDown color={colors.ink2} />
              </View>
            </Pressable>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {modelOpen && (
          <View style={styles.modelPanel}>
            <View style={styles.modelStats}>
              <View>
                <Text style={styles.msLabel}>车系</Text>
                <Text style={styles.msValue}>{model.family}</Text>
              </View>
              <View>
                <Text style={styles.msLabel}>编组</Text>
                <Text style={styles.msValue}>{model.cars} 辆</Text>
              </View>
              <View>
                <Text style={styles.msLabel}>运营时速</Text>
                <Text style={styles.msValue}>{model.speed || '—'}</Text>
              </View>
            </View>
            <View style={styles.formation}>
              {Array.from({ length: model.cars }, (_, i) => (
                <View
                  key={i}
                  style={[styles.car, seat && i + 1 === seat.car && styles.carYou]}
                />
              ))}
            </View>
            {seat && (
              <View style={styles.formationCap}>
                <Text style={styles.fcText}>你的车厢</Text>
                <Text style={styles.fcSeat}>
                  {String(seat.car).padStart(2, '0')} 车 {seat.seat}
                </Text>
                <Text style={styles.fcChip}>{seat.pos}</Text>
              </View>
            )}
          </View>
        )}

        {/* 区间块 */}
        <View style={styles.routeHero}>
          <View style={styles.stRow}>
            <Text style={styles.stText}>{t.from}</Text>
            <Text style={styles.stText}>{t.to}</Text>
          </View>
          <View style={styles.tmRow}>
            <Text style={styles.tm}>{t.dep}</Text>
            <View style={styles.track}>
              <View style={styles.trackStart} />
              <View style={styles.trackLine} />
              <Text style={styles.dur}>{t.dur}</Text>
              <View style={styles.trackLine} />
              <View style={styles.trackEnd} />
            </View>
            <Text style={styles.tm}>{t.arr}</Text>
          </View>
        </View>

        <View style={styles.dateline}>
          <Text style={styles.dateText}>{dl[0]}</Text>
          <Text style={styles.relChip}>{dl[1] || ''}</Text>
        </View>
        <View style={styles.ticketLine}>
          <Text style={styles.tkText}>{tkClass}</Text>
          <Text style={styles.tkSeat}>{tkSeat}</Text>
          <Text style={styles.tkText}>{tkPos}</Text>
          <Text style={styles.tkPrice}>{tkPrice}</Text>
        </View>

        <View style={styles.dsec}>
          <Text style={styles.dsecLabel}>备注</Text>
          <Pressable onPress={onToggleNote} hitSlop={4}>
            <Text style={styles.noteEdit}>{t.note || '加个备注'}</Text>
          </Pressable>
        </View>

        <View style={styles.dsec}>
          <View style={styles.lineage}>
            {renderLink('train', trainLabel, tO)}
            <View style={styles.lkSep} />
            {renderLink('interval', intervalLabel, iO)}
          </View>
        </View>

        <Pressable
          onPress={onExport}
          style={({ pressed }) => [styles.btnOutline, pressed && { backgroundColor: 'rgba(255,255,255,0.52)' }]}
        >
          <TicketIcon color={colors.ink2} />
          <Text style={styles.btnOutlineText}>导出车票 PNG</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function ImportPane({ onBack, onImportConfirm }: Props) {
  return (
    <View>
      <SheetHead title="导入截图" sub="已识别 1 张" onBack={onBack} />
      <View style={styles.ocrCard}>
        <Text style={styles.ocrTrain}>G7371</Text>
        <Text style={styles.ocrRoute}>上海虹桥 → 杭州东</Text>
        <Text style={styles.ocrTime}>8/24 · 14:02 发 · CR400BF-A</Text>
      </View>
      <Pressable
        onPress={onImportConfirm}
        style={({ pressed }) => [styles.btnPrimary, pressed && { backgroundColor: colors.accentHover }]}
      >
        <Text style={styles.btnPrimaryText}>存进档案</Text>
      </Pressable>
      <Pressable onPress={onBack} style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.6 }]}>
        <Text style={styles.btnGhostText}>取消</Text>
      </Pressable>
    </View>
  );
}

function ImportedPane({ onImportDone }: Props) {
  return (
    <View>
      <SheetHead title="存好了" sub="G7371 · 8/24" />
      <View style={[styles.resultLine, { borderTopWidth: 0 }]}>
        <SwapIcon color={colors.accent} />
        <Text style={styles.resultText}>
          沪杭区间 · 今年第 6 次往返<Text style={styles.resultDim}>，上次坐的 G7529</Text>
        </Text>
      </View>
      <View style={styles.resultLine}>
        <ClockIcon color={colors.accent} />
        <Text style={styles.resultText}>
          G7371 <Text style={styles.resultDim}>是第一次坐</Text>
        </Text>
      </View>
      <View style={styles.resultLine}>
        <TrackIcon color={colors.accent} />
        <Text style={styles.resultText}>
          杭州 <Text style={styles.resultDim}>来过 9 次了</Text>
        </Text>
      </View>
      <Pressable onPress={onImportDone} style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.6 }]}>
        <Text style={styles.btnGhostText}>完成</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: inkA(0.18),
    alignSelf: 'center',
    marginBottom: 10,
  },
  paneFlex: { flexShrink: 1, minHeight: 0 },
  listScroll: { flexShrink: 1, minHeight: 0 },
  rowHairline: { borderTopWidth: 1, borderTopColor: inkA(0.08) },

  stats: { fontSize: 13, color: colors.ink2, lineHeight: 13 * 1.75 },
  insight: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  insightText: { fontSize: 12.5, color: colors.ink2, lineHeight: 12.5 * 1.6 },
  divider: { height: 1, backgroundColor: inkA(0.08), marginTop: 10, marginBottom: 8 },
  recentLabel: { fontSize: 12, color: colors.ink2, lineHeight: 12 * 1.4, marginBottom: 2 },
  recentMore: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 6, paddingTop: 8, paddingHorizontal: 2,
    borderTopWidth: 1, borderTopColor: inkA(0.08),
  },
  recentMoreText: { fontSize: 12, color: colors.ink2, lineHeight: 12 * 1.4 },

  tripRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 7, paddingHorizontal: 8, marginHorizontal: -8,
    borderRadius: 10,
  },
  tripTrain: { fontSize: 15, fontWeight: '600', color: colors.ink, lineHeight: 15 * 1.4, ...tabular },
  tripText: { fontSize: 15, color: colors.ink, lineHeight: 15 * 1.4 },
  tripArrow: { fontSize: 15, color: colors.ink2, lineHeight: 15 * 1.4 },
  tripDate: { marginLeft: 'auto', fontSize: 13, color: colors.ink2, ...tabular },
  tripNote: {
    fontSize: 12, color: colors.ink2, backgroundColor: inkA(0.06),
    borderRadius: 6, paddingHorizontal: 7, paddingVertical: 1, lineHeight: 12 * 1.5,
    overflow: 'hidden',
  },

  sheetHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  back: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: inkA(0.06),
    alignItems: 'center', justifyContent: 'center',
  },
  sheetTitle: { fontSize: 16, fontWeight: '700', lineHeight: 16 * 1.35, color: colors.ink },
  sheetSub: { fontSize: 12, color: colors.ink2, marginLeft: 'auto' },

  reviewSum: { fontSize: 12.5, color: colors.ink2, lineHeight: 12.5 * 1.6, marginBottom: 10 },
  seg: {
    flexDirection: 'row', padding: 2, marginBottom: 6,
    borderRadius: 10, backgroundColor: inkA(0.06),
  },
  segBtn: { flex: 1, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  segBtnOn: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    shadowColor: '#19232a', shadowOpacity: 0.12, shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 }, elevation: 2,
  },
  segText: { fontSize: 13, fontWeight: '500', color: colors.ink2 },
  segTextOn: { color: colors.ink, fontWeight: '600' },

  rvRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 8, marginHorizontal: -8, borderRadius: 10,
  },
  rvDot: {
    width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.accent,
    marginRight: 9,
    shadowColor: colors.accent, shadowOpacity: 0.9, shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  rvName: { fontSize: 15, fontWeight: '600', color: colors.ink, lineHeight: 15 * 1.4 },
  rvMeta: { marginLeft: 'auto', fontSize: 13, color: colors.ink2, ...tabular },

  modelToggle: {
    alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5,
    marginLeft: 8, paddingVertical: 3, paddingHorizontal: 9,
    borderRadius: 8, backgroundColor: inkA(0.07),
  },
  modelChipText: { fontSize: 11, fontWeight: '500', color: colors.ink2, letterSpacing: 0.2, ...tabular },
  modelPanel: { marginTop: 8 },
  modelStats: { flexDirection: 'row', gap: 20 },
  msLabel: { fontSize: 10.5, color: colors.ink2, letterSpacing: 0.4, lineHeight: 10.5 * 1.4 },
  msValue: { fontSize: 13, fontWeight: '600', color: colors.ink, lineHeight: 13 * 1.5, ...tabular },
  formation: { flexDirection: 'row', gap: 2, marginTop: 9, marginBottom: 5 },
  car: { flex: 1, height: 15, borderRadius: 3, backgroundColor: inkA(0.08) },
  carYou: { backgroundColor: colors.accent },
  formationCap: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  fcText: { fontSize: 11.5, color: colors.ink2, lineHeight: 11.5 * 1.6 },
  fcSeat: { fontSize: 11.5, color: colors.accentHover, fontWeight: '600', lineHeight: 11.5 * 1.6 },
  fcChip: {
    fontSize: 10.5, color: colors.ink2, backgroundColor: inkA(0.07),
    borderRadius: 5, paddingHorizontal: 6, lineHeight: 10.5 * 1.7, overflow: 'hidden',
  },

  routeHero: { marginTop: 12, marginBottom: 6 },
  stRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  stText: { fontSize: 21, fontWeight: '700', lineHeight: 21 * 1.35, color: colors.ink },
  tmRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  tm: { fontSize: 15, fontWeight: '600', color: colors.ink, lineHeight: 15 * 1.2, ...tabular },
  track: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  trackStart: {
    width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#fff',
    borderWidth: 2, borderColor: colors.ink38,
  },
  trackEnd: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.ink38 },
  trackLine: { flex: 1, height: 1, backgroundColor: 'rgba(57, 68, 76, 0.30)' },
  dur: {
    fontSize: 11, color: colors.ink2, backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1, borderColor: 'rgba(57, 68, 76, 0.14)', borderRadius: 999,
    paddingHorizontal: 9, paddingVertical: 1, lineHeight: 11 * 1.6, overflow: 'hidden', ...tabular,
  },

  dateline: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dateText: { fontSize: 13, color: colors.ink2, lineHeight: 13 * 1.7, ...tabular },
  relChip: {
    marginLeft: 'auto', fontSize: 11, color: colors.ink2, backgroundColor: inkA(0.06),
    borderRadius: 999, paddingHorizontal: 9, paddingVertical: 1, lineHeight: 11 * 1.7,
    overflow: 'hidden',
  },
  ticketLine: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 5 },
  tkText: { fontSize: 12.5, color: colors.ink2, lineHeight: 12.5 * 1.7, ...tabular },
  tkSeat: { fontSize: 12.5, color: colors.ink38, lineHeight: 12.5 * 1.7, ...tabular },
  tkPrice: {
    marginLeft: 'auto', fontSize: 12.5, fontWeight: '600', color: colors.ink35,
    lineHeight: 12.5 * 1.7, ...tabular,
  },

  dsec: { marginTop: 18 },
  dsecLabel: { fontSize: 11, color: colors.ink2, letterSpacing: 0.4, lineHeight: 11 * 1.5, marginBottom: 5 },
  noteEdit: { fontSize: 13, fontWeight: '500', color: colors.accent },

  lineage: { borderTopWidth: 1, borderTopColor: inkA(0.10) },
  lineageLink: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    paddingVertical: 10, paddingHorizontal: 8, marginHorizontal: -8, borderRadius: 10,
  },
  lineageLabel: { fontSize: 13, color: colors.ink, lineHeight: 13 * 1.5 },
  lineageList: {
    borderTopWidth: 1, borderTopColor: inkA(0.08), paddingTop: 2, paddingBottom: 4,
  },
  lkSep: { height: 1, backgroundColor: inkA(0.08) },

  btnOutline: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    height: 44, marginTop: 14, borderWidth: 1, borderColor: inkA(0.16),
    borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.28)',
  },
  btnOutlineText: { fontSize: 14, fontWeight: '500', color: colors.ink },

  ocrCard: {
    borderWidth: 1, borderColor: inkA(0.10), borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.55)', paddingVertical: 12, paddingHorizontal: 14,
    marginTop: 4, marginBottom: 12,
  },
  ocrTrain: { fontSize: 17, fontWeight: '700', color: colors.ink, ...tabular },
  ocrRoute: { fontSize: 14, color: colors.ink, marginTop: 1 },
  ocrTime: { fontSize: 12.5, color: colors.ink2, marginTop: 1, ...tabular },
  btnPrimary: {
    height: 44, borderRadius: 12, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '600', color: '#fff', letterSpacing: 0.2 },
  btnGhost: {
    height: 36, marginTop: 6, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  btnGhostText: { fontSize: 13, color: colors.ink2 },

  resultLine: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 7, borderTopWidth: 1, borderTopColor: inkA(0.07),
  },
  resultText: { fontSize: 14, color: colors.ink, lineHeight: 14 * 1.5, flexShrink: 1 },
  resultDim: { color: colors.ink2 },
});
