import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Line, Rect } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
// expo-media-library 的原生模块不在 Expo Go（Android）里，只能在使用处懒加载，
// 静态 import 会让整个 bundle 在加载期崩溃。
import { colors, inkA } from '../theme';
import { ticketDateCN, ticketParts, ticketSerial, Trip } from '../data';
import { CloseIcon } from './icons';

type Skin = 'cr' | 'jr';

// canvas 1140x660 的比例
const TICKET_AR = 660 / 1140;

// 票面字体族：iOS 即 PingFang SC（系统默认），Android 用 sans-serif
const TFONT = undefined;

// ---------------- 票面（纯 View/SVG 绘制，供 view-shot 截 PNG） ----------------

function Barcode({ serial, s }: { serial: string; s: number }) {
  // mock: bx 从 W-330 开始，每字符宽 (charCode%3+1)*4，间距 5，高 60
  let x = 810;
  const bars: { x: number; w: number }[] = [];
  for (let i = 0; i < serial.length; i++) {
    const w = ((serial.charCodeAt(i) % 3) + 1) * 4;
    bars.push({ x, w });
    x += w + 5;
  }
  return (
    <Svg
      style={{ position: 'absolute', left: 0, top: 0 }}
      width={1140 * s}
      height={660 * s}
      viewBox="0 0 1140 660"
    >
      {bars.map((b, i) => (
        <Rect key={i} x={b.x} y={660 - 116} width={b.w} height={60} fill="#1b2c3d" />
      ))}
    </Svg>
  );
}

function Stripes({ s }: { s: number }) {
  // 斜纹底纹：rgba(255,255,255,0.5) 2px 间隔 22 的 45° 斜线
  const lines: number[] = [];
  for (let x = -660; x < 1140 + 660; x += 22) lines.push(x);
  return (
    <Svg
      style={{ position: 'absolute', left: 0, top: 0 }}
      width={1140 * s}
      height={660 * s}
      viewBox="0 0 1140 660"
    >
      {lines.map((x, i) => (
        <Line key={i} x1={x} y1={660} x2={x + 660} y2={0}
          stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
      ))}
    </Svg>
  );
}

export function TicketView({ trip, skin, width }: { trip: Trip; skin: Skin; width: number }) {
  const s = width / 1140;
  const h = width * TICKET_AR;
  const serial = ticketSerial(trip);
  const tk = ticketParts(trip);
  const dt = ticketDateCN(trip, skin === 'cr');

  if (skin === 'cr') {
    return (
      <View style={{ width, height: h, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient colors={['#e7f0f9', '#d1e1f1']} style={StyleSheet.absoluteFill} />
        <Stripes s={s} />
        <View style={{
          position: 'absolute', top: 16 * s, left: 16 * s, right: 16 * s, bottom: 16 * s,
          borderWidth: Math.max(1, 5 * s), borderColor: '#2c5e97', borderRadius: Math.max(2, 10 * s),
        }} />
        <Text style={{
          position: 'absolute', left: 52 * s, top: (76 - 32) * s,
          fontSize: 32 * s, fontWeight: '700', color: '#c8332b', fontFamily: TFONT,
        }}>{serial}</Text>
        <Text style={{
          position: 'absolute', top: (216 - 66) * s, left: 0, right: 0, textAlign: 'center',
          fontSize: 66 * s, fontWeight: '700', color: '#1b2c3d', fontFamily: TFONT,
        }}>{trip.from}站 → {trip.to}站</Text>
        <Text style={{
          position: 'absolute', top: (288 - 36) * s, left: 0, right: 0, textAlign: 'center',
          fontSize: 36 * s, fontWeight: '600', color: '#1b2c3d', fontFamily: TFONT,
        }}>{trip.train} 次</Text>
        <Text style={{
          position: 'absolute', top: (356 - 33) * s, left: 0, right: 0, textAlign: 'center',
          fontSize: 33 * s, color: '#1b2c3d', fontFamily: TFONT,
        }}>{dt.full} {trip.dep} 开</Text>
        <Text style={{
          position: 'absolute', top: (420 - 31) * s, left: 0, right: 0, textAlign: 'center',
          fontSize: 31 * s, color: '#1b2c3d', fontFamily: TFONT,
        }}>{tk.slice(0, 3).join('　')}　{tk[3] || ''}</Text>
        <Text style={{
          position: 'absolute', left: 52 * s, top: (660 - 56 - 24) * s,
          fontSize: 24 * s, color: '#34506e', fontFamily: TFONT,
        }}>限乘当日当次车</Text>
        <Barcode serial={serial} s={s} />
        <Text style={{
          position: 'absolute', top: (660 - 24 - 20) * s, left: 0, right: 0, textAlign: 'center',
          fontSize: 20 * s, color: '#7d93ab', fontFamily: TFONT,
        }}>Lineage 出行档案 · 截图留念，不作乘车凭证</Text>
      </View>
    );
  }

  // JR 蓝票
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
        fontSize: 26 * s, fontWeight: '600', color: '#35617f', fontFamily: TFONT,
      }}>乗　車　券</Text>
      <Text style={{
        position: 'absolute', top: (226 - 60) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 60 * s, fontWeight: '700', color: '#16324a', fontFamily: TFONT,
      }}>{trip.from} → {trip.to}</Text>
      <Text style={{
        position: 'absolute', top: (302 - 30) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 30 * s, color: '#2c4a63', fontFamily: TFONT,
      }}>{dt.full}　{trip.dep} 発</Text>
      <Text style={{
        position: 'absolute', top: (366 - 30) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 30 * s, color: '#2c4a63', fontFamily: TFONT,
      }}>{trip.train}　{tk.slice(0, 3).join('　')}</Text>
      <Text style={{
        position: 'absolute', right: 52 * s, top: (660 - 52 - 24) * s,
        fontSize: 24 * s, color: '#6a8aa0', fontFamily: TFONT,
      }}>{serial}</Text>
      <Text style={{
        position: 'absolute', top: (660 - 22 - 20) * s, left: 0, right: 0, textAlign: 'center',
        fontSize: 20 * s, color: '#8aa2b0', fontFamily: TFONT,
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
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
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
    </Modal>
  );
}

// 票面宽度由 TicketModal 按屏宽计算。

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    backgroundColor: inkA(0.38),
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
