import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { pharmacies } from '../data/dummy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStyles } from '../ui/styles';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';
import Tag from '../ui/components/Tag';

type Props = NativeStackScreenProps<RootStackParamList, 'PriceComparison'>;

export default function PriceComparisonScreen({ route }: Props) {
  const [tab, setTab] = useState<'local' | 'online'>('local');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const name = route.params?.name ?? 'Paracetamol 500mg';
  const { palette } = useAppStyles();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const data = pharmacies
    .filter(p => p.type === tab)
    .sort((a, b) => {
      const pa = parseFloat(a.price.replace(/[^0-9.]/g, ''));
      const pb = parseFloat(b.price.replace(/[^0-9.]/g, ''));
      return sortAsc ? pa - pb : pb - pa;
    });

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 12, color: palette.mutedText }}>Price Comparison for</Text>
        <Text style={{ fontSize: 22, fontWeight: '700', color: palette.text }}>{name}</Text>
      </View>

      <View style={[s.segment, { backgroundColor: palette.muted }] }>
        {(['local', 'online'] as const).map(t => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              android_ripple={{ color: '#e2e8f0' }}
              style={[s.segmentItem, active && { backgroundColor: palette.surface }]}
            >
              <Text style={[s.segmentLabel, { color: active ? palette.text : palette.mutedText }] }>
                {t === 'local' ? 'Local Pharmacies' : 'Online Pharmacies'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={s.actionsRow}>
        <Pressable
          onPress={() => setSortAsc(s => !s)}
          android_ripple={{ color: '#e2e8f0' }}
          style={[s.actionBtn, { backgroundColor: palette.surface }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={sortAsc ? 'sort-ascending' : 'sort-descending'} size={18} color={palette.text} />
            <Text style={{ color: palette.text, marginLeft: 6 }}>Sort: {sortAsc ? 'Low → High' : 'High → Low'}</Text>
          </View>
        </Pressable>
        <Pressable android_ripple={{ color: '#e2e8f0' }} style={[s.actionBtn, { backgroundColor: palette.surface }]}> 
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="filter-variant" size={18} color={palette.text} />
            <Text style={{ color: palette.text, marginLeft: 6 }}>Filter</Text>
          </View>
        </Pressable>
      </View>

      {loading ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Skeleton width="100%" height={72} rounded={16} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={72} rounded={16} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={72} rounded={16} style={{ marginBottom: 12 }} />
        </View>
      ) : data.length === 0 ? (
        <EmptyState
          icon="magnify"
          title="No results"
          description="Try adjusting filters or check back later."
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={i => i.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={[s.cardRow, { backgroundColor: palette.surface }]}> 
              <View style={s.cardLeft}> 
                <View style={[s.avatar, { backgroundColor: palette.muted }]}> 
                  <Icon name="hospital-building" size={22} color={palette.primary} />
                </View>
                <View>
                  <Text style={{ color: palette.text, fontWeight: '600' }}>{item.name}</Text>
                  <Tag label={item.inStock ? 'In Stock' : 'Out of Stock'} tone={item.inStock ? 'success' : 'danger'} style={{ marginTop: 4 }} />
                </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: palette.text }}>{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  segment: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
  },
  segmentLabel: { fontWeight: '500' },
  actionsRow: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  actionBtn: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardRow: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
