import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { alternatives } from '../data/dummy';
import { useAppStyles } from '../ui/styles';
import { useFeedback } from '../ui/feedback/useFeedback';

 type Props = NativeStackScreenProps<RootStackParamList, 'Alternatives'>;

export default function AlternativesScreen({ route, navigation }: Props) {
  const { common, styles, palette } = useAppStyles();
  const { toast } = useFeedback();
  const targetName = route.params?.name ?? 'Paracetamol 500mg';

  const sections = [
    { title: 'Generic Alternatives', key: 'generic' as const },
    { title: 'Other Brands', key: 'brand' as const },
    { title: 'Premium Alternatives', key: 'premium' as const },
  ];

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: palette.background }}
      ListHeaderComponent={
        <View style={{ padding: 16 }}>
          <Text style={[s.headerLabel, { color: palette.mutedText }]}>Medicine</Text>
          <Text style={s.headerTitle}>{targetName}</Text>
          <Text style={[s.headerSub, { color: palette.mutedText }]}>Active Ingredient: Paracetamol</Text>
        </View>
      }
      data={sections}
      keyExtractor={s => s.key}
      renderItem={({ item: section }) => (
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[s.sectionTitle, { color: palette.text }]}>{section.title}</Text>
          {alternatives
            .filter(a => a.type === section.key)
            .map(a => (
              <View key={a.id} style={[common.card, { backgroundColor: palette.surface, marginBottom: 8 }]}>
                <Text style={{ color: palette.text, fontWeight: '600' }}>{a.name}</Text>
                <Text style={{ color: palette.mutedText }}>{a.manufacturer}</Text>
                <View style={[common.row, common.between, { marginTop: 8 }] }>
                  <Text style={{ color: palette.primary }}>{a.price}</Text>
                  <Pressable
                    onPress={() => { toast('Opening price comparison'); navigation.navigate('PriceComparison', { name: a.name }); }}
                    android_ripple={{ color: '#e2e8f0' }}
                    style={[s.cta, { backgroundColor: palette.primary }]}
                  >
                    <Text style={s.ctaLabel}>View Price Comparison</Text>
                  </Pressable>
                </View>
              </View>
            ))}
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  headerLabel: { fontSize: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSub: { marginTop: 4 },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontSize: 16, fontWeight: '600' },
  cta: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  ctaLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
