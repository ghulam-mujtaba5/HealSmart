// Ambient module declarations to satisfy IDE until packages/types are fully resolved
// These are safe shims and will be superseded by real package typings at build time.

declare module 'react-native-gesture-handler' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';
  export const GestureHandlerRootView: ComponentType<ViewProps>;
}

declare module '@react-navigation/native-stack' {
  export type NativeStackScreenProps<ParamList, RouteName extends keyof ParamList = keyof ParamList> = any;
  export type NativeStackNavigationProp<ParamList, RouteName extends keyof ParamList = keyof ParamList> = any;
  export function createNativeStackNavigator<T>(): any;
}

declare module '@react-navigation/native' {
  export function useNavigation<T = any>(): T;
  export const NavigationContainer: any;
  export const DefaultTheme: any;
  export type Theme = any;
}

declare module '@react-navigation/bottom-tabs' {
  export function createBottomTabNavigator(): any;
}
declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { ComponentType } from 'react';
  import { TextStyle, StyleProp } from 'react-native';
  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
  }
  const Icon: ComponentType<IconProps>;
  export default Icon;
}
