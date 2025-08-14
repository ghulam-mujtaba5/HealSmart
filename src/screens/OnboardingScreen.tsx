import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootStackParamList } from '../navigation';
import { useAppStyles } from '../ui/styles';
import Button from '../ui/components/Button';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  { key: '1', title: 'Snap a picture of your medicine', desc: 'Quickly capture and identify your medicines with AI.', icon: 'camera' },
  { key: '2', title: 'Find cheaper and better alternatives', desc: 'Explore generic and premium options tailored to you.', icon: 'sync' },
  { key: '3', title: 'Compare prices across pharmacies', desc: 'Save money by checking prices at local and online stores.', icon: 'cash-multiple' },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const { palette } = useAppStyles();

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(prev => prev + 1);
      ref.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.replace('MainTabs');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FlatList
        ref={ref}
        data={slides}
        keyExtractor={i => i.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View style={[s.slide, { width }]}>
            <View style={[s.illustration, { backgroundColor: palette.muted }]}>
              <Icon name={item.icon} size={72} color="#2563eb" />
            </View>
            <Text style={[s.title, { color: palette.text }]}>{item.title}</Text>
            <Text style={[s.desc, { color: palette.mutedText }]}>{item.desc}</Text>
          </View>
        )}
      />

      <View style={s.footer}>
        <View style={s.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                s.dot,
                i === index ? { width: 24, backgroundColor: palette.primary ?? '#16a34a' } : { width: 8, backgroundColor: '#cbd5e1' },
              ]}
            />
          ))}
        </View>
        <Button title={index < slides.length - 1 ? 'Next' : 'Get Started'} onPress={next} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  slide: { padding: 32, alignItems: 'center', justifyContent: 'center' },
  illustration: { height: 160, width: 160, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 24, textAlign: 'center', fontSize: 22, fontWeight: '700' },
  desc: { marginTop: 12, textAlign: 'center', fontSize: 14 },
  footer: { marginBottom: 24, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  dots: { marginBottom: 16, flexDirection: 'row', alignItems: 'center' },
  dot: { height: 8, borderRadius: 999, marginHorizontal: 4 },
});
