import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import Button from '../ui/components/Button';
import { useAppStyles } from '../ui/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanResults'>;

export default function ScanResultsScreen({ route, navigation }: Props) {
  const name = route.params?.name ?? 'Unknown Medicine';
  const confidence = route.params?.confidence ?? 75;
  const { palette } = useAppStyles();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <View style={[s.card, { backgroundColor: palette.surface }]}> 
        <Text style={{ fontSize: 12, color: palette.mutedText }}>Detected Medicine</Text>
        <Text style={{ marginTop: 4, fontSize: 22, fontWeight: '700', color: palette.text }}>{name}</Text>
        <Text style={{ marginTop: 8, color: palette.mutedText }}>Confidence: {confidence}%</Text>
      </View>

      <View style={{ height: 12 }} />
      <Button title="Find Alternatives" onPress={() => navigation.navigate('Alternatives', { name })} />
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 24 },
});
