import React, { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useAppStyles } from '../styles';

type Props = PropsWithChildren<{
  style?: ViewStyle | ViewStyle[];
}>;

export default function Card({ children, style }: Props) {
  const { palette } = useAppStyles();
  return <View style={[s.card, { backgroundColor: palette.surface }, style]}>{children}</View>;
}

const s = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
});
