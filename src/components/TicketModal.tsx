import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useFonts } from 'expo-font';
// expo-media-library 的原生模块不在 Expo Go（Android）里，只能在使用处懒加载，
// 静态 import 会让整个 bundle 在加载期崩溃。
import { colors, inkA } from '../theme';
import {
  seatParts, stationPinyin, ticketDateCN, ticketGate, ticketJM, ticketParts,
  ticketPassenger, ticketSerial, Trip,
} from '../data';
import { CloseIcon } from './icons';
import { GlassBlur } from './Glass';

type Skin = 'cr' | 'jr';

// JR 票面 canvas 1140x660 的比例
const TICKET_AR = 660 / 1140;
// CR 蓝票基准坐标系 856x540（对照参考实现 TrainTicket.vue），按票面宽度等比缩放
const CR_W = 856;
const CR_H = 540;
const CR_AR = CR_H / CR_W;

// 票面字体（打包的子集化字体，charset 见 scripts/ 备注）：
// 票面正文用宋体（参考实现的 SimSun），站名用黑体 Bold（参考实现的 SimHei）。
// 加载未完成时回退系统字体（undefined）。
const SERIF = 'TicketSerif';
const SANS_BOLD = 'TicketSans';
// 票面正文墨色沿用 theme 主文字色；票号红是票面规范色（参考实现原值 #e35757）
const INK = colors.ink;
const SERIAL_RED = '#e35757';

// ---------------- 票面（纯 View/SVG 绘制，供 view-shot 截 PNG） ----------------

// 蓝票底纹：参考实现 train-ticket-maker 的 bluebg.png（浅蓝底 + CRH 水印），用户明确要用。
// 来源未声明，上架前需自绘或替换（见 Trash/ui-design 讨论）。
function CrBackground({ s }: { s: number }) {
  return (
    <Image
      source={require('../../assets/img/bluebg.png')}
      style={{ position: 'absolute', left: 0, top: 0, width: CR_W * s, height: CR_H * s }}
      resizeMode="stretch"
    />
  );
}

// 伪二维码点阵：由票号 hash 驱动，同一票图案稳定；纯装饰，不含真实信息
function QrCode({ serial, size }: { serial: string; size: number }) {
  const N = 25;
  const cell = size / N;
  let seed = 0;
  for (let i = 0; i < serial.length; i++) seed = (seed * 31 + serial.charCodeAt(i)) >>> 0;
  const rects: React.ReactElement[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let on: boolean;
      if ((x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8)) {
        // 三个角的定位区：7x7 回字 + 一圈空白分隔带
        const fx = x >= N - 8 ? x - (N - 8) : x;
        const fy = y >= N - 8 ? y - (N - 8) : y;
        on = fx < 7 && fy < 7
          && (fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4));
      } else if (y === 6 || x === 6) {
        on = (x + y) % 2 === 0; // timing pattern
      } else {
        const h = (Math.imul(x + 1, 0x9e3779b1) ^ Math.imul(y + 1, 0x85ebca6b) ^ seed) >>> 0;
        on = ((h ^ (h >>> 16)) & 1) === 1;
      }
      if (on) {
        rects.push(
          <Rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell + 0.5} height={cell + 0.5} fill={INK} />,
        );
      }
    }
  }
  return <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{rects}</Svg>;
}

// CSS 长箭头（对照参考实现的 .arrow）机械翻译成 SVG：横线 + 右端箭头
function Arrow({ s }: { s: number }) {
  return (
    <Svg width={200 * s} height={20 * s} viewBox="0 0 200 20">
      <Line x1={0} y1={10} x2={198} y2={10} stroke={INK} strokeWidth={4} />
      <Line x1={184} y1={2} x2={198} y2={10} stroke={INK} strokeWidth={4} />
      <Line x1={184} y1={18} x2={198} y2={10} stroke={INK} strokeWidth={4} />
    </Svg>
  );
}

