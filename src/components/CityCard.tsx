import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, glassShadow, inkA } from '../theme';
import { City } from '../data';
import { ChevronSmall, CloseIcon } from './icons';
import Glass from './Glass';

interface Props {
  city: City;
  visible: boolean;
  // 卡片锚定到地图上的城市点：pos 由 RealMap 的相机事件实时驱动（屏幕绝对坐标，卡片左上角）；
  // ChinaMap 降级时 pos 保持初始值（搜索胶囊下方）。
  pos: Animated.ValueXY;
  arrowUp: boolean; // true = 卡片在点下方、箭头朝上（mock 的 arrow-top 变体）
  arrowX: number; // 箭头中心相对卡片左缘的 x
  onHeight: (h: number) => void; // 量出卡片高度，供锚定逻辑决定放上/放下
  onClose: () => void;
  onShowAll: () => void;
}

export default function CityCard({ city, visible, pos, arrowUp, arrowX, onHeight, onClose, onShowAll }: Props) {
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
      onLayout={(e) => onHeight(e.nativeEvent.layout.height)}
      style={[
        styles.card,
        glassShadow,
        {
          width,
          opacity: anim,
          transform: [
            { translateX: pos.x },
            { translateY: pos.y },
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) },
          ],
        },
      ]}
    >
      <Glass radius={16} contentStyle={styles.content}>
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
      </Glass>
      {/* 小箭头指向城市点（对照 mock ::after / .arrow-top）。
          clip 容器只露出卡片外的那半个菱形——若不裁剪，伸进卡片内的半块会在
          Android 上（无 backdrop blur）把玻璃色叠成突兀的白方块。 */}
      <View
        pointerEvents="none"
        style={[arrowUp ? styles.arrowClipTop : styles.arrowClipBottom, { left: arrowX - 9 }]}
      >
        <View style={arrowUp ? styles.arrowUp : styles.arrowDown} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 16, // 供玻璃阴影取形
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 13,
  },
  // 箭头裁剪容器：高 9，恰好露出菱形在卡片外的一半
  arrowClipTop: { position: 'absolute', top: -9, width: 18, height: 9, overflow: 'hidden' },
  arrowClipBottom: { position: 'absolute', bottom: -9, width: 18, height: 9, overflow: 'hidden' },
  // 箭头朝上（卡片在点下方）：左边+上边描边
  arrowUp: {
    position: 'absolute',
    left: 3,
    bottom: -6,
    width: 12,
    height: 12,
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  // 箭头朝下（卡片在点上方）：右边+下边描边
  arrowDown: {
    position: 'absolute',
    left: 3,
    top: -6,
    width: 12,
    height: 12,
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 3,
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
