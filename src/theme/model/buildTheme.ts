import { colorsDark } from '../palettes/dark';
import { colorsLight } from '../palettes/light';
import { gradientsDark, gradientsLight } from '../palettes/gradients';
import type { AppTheme, ColorPalette, ColorScheme, ThemeGradients } from '../types';
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
