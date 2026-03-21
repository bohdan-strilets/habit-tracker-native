import { colorsDark } from '@theme/palettes/dark';
import { gradientsDark, gradientsLight } from '@theme/palettes/gradients';
import { colorsLight } from '@theme/palettes/light';
import type {
  AppTheme,
  ColorPalette,
  ColorScheme,
  ThemeGradients,
} from '@theme/types';

import { createShadows, createShadowsLight } from './createShadows';

function asPalette(dark: typeof colorsDark): ColorPalette {
  return dark as unknown as ColorPalette;
}

export function buildTheme(scheme: ColorScheme): AppTheme {
  if (scheme === 'dark') {
    return {
      colors: asPalette(colorsDark),
      gradients: gradientsDark as unknown as ThemeGradients,
      shadows: createShadows(colorsDark.shadow),
    };
  }

  return {
    colors: colorsLight,
    gradients: gradientsLight,
    shadows: createShadowsLight(colorsLight.shadow),
  };
}