// 发站/到站：大号黑体站名 + “站”小字 + 下方连写拼音；两字站名两端对齐（参考实现 .two-char）
// 字体对照参考实现：站名/拼音是黑体（SimHei → TicketSans），其余票面正文是宋体（SimSun → TicketSerif）
function CrStation({ name, s }: { name: string; s: number }) {
  const nameStyle = {
    fontSize: 50 * s, fontWeight: '700' as const, color: INK, fontFamily: SANS_BOLD,
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {name.length === 2 ? (
          <View style={{ width: 145 * s, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={nameStyle}>{name[0]}</Text>
            <Text style={nameStyle}>{name[1]}</Text>
          </View>
        ) : (
          <Text style={nameStyle}>{name}</Text>
        )}
        <Text style={{
          fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SANS_BOLD, paddingHorizontal: 4 * s,
        }}>站</Text>
      </View>
      <Text style={{
        fontSize: 26 * s, fontWeight: '600', color: INK, fontFamily: SANS_BOLD, marginTop: -10 * s,
      }}>{stationPinyin(name)}</Text>
    </View>
  );
}

export function TicketView({ trip, skin, width }: { trip: Trip; skin: Skin; width: number }) {
  // 票面字体（思源宋体正文 / 思源黑体站名，GB2312 子集打包）。加载中先用系统字体兜底。
  const [fontsLoaded] = useFonts({
    TicketSerif: require('../../assets/fonts/TicketSerif.ttf'),
    TicketSans: require('../../assets/fonts/TicketSans.ttf'),
  });
  void fontsLoaded; // 未加载完成时 fontFamily 自动回退系统字体，不阻塞渲染
  const serial = ticketSerial(trip);

  if (skin === 'cr') {
    // 中国铁路蓝票：布局逐条对照参考实现 TrainTicket.vue（基准 856x540，flex 流式 + 底部绝对定位）
    const s = width / CR_W;
    const h = width * CR_AR;
    const tk = ticketParts(trip);
    const seat = seatParts(trip);
    const pax = ticketPassenger(trip);
    const dt = ticketDateCN(trip, true);
    // "2025年08月24日" → ["2025","年","08","月","24","日"]，数字大字号、年月日小字号混排
    const dateSegs = dt.full.split(/(\d+)/).filter(Boolean);
    const price = tk[3].replace(/^[¥￥]/, '');
    const small = { fontSize: 24 * s };
    return (
      <View style={{ width, height: h, borderRadius: 14 * s, overflow: 'hidden' }}>
        <CrBackground s={s} />
        <View style={{ flex: 1, paddingTop: 5 * s, paddingLeft: 50 * s, paddingRight: 60 * s }}>
          {/* 顶栏：左票号 / 右检票口 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 35 * s, fontWeight: '700', color: SERIAL_RED, fontFamily: SERIF }}>{serial}</Text>
            <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>检票：{ticketGate(trip)}</Text>
          </View>
          {/* 主信息：发站 / 车次+箭头 / 到站 */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * s }}>
            <View style={{ flex: 1, alignItems: 'center' }}><CrStation name={trip.from} s={s} /></View>
            <View style={{ width: 200 * s, alignItems: 'center' }}>
              <Text style={{
                fontSize: 50 * s, fontWeight: '700', color: INK, fontFamily: SANS_BOLD, lineHeight: 52 * s,
              }}>{trip.train}</Text>
              <View style={{ marginTop: 6 * s }}><Arrow s={s} /></View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}><CrStation name={trip.to} s={s} /></View>
          </View>
          {/* 日期行 + 车厢座位行 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 100 * s, marginTop: 6 * s }}>
            <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>
              {dateSegs.map((seg, i) => (
                <Text key={i} style={/\d/.test(seg) ? undefined : small}>{seg}</Text>
              ))}
              {' '}{trip.dep}<Text style={small}>开</Text>
            </Text>
            <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>
              {seat && (
                <>
                  {String(seat.car).padStart(2, '0')}<Text style={small}>车</Text>
                  {' '}{seat.seat}<Text style={small}>号</Text>
                </>
              )}
            </Text>
          </View>
          {/* 价格行 + 席别 */}
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            paddingRight: 100 * s, marginTop: -10 * s,
          }}>
            <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>
              ￥{price}<Text style={small}>元</Text>
            </Text>
            <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>{tk[0]}</Text>
          </View>
          <Text style={{
            fontSize: 30 * s, fontWeight: '600', color: INK, fontFamily: SERIF, marginTop: 30 * s,
          }}>仅供纪念使用</Text>
          {/* 详情与二维码 */}
          <View style={{ flexDirection: 'row', marginTop: 8 * s }}>
            <View style={{ flex: 1, marginRight: 16 * s }}>
              {/* 乘车人信息为版式占位（mock 无真实乘客数据） */}
              <Text style={{ fontSize: 35 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>
                {pax.id} {pax.name}
              </Text>
              {/* 虚线说明框：对照参考实现的纯 CSS 虚线边框 */}
              <View style={{
                borderWidth: Math.max(1, 2 * s), borderStyle: 'dashed', borderColor: INK,
                marginHorizontal: 28 * s, marginTop: -6 * s, padding: 2 * s,
              }}>
                <Text style={{
                  fontSize: 24 * s, fontWeight: '600', color: INK, fontFamily: SERIF, textAlign: 'center',
                }}>报销凭证 遗失不补</Text>
                <Text style={{
                  fontSize: 24 * s, fontWeight: '600', color: INK, fontFamily: SERIF, textAlign: 'center',
                }}>退票改签时须交回车站</Text>
              </View>
            </View>
            <View style={{ width: 148 * s, height: 148 * s, padding: 6 * s, alignSelf: 'flex-end' }}>
              <QrCode serial={serial} size={136 * s} />
            </View>
          </View>
        </View>
        {/* 底部：左 JM 编码 / 右来源注记（设计红线，必须有） */}
        <View style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 52 * s,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 50 * s, paddingRight: 60 * s,
        }}>
          <Text style={{ fontSize: 30 * s, fontWeight: '600', color: INK, fontFamily: SERIF }}>{ticketJM(trip)}</Text>
          <Text style={{ fontSize: 20 * s, color: inkA(0.55), fontFamily: SERIF }}>
            Lineage 出行档案 · 截图留念，不作乘车凭证
          </Text>
        </View>
      </View>
    );
  }

  // JR 蓝票
  const s = width / 1140;
  const h = width * TICKET_AR;
  const tk = ticketParts(trip);
  const dt = ticketDateCN(trip, false);
  return (
    <View style={{ width, height: h, borderRadius: 8, overflow: 'hidden', backgroundColor: '#eaf2f4' }}>
      <View style={{
        position: 'absolute', top: 14 * s, left: 14 * s, right: 14 * s, bottom: 14 * s,
        borderWidth: Math.max(1, 4 * s), borderColor: '#35617f', borderRadius: Math.max(2, 6 * s),
      }} />
      <View style={{
        position: 'absolute', top: 30 * s, left: 30 * s, right: 30 * s, bottom: 30 * s,
        borderWidth: Math.max(0.5, 1.5 * s), borderColor: '#35617f', borderRadius: Math.max(1, 3 * s),
      }} />
      <Text style={{
        position: 'absolute', top: (78 - 26) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 26 * s, fontWeight: '600', color: '#35617f', fontFamily: SERIF,
      }}>乗　車　券</Text>
      <Text style={{
        position: 'absolute', top: (226 - 60) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 60 * s, fontWeight: '700', color: '#16324a', fontFamily: SERIF,
      }}>{trip.from} → {trip.to}</Text>
      <Text style={{
        position: 'absolute', top: (302 - 30) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 30 * s, color: '#2c4a63', fontFamily: SERIF,
      }}>{dt.full}　{trip.dep} 発</Text>
      <Text style={{
        position: 'absolute', top: (366 - 30) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 30 * s, color: '#2c4a63', fontFamily: SERIF,
      }}>{trip.train}　{tk.slice(0, 3).join('　')}</Text>
      <Text style={{
        position: 'absolute', right: 52 * s, top: (660 - 52 - 24) * s,
        fontSize: 24 * s, color: '#6a8aa0', fontFamily: SERIF,
      }}>{serial}</Text>
      <Text style={{
        position: 'absolute', top: (660 - 22 - 20) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 20 * s, color: '#8aa2b0', fontFamily: SERIF,
      }}>Lineage 出行档案 · 截图留念，不作乘车凭证</Text>
    </View>
  );
}

