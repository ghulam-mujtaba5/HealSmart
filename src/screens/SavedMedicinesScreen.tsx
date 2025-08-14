import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useAppStyles } from '../ui/styles';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';
import Tag from '../ui/components/Tag';

const saved = [
  { id: 's1', name: 'Paracetamol 500mg', note: 'For headaches', time: '2 days ago' },
  { id: 's2', name: 'Ibuprofen 200mg', note: 'Post workout', time: '1 week ago' },
  { id: 's3', name: 'Cetirizine 10mg', note: 'Allergy season', time: '3 weeks ago' },
];

export default function SavedMedicinesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { palette } = useAppStyles();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FlatList
        data={loading ? [] : saved}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 8, paddingHorizontal: 4 }}>
            <Text style={[s.title, { color: palette.text }]}>Saved Medicines</Text>
            <Text style={[s.subtitle, { color: palette.mutedText }]}>Quick access to your bookmarked items</Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View>
              <Skeleton width="100%" height={80} rounded={16} style={{ marginBottom: 12 }} />
              <Skeleton width="100%" height={80} rounded={16} style={{ marginBottom: 12 }} />
              <Skeleton width="100%" height={80} rounded={16} style={{ marginBottom: 12 }} />
            </View>
          ) : (
            <EmptyState
              icon="bookmark"
              title="No saved medicines"
              description="Tap the bookmark icon on a medicine to save it for quick access."
            />
          )
        }
        renderItem={({ item, index }) => (
          <Pressable
            android_ripple={{ color: '#e2e8f0' }}
            style={[s.row, { backgroundColor: palette.surface }]}
            onPress={() => navigation.navigate('MedicineDetail', { name: item.name })}
          >
            <View style={s.rowLeft}>
              <View style={[s.pillIconWrap, { backgroundColor: palette.muted }]}>
                <Icon name="pill" size={22} color={palette.primary} />
              </View>
              <View>
                <Text style={[s.rowTitle, { color: palette.text }]}>{item.name}</Text>
                <Text style={[s.rowSub, { color: palette.mutedText }]}>{item.note} • {item.time}</Text>
                {index % 2 === 0 ? (
                  <Tag label="Reminder Set" tone="info" style={{ marginTop: 6, alignSelf: 'flex-start' }} />
                ) : (
                  <Tag label="Generic" tone="success" style={{ marginTop: 6, alignSelf: 'flex-start' }} />
                )}
              </View>
            </View>
            <View style={[s.openBtn, { backgroundColor: palette.primary }]}> 
              <Text style={s.openBtnLabel}>Open</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '600', color: '#0f172a' },
  subtitle: { marginTop: 4, fontSize: 14 },
  emptyIconWrap: {
    height: 48,
    width: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  row: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  pillIconWrap: {
    height: 40,
    width: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSub: { fontSize: 12, color: '#64748b' },
  openBtn: { backgroundColor: '#2563eb', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  openBtnLabel: { color: '#fff', fontWeight: '600' },
});
