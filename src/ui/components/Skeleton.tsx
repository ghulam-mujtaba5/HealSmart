import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useAppStyles } from '../../ui/styles';

export type SkeletonProps = {
  height?: number;
  width?: DimensionValue;
  style?: ViewStyle;
  rounded?: number;
};

export default function Skeleton({ height = 12, width = '100%', rounded = 8, style }: SkeletonProps) {
  const { palette } = useAppStyles();
  return (
    <View
      style={[
        s.base,
        { height, width, borderRadius: rounded, backgroundColor: palette.muted },
        style,
      ]}
    />
  );
}

const s = StyleSheet.create({
  base: { overflow: 'hidden' },
});
