import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStyles } from '../../ui/styles';

export type ListRowProps = {
  title: string;
  subtitle?: string;
  leadingIcon?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

export default function ListRow({ title, subtitle, leadingIcon, trailing, onPress, disabled }: ListRowProps) {
  const { palette } = useAppStyles();
  const content = (
    <View style={[s.container, { backgroundColor: palette.surface, opacity: disabled ? 0.6 : 1 }]}> 
      <View style={s.left}>
        {leadingIcon ? (
          <View style={[s.iconWrap, { backgroundColor: palette.muted }]}>
            <Icon name={leadingIcon} size={20} color={palette.primary} />
          </View>
        ) : null}
        <View style={s.texts}>
          <Text style={[s.title, { color: palette.text }]} numberOfLines={1}>{title}</Text>
          {subtitle ? (
            <Text style={[s.subtitle, { color: palette.mutedText }]} numberOfLines={2}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <View style={s.right}>
        {trailing ?? <Icon name="chevron-right" size={22} color="#94a3b8" />}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable android_ripple={{ color: '#e2e8f0' }} onPress={onPress} disabled={disabled} style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
        {content}
      </Pressable>
    );
  }
  return <View style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>{content}</View>;
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 12,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrap: {
    height: 32,
    width: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  texts: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { marginTop: 2, fontSize: 13 },
  right: { marginLeft: 12 },
});
