import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useAppStyles } from '../ui/styles';

export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: SplashProps) {
  const { palette } = useAppStyles();
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={[s.container, { backgroundColor: palette.background }] }>
      <View style={s.center}>
        <Icon name="pill" size={72} color={palette.primary ?? '#16a34a'} />
        <Text style={[s.title, { color: palette.text }]}>HealSmart</Text>
        <Text style={[s.subtitle, { color: palette.mutedText }]}>Smart Medicine Finder</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center' },
  title: { marginTop: 16, fontSize: 28, fontWeight: '700' },
  subtitle: { marginTop: 8, fontSize: 14 },
});
