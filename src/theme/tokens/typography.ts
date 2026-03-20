import type { TextStyle } from 'react-native';

export const fontSize = {
  micro: 8,
  tiny: 9,
  xs: 10,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  '2xl': 17,
  '3xl': 18,
  '4xl': 22,
  '5xl': 24,
  hero: 32,
} as const;

export const fontWeight = {
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, TextStyle['fontWeight']>;

export const lineHeight = {
  tight: 16,
  body: 21,
  relaxed: 22,
} as const;

export const letterSpacing = {
  title: -0.4,
  headline: -0.3,
  label: 0.5,
  section: 0.6,
  display: 1,
} as const;
