/**
 * HealSmart App
 * Front-end UI with navigation and NativeWind styling
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationRoot from './src/navigation';
import { ThemeProvider } from './src/ui/styles/ThemeContext';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  React.useEffect(() => {
    // Ensure icon font is loaded (helps on Android and some setups)
    // No-op if already loaded.
    // @ts-ignore
    MCIcons.loadFont && MCIcons.loadFont();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <NavigationRoot />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
