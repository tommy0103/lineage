// 统一玻璃容器：半透明白底 + 1px 半透明白边（mock 的 --glass/--glass-border）。
// BlurView 真模糊：iOS 直接用；Android 走 dimezisBlurViewSdk31Plus（SDK 31+ 真模糊，
// 旧机型降级无底）。expo-blur 57 起 Android 已非「兼容差只能纯色」——别再退回半透明白板。
//
// 关键：Android 的 dimezis 模糊必须指定 blurTarget（指向包住被模糊内容的 BlurTargetView，
// 在 App.tsx 里包着地图），否则原生端静默禁用模糊（safeMethod = NONE）。
// 因此所有玻璃里的 BlurView 统一走 GlassBlur，从 context 取 target，不要各自手写。
//
// 注意：背景层必须放在「无 padding 的外层」——RN 的绝对定位相对父级 padding box，
// 直接把 BlurView 塞进带 padding 的容器会被内缩，在 Android 上看起来就是「玻璃里嵌一个白盒」。
import React, { createContext, RefObject, useContext } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme';

// App.tsx 提供：包住地图的 BlurTargetView 的 ref
export const GlassBlurTargetContext = createContext<RefObject<View | null> | null>(null);

// 预配置好的模糊层：所有玻璃表面共用，保证 blurMethod/blurTarget 不会漏配
export function GlassBlur({
  intensity = 65,
  tint = 'light',
}: {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}) {
  const blurTarget = useContext(GlassBlurTargetContext);
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      blurMethod={Platform.OS === 'android' ? 'dimezisBlurViewSdk31Plus' : undefined}
      blurTarget={blurTarget ?? undefined}
      style={StyleSheet.absoluteFill}
    />
  );
}

interface Props {
  radius: number;
  style?: StyleProp<ViewStyle>; // 定位/尺寸/阴影
  contentStyle?: StyleProp<ViewStyle>; // padding/布局
  children?: React.ReactNode;
}

export default function Glass({ radius, style, contentStyle, children }: Props) {
  return (
    <View style={[styles.base, { borderRadius: radius }, style]}>
      {/* 叠放顺序对应 CSS 的 backdrop-filter：模糊在最底（采样背后的地图），
          半透明白盖在模糊之上。白板垫在 BlurView 下面会被模糊采样进去，变成死白。 */}
      <GlassBlur />
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: colors.glass }]} />
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
});
