import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { GlassBlur } from './Glass';
import { PlusIcon, ProfileIcon, ReviewIcon } from './icons';

interface Props {
  reviewActive: boolean;
  onReview: () => void;
  onImport: () => void;
}

export default function TabBar({ reviewActive, onReview, onImport }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.bar}>
      {/* 模糊层统一走 GlassBlur（内部已配 blurMethod + blurTarget）。
          注意这一层不能加 padding，会把 absoluteFill 内缩成内嵌白盒。 */}
      <GlassBlur />
      {/* 半透明白盖在模糊之上（同 Glass 的叠放顺序），不要垫在 BlurView 下面 */}
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: colors.tabBg }]} />
      <View style={[styles.barInner, { paddingBottom: insets.bottom }]}>
        <Pressable style={styles.item} onPress={onReview}>
          <ReviewIcon color={reviewActive ? colors.accent : colors.ink2} />
          <Text style={[styles.label, reviewActive && styles.labelActive]}>回顾</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={onImport} accessibilityLabel="导入截图">
          <View style={styles.importBtn}>
            <PlusIcon color="#fff" />
          </View>
        </Pressable>
        <Pressable style={styles.item}>
          <ProfileIcon color={colors.ink2} />
          <Text style={styles.label}>我的</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
  },
  barInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.2,
    color: colors.ink2,
    lineHeight: 12,
  },
  labelActive: { color: colors.accent, fontWeight: '600' },
  importBtn: {
    width: 50,
    height: 50,
    marginTop: -14,
    borderRadius: 25,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
