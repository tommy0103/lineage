import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { PlusIcon, ProfileIcon, ReviewIcon } from './icons';

interface Props {
  reviewActive: boolean;
  onReview: () => void;
  onImport: () => void;
}

export default function TabBar({ reviewActive, onReview, onImport }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
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
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    backgroundColor: colors.tabBg,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
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
