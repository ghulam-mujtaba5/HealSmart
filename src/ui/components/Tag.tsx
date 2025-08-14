import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { useAppStyles } from '../../ui/styles';

export type TagProps = {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  style?: ViewStyle;
};

export default function Tag({ label, tone = 'neutral', style }: TagProps) {
  const { palette } = useAppStyles();
  const tones = {
    neutral: { bg: palette.muted, fg: palette.text },
    success: { bg: '#dcfce7', fg: '#166534' },
    warning: { bg: '#fef3c7', fg: '#92400e' },
    danger: { bg: '#fee2e2', fg: '#991b1b' },
    info: { bg: '#dbeafe', fg: '#1e40af' },
  } as const;
  const t = tones[tone] ?? tones.neutral;
  return (
    <View style={[s.wrap, { backgroundColor: t.bg }, style]}>
      <Text style={[s.text, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '600' },
});
