// inline SVG 图标：路径与 viewBox 照抄 mock。
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color: string;
  strokeWidth?: number;
}

export function SearchIcon({ size = 17, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <Circle cx={7.2} cy={7.2} r={5.2} />
      <Path d="M11.2 11.2 15 15" />
    </Svg>
  );
}

export function CloseIcon({ size = 10, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <Path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
    </Svg>
  );
}

// 城市卡 / 全部行程 / 谱系链接右侧的小箭头 6x10
export function ChevronSmall({ size = 6, color }: IconProps) {
  return (
    <Svg width={size} height={(size * 10) / 6} viewBox="0 0 6 10" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 1l4 4-4 4" />
    </Svg>
  );
}

// sheet 页头返回箭头 8x12
export function BackIcon({ size = 8, color }: IconProps) {
  return (
    <Svg width={size} height={(size * 12) / 8} viewBox="0 0 8 12" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6.5 1.5l-5 4.5 5 4.5" />
    </Svg>
  );
}

// 行程行右侧 chevron 7x12
export function ChevronRow({ size = 7, color }: IconProps) {
  return (
    <Svg width={size} height={(size * 12) / 7} viewBox="0 0 7 12" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1.5 1.5l4 4.5-4 4.5" />
    </Svg>
  );
}

// 车型 chip 的下拉 chevron 7x5
export function ChevronDown({ size = 7, color }: IconProps) {
  return (
    <Svg width={size} height={(size * 5) / 7} viewBox="0 0 7 5" fill="none"
      stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 1.2l2.5 2.6L6 1.2" />
    </Svg>
  );
}

// 区间洞察 / 导入结果：双向箭头 14x14
export function SwapIcon({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1.5 4.5h8.5M8 2l2.5 2.5L8 7M12.5 9.5H4M6 7l-2.5 2.5L6 12" />
    </Svg>
  );
}

// 时钟 14x14
export function ClockIcon({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth={1.4} strokeLinecap="round">
      <Circle cx={7} cy={7} r={5.4} />
      <Path d="M7 4.4V7l1.8 1.1" />
    </Svg>
  );
}

// 地图针/轨迹 14x14
export function TrackIcon({ size = 14, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 10.5 12 3.5M4.5 12l7-5.5" />
    </Svg>
  );
}

// 导出车票 16x16
export function TicketIcon({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 5.2A1.2 1.2 0 0 1 3.2 4h9.6A1.2 1.2 0 0 1 14 5.2v1.6a1.6 1.6 0 0 0 0 2.4v1.6a1.2 1.2 0 0 1-1.2 1.2H3.2A1.2 1.2 0 0 1 2 10.8V9.2a1.6 1.6 0 0 0 0-2.4z" />
      <Path d="M10 4.5v1.2M10 7.4v1.2M10 10.3v1.2" />
    </Svg>
  );
}

// tab：回顾（柱状图）22x22
export function ReviewIcon({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <Path d="M4 17.5v-6" />
      <Path d="M9.33 17.5V5.5" />
      <Path d="M14.67 17.5v-9" />
      <Path d="M18 17.5v-3.5" />
    </Svg>
  );
}

// tab：导入 ⊕ 20x20
export function PlusIcon({ size = 20, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth={2} strokeLinecap="round">
      <Path d="M10 4v12M4 10h12" />
    </Svg>
  );
}

// tab：我的 22x22
export function ProfileIcon({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={11} cy={7.4} r={3.4} />
      <Path d="M4.6 18.4a6.4 6.4 0 0 1 12.8 0" />
    </Svg>
  );
}
