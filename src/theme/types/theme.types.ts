import type { ViewStyle } from 'react-native';
import type { colorsLight } from '../palettes/light';
import type { gradientsLight } from '../palettes/gradients';

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
