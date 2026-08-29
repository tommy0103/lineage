import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path } from 'react-native-svg';
import { colors } from '../theme';
import { CITIES, CityId } from '../data';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

// 中国大陆轮廓（照抄 mock path）
const MAINLAND_D =
  'M 45,70 C 54.3,57.8 69.2,50.8 90,45 C 110.8,39.2 145,37.8 170,35 ' +
  'C 195,32.2 216.7,24.7 240,28 C 263.3,31.3 300.7,44.3 310,55 ' +
  'C 319.3,65.7 302.3,84.5 296,92 C 289.7,99.5 274.7,96.7 272,100 ' +
  'C 269.3,103.3 281,110 280,112 C 279,114 266.7,111 266,112 ' +
  'C 265.3,113 271.7,115.3 276,118 C 280.3,120.7 291,124.7 292,128 ' +
  'C 293,131.3 284,135 282,138 C 280,141 278.2,143.7 280,146 ' +
  'C 281.8,148.3 292.3,149.2 293,152 C 293.7,154.8 286.8,157 284,163 ' +
  'C 281.2,169 280.3,180.2 276,188 C 271.7,195.8 263.5,204 258,210 ' +
  'C 252.5,216 248,219 243,224 C 238,229 235.2,238.3 228,240 ' +
  'C 220.8,241.7 208.7,231.3 200,234 C 191.3,236.7 184,255.3 176,256 ' +
  'C 168,256.7 162.7,241.7 152,238 C 141.3,231 127,221.3 112,214 ' +
  'C 97,206.3 73.3,202.7 62,192 C 50.7,181.3 48.7,162.3 44,150 ' +
  'C 39.3,137.7 33.8,131.3 34,118 C 34.2,104.7 35.7,82.2 45,70 Z';

const OFF_DOTS: [number, number][] = [[178, 240], [292, 82], [258, 140]];
const LIT_DOTS: [number, number][] = [
  [268, 105], [288, 130], [240, 142], [290, 153], [287, 151], [281, 147],
  [256, 170], [226, 182], [206, 174], [252, 194], [273, 204], [243, 226],
  [247, 231],
];

interface Props {
  width: number;
  selected: CityId;
  pulseKey: number; // 递增即重放导入动画
  onCityPress: (id: CityId) => void;
}

export default function ChinaMap({ width, selected, pulseKey, onCityPress }: Props) {
  const height = (width * 270) / 170; // viewBox 150 10 170 270
  const sel = CITIES[selected];

  const pulse = useRef(new Animated.Value(0)).current;
  const arc = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pulseKey === 0) return;
    pulse.setValue(0);
    arc.setValue(0);
    Animated.parallel([
      // pulse 1.6s × 2
      Animated.loop(
        Animated.timing(pulse, { toValue: 1, duration: 1600, useNativeDriver: false }),
        { iterations: 2 }
      ),
      // arc-fade 2.8s forwards
      Animated.timing(arc, { toValue: 1, duration: 2800, useNativeDriver: false }),
    ]).start();
  }, [pulseKey, pulse, arc]);

  const pulseR = pulse.interpolate({ inputRange: [0, 1], outputRange: [13 * 0.4, 13 * 2.8] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });
  const arcOpacity = arc.interpolate({
    inputRange: [0, 0.15, 0.7, 1],
    outputRange: [0, 0.85, 0.6, 0],
  });
  const arcDash = arc.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });

  // 导入反馈固定在杭州（mock 写死 CITIES.hangzhou）
  const hz = CITIES.hangzhou;
  const sh = CITIES.shanghai;

  return (
    <Svg width={width} height={height} viewBox="150 10 170 270">
      <Path d={MAINLAND_D} fill={colors.land} stroke={colors.landLine}
        strokeWidth={1} strokeLinejoin="round" />
      <Ellipse cx={218} cy={262} rx={6.5} ry={5} fill={colors.land}
        stroke={colors.landLine} strokeWidth={0.8} />
      <Ellipse cx={292} cy={196} rx={2.8} ry={6} fill={colors.land}
        stroke={colors.landLine} strokeWidth={0.8} transform="rotate(-18 292 196)" />

      {/* 未到访城市 */}
      <G fill={colors.dotOff} stroke="#fff" strokeWidth={1}>
        {OFF_DOTS.map(([cx, cy], i) => (
          <Circle key={i} cx={cx} cy={cy} r={2.6} />
        ))}
      </G>

      {/* 点亮城市：双层圆 */}
      <G fill={colors.accent} opacity={0.16}>
        {LIT_DOTS.map(([cx, cy], i) => (
          <Circle key={i} cx={cx} cy={cy} r={9} />
        ))}
      </G>
      <G fill={colors.accent} stroke="#fff" strokeWidth={1.3}>
        {LIT_DOTS.map(([cx, cy], i) => (
          <Circle key={i} cx={cx} cy={cy} r={3.4} />
        ))}
      </G>

      {/* 选中城市：光晕 + 加大点 */}
      <Circle cx={sel.x} cy={sel.y} r={13} fill={colors.accent} opacity={0.22} />
      <Circle cx={sel.x} cy={sel.y} r={4} fill={colors.accent} stroke="#fff" strokeWidth={1.4} />

      {/* 导入反馈：脉动环 + 区间线 */}
      <AnimatedCircle cx={hz.x} cy={hz.y} r={pulseR} fill={colors.accent}
        opacity={pulseOpacity} />
      <AnimatedLine x1={sh.x} y1={sh.y} x2={hz.x} y2={hz.y}
        stroke={colors.accent} strokeWidth={1.4} strokeLinecap="round"
        strokeDasharray="4 4" strokeDashoffset={arcDash} opacity={arcOpacity} />

      {/* 可点热区：杭州 / 上海 / 北京 */}
      <Circle cx={hz.x} cy={hz.y} r={11} fill="transparent"
        onPress={() => onCityPress('hangzhou')} />
      <Circle cx={sh.x} cy={sh.y} r={10} fill="transparent"
        onPress={() => onCityPress('shanghai')} />
      <Circle cx={CITIES.beijing.x} cy={CITIES.beijing.y} r={10} fill="transparent"
        onPress={() => onCityPress('beijing')} />
    </Svg>
  );
}
