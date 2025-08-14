import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppStyles } from '../styles';

type Props = {
  title: string;
  subtitle?: string;
  style?: ViewStyle | ViewStyle[];
};

export default function SectionHeader({ title, subtitle, style }: Props) {
  const { palette } = useAppStyles();
  return (
    <View style={[s.wrap, style]}> 
      <Text style={[s.title, { color: palette.text }]}>{title}</Text>
      {subtitle ? <Text style={[s.sub, { color: palette.mutedText }]}>{subtitle}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { marginTop: 4, fontSize: 13 },
});
