// 统一玻璃容器：半透明白底 + 1px 半透明白边（mock 的 --glass/--glass-border）。
// iOS 额外叠 BlurView 真模糊；Android 的 expo-blur 兼容差，只用半透明底色。
// 注意：背景层必须放在「无 padding 的外层」——RN 的绝对定位相对父级 padding box，
// 直接把 BlurView 塞进带 padding 的容器会被内缩，在 Android 上看起来就是「玻璃里嵌一个白盒」。
import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme';

interface Props {
  radius: number;
  style?: StyleProp<ViewStyle>; // 定位/尺寸/阴影
  contentStyle?: StyleProp<ViewStyle>; // padding/布局
  children?: React.ReactNode;
}

export default function Glass({ radius, style, contentStyle, children }: Props) {
  return (
    <View style={[styles.base, { borderRadius: radius }, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
});
