import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStyles } from '../ui/styles';
import Button from '../ui/components/Button';
import Skeleton from '../ui/components/Skeleton';

export default function UploadPrescriptionScreen() {
  const { palette, common } = useAppStyles();
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<string[]>([]);

  const simulatePick = () => {
    setLoading(true);
    setItems([]);
    // Simulate image selection and OCR
    setTimeout(() => {
      setItems(['Paracetamol 500mg', 'Ibuprofen 200mg']);
      setLoading(false);
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      <View style={[s.drop, { backgroundColor: palette.muted }]}>
        <Icon name="file-image" size={48} color={palette.mutedText} />
        <Text style={{ marginTop: 8, color: palette.mutedText }}>Upload a prescription image</Text>
        <View style={{ height: 12 }} />
        <Button title="Select from Gallery" onPress={simulatePick} />
      </View>

      <Text style={[s.sectionTitle, { color: palette.text }]}>Detected Medicines</Text>

      {loading ? (
        <View>
          <Skeleton width="100%" height={56} rounded={14} style={{ marginBottom: 10 }} />
          <Skeleton width="100%" height={56} rounded={14} style={{ marginBottom: 10 }} />
        </View>
      ) : items.length === 0 ? (
        <View style={[common.card, { backgroundColor: palette.surface }]}>
          <Text style={{ color: palette.mutedText }}>No items yet. Upload a photo to detect medicines.</Text>
        </View>
      ) : (
        <View>
          {items.map((n, i) => (
            <View key={i} style={[s.row, { backgroundColor: palette.surface }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[s.pillIconWrap, { backgroundColor: palette.muted }]}>
                  <Icon name="pill" size={20} color={palette.primary} />
                </View>
                <Text style={{ color: palette.text, fontWeight: '600' }}>{n}</Text>
              </View>
              <Pressable
                android_ripple={{ color: '#e2e8f0' }}
                style={[s.addBtn, { backgroundColor: palette.primary }]}
                onPress={() => {}}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  drop: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  pillIconWrap: {
    height: 36,
    width: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addBtn: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
});
