import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useAppStyles } from '../ui/styles';
import { useFeedback } from '../ui/feedback/useFeedback';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';
import Tag from '../ui/components/Tag';

const initialSaved = [
  { id: 's1', name: 'Paracetamol 500mg', note: 'For headaches', time: '2 days ago' },
  { id: 's2', name: 'Ibuprofen 200mg', note: 'Post workout', time: '1 week ago' },
  { id: 's3', name: 'Cetirizine 10mg', note: 'Allergy season', time: '3 weeks ago' },
];

export default function SavedMedicinesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { palette } = useAppStyles();
  const { toast } = useFeedback();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState(initialSaved);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          android_ripple={{ color: '#e2e8f0' }}
          onPress={() => {
            if (items.length === 0) {
              toast('Nothing to clear');
              return;
            }
            Alert.alert('Clear all saved?', 'This will remove all saved medicines.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear all', style: 'destructive', onPress: () => { setItems([]); toast('Cleared all saved'); } },
            ]);
          }}
          style={{ paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 }}
        >
          <Text style={{ color: palette.primary, fontWeight: '600' }}>Clear</Text>
        </Pressable>
      ),
    });
  }, [navigation, items.length, palette.primary, toast]);

  const removeItem = (id: string) => {
    Alert.alert('Remove bookmark', 'Do you want to remove this medicine?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {
        setItems(prev => prev.filter(i => i.id !== id));
        toast('Removed from saved');
      } },
    ]);
  };

  const shareItem = (name: string) => {
    Alert.alert('Share', `Share ${name} (coming soon)`);
    toast('Share options coming soon');
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FlatList
        data={loading ? [] : items}
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
              <View style={s.rowText}>
                <Text style={[s.rowTitle, { color: palette.text }]} numberOfLines={2}>{item.name}</Text>
                <Text style={[s.rowSub, { color: palette.mutedText }]} numberOfLines={1}>{item.note} • {item.time}</Text>
                {index % 2 === 0 ? (
                  <Tag label="Reminder Set" tone="info" style={{ marginTop: 6, alignSelf: 'flex-start' }} />
                ) : (
                  <Tag label="Generic" tone="success" style={{ marginTop: 6, alignSelf: 'flex-start' }} />
                )}
              </View>
            </View>
            <View style={s.actionsRight}>
              <Pressable
                android_ripple={{ color: '#e2e8f0' }}
                style={s.iconBtn}
                onPress={() => shareItem(item.name)}
              >
                <Icon name="share-variant" size={20} color={palette.mutedText} />
              </Pressable>
              <Pressable
                android_ripple={{ color: '#e2e8f0' }}
                style={s.iconBtn}
                onPress={() => removeItem(item.id)}
              >
                <Icon name="bookmark-remove" size={20} color={palette.mutedText} />
              </Pressable>
              <View style={[s.openBtn, { backgroundColor: palette.primary }]}> 
                <Text style={s.openBtnLabel}>Open</Text>
              </View>
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
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  pillIconWrap: {
    height: 40,
    width: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 16, fontWeight: '600', flexShrink: 1 },
  rowSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  actionsRight: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  iconBtn: { height: 36, width: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  openBtn: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  openBtnLabel: { color: '#fff', fontWeight: '600' },
});
