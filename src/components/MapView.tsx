// 地图入口：有 MapLibre 原生模块 → 真实地图（RealMap），否则降级为自绘 SVG（ChinaMap）。
// MapLibre RN 是纯 TurboModule（不注册到 globalThis.expo.modules），探测 MLRNMapViewModule；
// require 必须懒加载——静态 import 会让 Expo Go 在加载 bundle 时整包崩溃。
import React from 'react';
import { TurboModuleRegistry } from 'react-native';
import { CityId } from '../data';
import ChinaMap from './ChinaMap';
import type { CardAnchor } from './RealMap';

interface Props {
  width: number;
  height: number; // 仅真实地图使用；ChinaMap 按比例自算高度
  selected: CityId;
  pulseKey: number;
  onCityPress: (id: CityId) => void;
  cardAnchor: CardAnchor; // 仅真实地图使用；ChinaMap 降级时卡片停在初始位置
}

function hasMapLibreNative(): boolean {
  try {
    return !!TurboModuleRegistry.get('MLRNMapViewModule');
  } catch {
    return false;
  }
}

export default function MapView(props: Props) {
  if (hasMapLibreNative()) {
    try {
      const RealMap = require('./RealMap').default as React.ComponentType<Props>;
      return <RealMap {...props} />;
    } catch {
      // 加载失败（Expo Go / 旧架构）→ 落到 SVG 降级
    }
  }
  return (
    <ChinaMap
      width={props.width}
      selected={props.selected}
      pulseKey={props.pulseKey}
      onCityPress={props.onCityPress}
    />
  );
}
