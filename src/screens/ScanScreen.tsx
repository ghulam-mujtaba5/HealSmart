import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { detectedSample } from '../data/dummy';
import { useAppStyles } from '../ui/styles';
import Button from '../ui/components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

export default function ScanScreen({ navigation }: Props) {
  const { palette } = useAppStyles();
  const capture = () => {
    // Dummy capture -> navigate with sample result
    navigation.navigate('ScanResults', detectedSample);
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
      {/* Placeholder camera view */}
      <View style={[s.camera, { backgroundColor: palette.muted }]}>
        <Icon name="camera" size={72} color={palette.mutedText} />
        <Text style={{ marginTop: 8, color: palette.mutedText }}>Camera preview placeholder</Text>
      </View>

      <View style={s.row}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <Button title="Upload from Gallery" variant="ghost" />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Button title="Capture" onPress={capture} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  camera: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
