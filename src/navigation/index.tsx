import React from 'react';
import { Pressable, View, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStyles } from '../ui/styles';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ScanResultsScreen from '../screens/ScanResultsScreen';
import AlternativesScreen from '../screens/AlternativesScreen';
import PriceComparisonScreen from '../screens/PriceComparisonScreen';
import MedicineDetailScreen from '../screens/MedicineDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedMedicinesScreen from '../screens/SavedMedicinesScreen';
import UploadPrescriptionScreen from '../screens/UploadPrescriptionScreen';
import RemindersScreen from '../screens/RemindersScreen';
import InventoryScreen from '../screens/InventoryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Scan: undefined;
  ScanResults: { name: string; confidence: number } | undefined;
  Alternatives: { name: string } | undefined;
  PriceComparison: { name: string } | undefined;
  MedicineDetail: { name: string } | undefined;
  UploadPrescription: undefined;
  Reminders: undefined;
  Inventory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function ThemedContainer({ children }: { children: React.ReactNode }) {
  const { palette } = useAppStyles();
  const base = DefaultTheme;
  const theme: any = {
    ...base,
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
    },
    colors: {
      ...base.colors,
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: '#e2e8f0',
      notification: '#2563eb',
    },
  };
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
}

function MainTabs() {
  const { palette } = useAppStyles();
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          const map: Record<string, string> = {
            Home: 'home-heart',
            Saved: 'bookmark-multiple',
            Profile: 'account-circle',
          };
          const name = map[route.name] || 'circle';
          return <Icon name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedMedicinesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function NavigationRoot() {
  const { palette } = useAppStyles();
  return (
    <ThemedContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: palette.surface },
          headerTintColor: palette.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: palette.background },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan Medicine' }} />
        <Stack.Screen
          name="ScanResults"
          component={ScanResultsScreen}
          options={{ title: 'Scan Results' }}
        />
        <Stack.Screen
          name="Alternatives"
          component={AlternativesScreen}
          options={() => {
            const { palette } = useAppStyles();
            return {
              title: 'Alternatives',
              headerRight: () => (
                <Pressable
                  android_ripple={{ color: '#e2e8f0' }}
                  onPress={() => Alert.alert('Filter', 'Filter options coming soon')}
                  style={{ paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8 }}
                >
                  <Icon name="filter-variant" size={22} color={palette.text} />
                </Pressable>
              ),
            };
          }}
        />
        <Stack.Screen
          name="PriceComparison"
          component={PriceComparisonScreen}
          options={() => {
            const { palette } = useAppStyles();
            return {
              title: 'Price Comparison',
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    android_ripple={{ color: '#e2e8f0' }}
                    onPress={() => Alert.alert('Filter', 'Filter options coming soon')}
                    style={{ paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8, marginRight: 6 }}
                  >
                    <Icon name="filter-variant" size={22} color={palette.text} />
                  </Pressable>
                  <Pressable
                    android_ripple={{ color: '#e2e8f0' }}
                    onPress={() => Alert.alert('Sort', 'Sorting options coming soon')}
                    style={{ paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8 }}
                  >
                    <Icon name="sort" size={22} color={palette.text} />
                  </Pressable>
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="MedicineDetail"
          component={MedicineDetailScreen}
          options={() => {
            const { palette } = useAppStyles();
            return {
              title: 'Medicine Details',
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    android_ripple={{ color: '#e2e8f0' }}
                    onPress={() => Alert.alert('Saved', 'Added to bookmarks')}
                    style={{ paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8, marginRight: 6 }}
                  >
                    <Icon name="bookmark-plus" size={22} color={palette.text} />
                  </Pressable>
                  <Pressable
                    android_ripple={{ color: '#e2e8f0' }}
                    onPress={() => Alert.alert('Share', 'Share options coming soon')}
                    style={{ paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8 }}
                  >
                    <Icon name="share-variant" size={22} color={palette.text} />
                  </Pressable>
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="UploadPrescription"
          component={UploadPrescriptionScreen}
          options={{ title: 'Upload Prescription' }}
        />
        <Stack.Screen
          name="Reminders"
          component={RemindersScreen}
          options={{ title: 'Reminders' }}
        />
        <Stack.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{ title: 'Inventory' }}
        />
      </Stack.Navigator>
    </ThemedContainer>
  );
}
