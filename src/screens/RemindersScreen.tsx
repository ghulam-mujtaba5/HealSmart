import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';
import { useAppStyles } from '../ui/styles';
import ListRow from '../ui/components/ListRow';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';

export default function RemindersScreen() {
  const { palette } = useAppStyles();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState(
    [] as { id: string; name: string; time: string; enabled: boolean }[]
  );

  React.useEffect(() => {
    const t = setTimeout(() => {
      setItems([
        { id: '1', name: 'Paracetamol 500mg', time: '09:00 AM', enabled: true },
        { id: '2', name: 'Vitamin D3', time: '08:00 PM', enabled: false },
      ]);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const toggle = (id: string) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, enabled: !it.enabled } : it)));
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: palette.text, marginBottom: 12 }}>Reminders</Text>

      {loading ? (
        <View>
          <Skeleton width="100%" height={64} rounded={14} style={{ marginBottom: 10 }} />
          <Skeleton width="100%" height={64} rounded={14} style={{ marginBottom: 10 }} />
        </View>
      ) : items.length === 0 ? (
        <EmptyState icon="bell" title="No reminders" description="Add a reminder to take your medicines on time." />
      ) : (
        <View>
          {items.map(item => (
            <ListRow
              key={item.id}
              leadingIcon={item.enabled ? 'bell-ring' : 'bell'}
              title={item.name}
              subtitle={`Time: ${item.time}`}
              trailing={<Switch value={item.enabled} onValueChange={() => toggle(item.id)} />}
            />
          ))}
        </View>
      )}

      <Pressable
        android_ripple={{ color: '#e2e8f0' }}
        onPress={() => {
          // Simulate adding a reminder
          const id = String(Date.now());
          setItems(prev => [
            ...prev,
            { id, name: 'Ibuprofen 200mg', time: '01:00 PM', enabled: true },
          ]);
        }}
        style={[s.fab, { backgroundColor: palette.primary }]}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>+ Add Reminder</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  fab: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