// ---------------- 导出车票浮层 ----------------

interface Props {
  visible: boolean;
  trip: Trip | null;
  onClose: () => void;
}

// Expo 运行时会把二进制里真实存在的原生模块注册到 globalThis.expo.modules。
// Expo Go（Android）不含 ExpoMediaLibraryNext，此时连 require 都不能碰——
// 它的抛错会被 Expo 异常上报拦成 Uncaught Error，try/catch 拦不干净。
function hasMediaLibraryNative(): boolean {
  const expo = (globalThis as { expo?: { modules?: Record<string, unknown> } }).expo;
  return !!expo?.modules?.ExpoMediaLibraryNext;
}

// 返回 false 表示存相册不可用（Expo Go 缺原生模块或权限被拒），调用方降级到系统分享。
async function saveToAlbum(uri: string): Promise<boolean> {
  if (!hasMediaLibraryNative()) return false;
  try {
    const ML: typeof import('expo-media-library') = require('expo-media-library');
    const { status } = await ML.requestPermissionsAsync();
    if (status !== 'granted') return false;
    await ML.Asset.create(uri);
    return true;
  } catch {
    return false;
  }
}

export default function TicketModal({ visible, trip, onClose }: Props) {
  const [skin, setSkin] = useState<Skin>('cr');
  const [saving, setSaving] = useState(false);
  const ticketRef = useRef<View>(null);
  const { width: winW } = useWindowDimensions();
  // 票面宽度：modal 宽（屏宽 - 22*2 边距）- 16*2 padding
  const ticketW = winW - 22 * 2 - 16 * 2;

  useEffect(() => {
    if (visible) setSkin('cr'); // mock: 打开时重置回中国铁路蓝票
  }, [visible]);

  const onSave = async () => {
    if (!trip || saving) return;
    setSaving(true);
    try {
      const uri = await captureRef(ticketRef, { format: 'png', quality: 1 });
      if (await saveToAlbum(uri)) {
        Alert.alert('已保存', '车票 PNG 已存进相册');
      } else if (await Sharing.isAvailableAsync()) {
        // 原生模块缺失（Expo Go）或权限被拒 → 降级为系统分享
        await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: '保存车票 PNG' });
      } else {
        Alert.alert('无法保存', '请允许访问相册后再试');
      }
    } catch (e) {
      Alert.alert('保存失败', String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* 模糊层统一走 GlassBlur（内部已配 blurMethod + blurTarget）；
            要在无 padding 的层里（padding 会把 absoluteFill 内缩） */}
        <GlassBlur intensity={30} tint="dark" />
        {/* 压暗色盖在模糊之上（backdrop-filter 语义），不要垫在 BlurView 下面 */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: inkA(0.38) }]} />
        <View style={styles.overlayInner}>
          <View style={styles.modal}>
          <View style={styles.head}>
            <Text style={styles.headTitle}>导出车票</Text>
            <Pressable style={styles.close} onPress={onClose} hitSlop={6}>
              <CloseIcon color={colors.ink2} />
            </Pressable>
          </View>
          <View style={styles.pills}>
            {([['cr', '中国铁路蓝票'], ['jr', 'JR 蓝票']] as [Skin, string][]).map(([k, label]) => (
              <Pressable
                key={k}
                onPress={() => setSkin(k)}
                style={[styles.pill, skin === k && styles.pillOn]}
              >
                <Text style={[styles.pillText, skin === k && styles.pillTextOn]}>{label}</Text>
              </Pressable>
            ))}
          </View>
          {trip && (
            <View collapsable={false} ref={ticketRef} style={styles.ticketWrap}>
              <TicketView trip={trip} skin={skin} width={ticketW} />
            </View>
          )}
          <Pressable
            onPress={onSave}
            style={({ pressed }) => [styles.btnPrimary, pressed && { backgroundColor: colors.accentHover }]}
          >
            <Text style={styles.btnPrimaryText}>{saving ? '保存中…' : '保存 PNG'}</Text>
          </Pressable>
          <Pressable onPress={onClose} style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.6 }]}>
            <Text style={styles.btnGhostText}>取消</Text>
          </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// 票面宽度由 TicketModal 按屏宽计算。

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  overlayInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: '#0b1216',
    shadowOpacity: 0.3,
    shadowRadius: 64,
    shadowOffset: { width: 0, height: 24 },
    elevation: 20,
  },
  head: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headTitle: { fontSize: 16, fontWeight: '700', lineHeight: 16 * 1.35, color: colors.ink },
  close: {
    marginLeft: 'auto', width: 26, height: 26, borderRadius: 13,
    backgroundColor: inkA(0.06), alignItems: 'center', justifyContent: 'center',
  },
  pills: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  pill: {
    height: 30, paddingHorizontal: 13, borderRadius: 15,
    borderWidth: 1, borderColor: inkA(0.14),
    alignItems: 'center', justifyContent: 'center',
  },
  pillOn: { backgroundColor: colors.ink28, borderColor: 'transparent' },
  pillText: { fontSize: 12.5, color: colors.ink2 },
  pillTextOn: { color: '#fff', fontWeight: '600' },
  ticketWrap: {
    borderRadius: 8,
    shadowColor: '#19232a', shadowOpacity: 0.14, shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 }, elevation: 4,
    alignSelf: 'center',
  },
  btnPrimary: {
    height: 44, borderRadius: 12, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: 12,
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '600', color: '#fff', letterSpacing: 0.2 },
  btnGhost: {
    height: 36, marginTop: 6, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  btnGhostText: { fontSize: 13, color: colors.ink2 },
});
