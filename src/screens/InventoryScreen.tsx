import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStyles } from '../ui/styles';
import Tag from '../ui/components/Tag';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';

export default function InventoryScreen() {
  const { palette } = useAppStyles();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState(
    [] as { id: string; name: string; stock: number }[]
  );

  React.useEffect(() => {
    const t = setTimeout(() => {
      setItems([
        { id: '1', name: 'Paracetamol 500mg', stock: 6 },
        { id: '2', name: 'Amoxicillin 250mg', stock: 1 },
        { id: '3', name: 'Cetirizine 10mg', stock: 0 },
      ]);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const toneFor = (stock: number) => (stock === 0 ? 'danger' : stock <= 2 ? 'warning' : 'success');
  const labelFor = (stock: number) => (stock === 0 ? 'Out' : stock <= 2 ? 'Low' : 'OK');

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: palette.text, marginBottom: 12 }}>Inventory</Text>

      {loading ? (
        <View>
          <Skeleton width="100%" height={64} rounded={14} style={{ marginBottom: 10 }} />
          <Skeleton width="100%" height={64} rounded={14} style={{ marginBottom: 10 }} />
          <Skeleton width="100%" height={64} rounded={14} style={{ marginBottom: 10 }} />
        </View>
      ) : items.length === 0 ? (
        <EmptyState icon="pill" title="No medicines added" description="Your inventory is empty. Save medicines to track stock." />
      ) : (
        <View>
          {items.map(item => (
            <View key={item.id} style={[s.row, { backgroundColor: palette.surface }]}>
              <Text style={{ color: palette.text, fontWeight: '600' }}>{item.name}</Text>
              <Tag label={`${labelFor(item.stock)} (${item.stock})`} tone={toneFor(item.stock) as any} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
