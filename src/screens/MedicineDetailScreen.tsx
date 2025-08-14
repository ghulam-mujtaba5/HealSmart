import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { medicineDetails } from '../data/dummy';
import Button from '../ui/components/Button';
import { useAppStyles } from '../ui/styles';

 type Props = NativeStackScreenProps<RootStackParamList, 'MedicineDetail'>;

export default function MedicineDetailScreen({ route, navigation }: Props) {
  const name = route.params?.name ?? medicineDetails.name;
  const { palette } = useAppStyles();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <View style={[s.card, { backgroundColor: palette.surface }]}> 
        <Text style={[s.title, { color: palette.text }]}>{name}</Text>
        <Text style={{ marginTop: 4, color: palette.mutedText }}>{medicineDetails.manufacturer}</Text>

        <Text style={[s.sectionLabel, { color: palette.text }]}>Active Ingredient(s)</Text>
        {medicineDetails.activeIngredients.map((ai, i) => (
          <Text key={i} style={{ color: palette.mutedText }}>• {ai}</Text>
        ))}

        <Text style={[s.sectionLabel, { color: palette.text }]}>Price Range: 
          <Text style={{ color: palette.text, fontWeight: '600' }}> {medicineDetails.priceRange}</Text>
        </Text>
      </View>

      <View style={{ height: 12 }} />
      <Button title="Find Alternatives" onPress={() => navigation.navigate('Alternatives', { name })} />
      <View style={{ height: 8 }} />
      <Button title="Compare Prices" variant="secondary" onPress={() => navigation.navigate('PriceComparison', { name })} />
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 24 },
  title: { fontSize: 22, fontWeight: '700' },
  sectionLabel: { marginTop: 12, fontWeight: '600' },
});
