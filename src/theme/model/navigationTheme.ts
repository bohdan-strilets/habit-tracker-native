import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import type { AppTheme, ColorScheme } from '@theme/types';

export function buildNavigationTheme(
  scheme: ColorScheme,
  t: AppTheme,
): NavigationTheme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: t.colors.primary.main,
      background: t.colors.background.screen,
      card: t.colors.background.surface,
      text: t.colors.text.primary,
      border: t.colors.border.default,
      notification: t.colors.primary.main,
    },
  };
}

export { DarkTheme, DefaultTheme };
