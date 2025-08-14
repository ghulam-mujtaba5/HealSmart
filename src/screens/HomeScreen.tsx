import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { recentSearches } from '../data/dummy';
import { useAppStyles } from '../ui/styles';
import Tag from '../ui/components/Tag';
import Skeleton from '../ui/components/Skeleton';
import EmptyState from '../ui/components/EmptyState';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { palette } = useAppStyles();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const goSearch = () => {
    if (query.trim()) {
      navigation.navigate('MedicineDetail', { name: query.trim() });
    }
  };

  const Tile = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e2e8f0' }}
      style={({ pressed }) => [
        s.tile,
        { backgroundColor: palette.surface },
        pressed && s.pressed,
      ]}
    >
      <View style={[s.tileIconWrap, { backgroundColor: palette.muted }]}>
        <Icon name={icon} size={28} color={palette.primary} />
      </View>
      <Text style={[s.tileLabel, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={[s.container, { backgroundColor: palette.background }] }>
      <View style={[s.searchBar, { backgroundColor: palette.muted }]}> 
        <Icon name="magnify" size={20} color={palette.mutedText} />
        <TextInput
          style={s.searchInput}
          placeholder="Search medicine name"
          placeholderTextColor={palette.mutedText}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={goSearch}
          returnKeyType="search"
        />
        <Pressable onPress={goSearch} android_ripple={{ color: '#e2e8f0' }}>
          <Text style={[s.searchAction, { color: palette.primary }]}>Search</Text>
        </Pressable>
      </View>

      <View style={s.tileRow}>
        <Tile icon="camera" label="Scan Medicine" onPress={() => navigation.navigate('Scan')} />
        <Tile icon="file-upload" label="Upload Prescription" onPress={() => {}} />
      </View>
      <View style={s.tileRow}>
        <Tile icon="sync" label="Find Alternatives" onPress={() => navigation.navigate('Alternatives')} />
        <Tile icon="cash-multiple" label="Price Comparison" onPress={() => navigation.navigate('PriceComparison')} />
      </View>

      <Text style={[s.sectionTitle, { color: palette.text }]}>Recent Searches</Text>
      {loading ? (
        <View>
          <Skeleton width="100%" height={48} rounded={12} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={48} rounded={12} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={48} rounded={12} style={{ marginBottom: 8 }} />
        </View>
      ) : recentSearches.length === 0 ? (
        <EmptyState
          icon="history"
          title="No recent searches"
          description="Start by searching for a medicine to see details, alternatives and best prices."
        />
      ) : (
        <FlatList
          data={recentSearches}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => navigation.navigate('MedicineDetail', { name: item })}
              android_ripple={{ color: '#e2e8f0' }}
              style={[s.row, { backgroundColor: palette.surface }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pill" size={20} color={palette.primary} />
                <Text style={[s.rowLabel, { color: palette.text }]}>{item}</Text>
                {index % 2 === 0 ? (
                  <Tag label="Popular" tone="info" style={{ marginLeft: 8 }} />
                ) : (
                  <Tag label="Generic" tone="success" style={{ marginLeft: 8 }} />
                )}
              </View>
              <Icon name="chevron-right" size={22} color={palette.mutedText} />
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    color: '#0f172a',
  },
  searchAction: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tileRow: {
    flexDirection: 'row',
    columnGap: 12,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    padding: 24,
    marginVertical: 6,
  },
  tileIconWrap: {
    height: 48,
    width: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tileLabel: {
    color: '#334155',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  rowLabel: {
    color: '#334155',
  },
  pressed: {
    opacity: 0.96,
  },
});
