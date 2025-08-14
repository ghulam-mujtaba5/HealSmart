import React from 'react';
import { Image, ImageProps, ImageStyle, StyleProp, useWindowDimensions } from 'react-native';

// A simple responsive Image that scales width to screen with optional maxWidth and aspectRatio
// Usage: <ResponsiveImage source={...} aspectRatio={16/9} maxWidth={420} style={{ borderRadius: 16 }} />

type Props = Omit<ImageProps, 'style'> & {
  aspectRatio: number; // width / height
  maxWidth?: number;
  style?: StyleProp<ImageStyle>;
};

export default function ResponsiveImage({ aspectRatio, maxWidth, style, ...rest }: Props) {
  const { width } = useWindowDimensions();
  const targetWidth = Math.min(width - 32, maxWidth ?? width - 32); // leave some padding by default
  const targetHeight = targetWidth / aspectRatio;

  return <Image {...rest} style={[{ width: targetWidth, height: targetHeight }, style]} />;
}
