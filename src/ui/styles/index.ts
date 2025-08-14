import { useColorScheme } from 'react-native';
import React from 'react';
import { common } from './common';
import { lightStyles, lightColors } from './light';
import { darkStyles, darkColors } from './dark';
import { ThemeContext } from './ThemeContext';

export function useAppStyles() {
  const system = useColorScheme();
  const { override } = React.useContext(ThemeContext);
  const effectiveScheme = override ?? system;
  const isDark = effectiveScheme === 'dark';
  const styles = isDark ? darkStyles : lightStyles;
  const palette = isDark ? darkColors : lightColors;
  return { common, styles, palette, isDark };
}
