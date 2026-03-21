import type { gradientsLight } from '@theme/palettes/gradients';
import type { colorsLight } from '@theme/palettes/light';
import type { ViewStyle } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export type ColorPalette = typeof colorsLight;

export type ThemeGradients = typeof gradientsLight;

export type ThemeShadows = {
  elevationStyles: Record<0 | 1 | 2 | 3, ViewStyle>;
  cardShadow: ViewStyle;
  inputShadow: ViewStyle;
};

export type AppTheme = {
  colors: ColorPalette;
  gradients: ThemeGradients;
  shadows: ThemeShadows;
};
