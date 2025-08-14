import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStyles } from '../../ui/styles';
import Button from './Button';

export type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
  ctaText?: string;
  onPressCta?: () => void;
};

export default function EmptyState({ icon = 'information-outline', title, description, ctaText, onPressCta }: EmptyStateProps) {
  const { palette } = useAppStyles();
  return (
    <View style={s.wrap}>
      <View style={[s.iconWrap, { backgroundColor: palette.muted }]}>
        <Icon name={icon} size={36} color={palette.primary} />
      </View>
      <Text style={[s.title, { color: palette.text }]}>{title}</Text>
      {description ? <Text style={[s.desc, { color: palette.mutedText }]}>{description}</Text> : null}
      {ctaText && onPressCta ? (
        <View style={{ marginTop: 12 }}>
          <Button title={ctaText} onPress={onPressCta} />
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconWrap: { height: 72, width: 72, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 16, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  desc: { marginTop: 8, fontSize: 14, textAlign: 'center' },
});
