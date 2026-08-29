import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, glassShadow, inkA } from '../theme';
import { City } from '../data';
import { ChevronSmall, CloseIcon } from './icons';

interface Props {
  city: City;
  visible: boolean;
  top: number; // 固定显示在搜索胶囊下方
  onClose: () => void;
  onShowAll: () => void;
}

export default function CityCard({ city, visible, top, onClose, onShowAll }: Props) {
  const { width: winW } = useWindowDimensions();
  const scale = winW / 390; // mock 设计宽度 390
  const anim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const width = 244 * scale;
  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.card,
        glassShadow,
        {
          top,
          left: 16,
          width,
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }],
        },
      ]}
    >
      <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 16 }]} />
      {/* 小箭头（朝上指向地图，真地图上不再精确对点） */}
      <View style={[styles.arrow, { top: -6, left: 24 }]} />
      <Pressable style={styles.close} onPress={onClose} hitSlop={6}>
        <CloseIcon color={colors.ink2} />
      </Pressable>
      <Text style={styles.title}>
        {city.name}
        <Text style={styles.sep}>{' · '}</Text>
        <Text style={styles.times}>来过 {city.times} 次</Text>
      </Text>
      <Text style={styles.row}>{city.recent}</Text>
      <Text style={styles.row}>{city.route}</Text>
      <Pressable
        onPress={onShowAll}
        style={({ pressed }) => [styles.foot, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.footText}>查看全部 {city.times} 次行程</Text>
        <ChevronSmall color={colors.ink2} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    borderRadius: 16,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 13,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'visible',
  },
  arrow: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: inkA(0.06),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 17, fontWeight: '700', lineHeight: 17 * 1.35, color: colors.ink },
  sep: { color: colors.ink2, fontWeight: '400' },
  times: { fontWeight: '600' },
  row: { fontSize: 13, color: colors.ink2, lineHeight: 13 * 1.75, marginTop: 2 },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: inkA(0.08),
  },
  footText: { fontSize: 12, color: colors.ink, lineHeight: 12 * 1.4 },
});
