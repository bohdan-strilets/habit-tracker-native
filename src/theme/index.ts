export { buildTheme } from './model/buildTheme';
export { createShadows, createShadowsLight } from './model/createShadows';
export {
  buildNavigationTheme,
  DarkTheme,
  DefaultTheme,
} from './model/navigationTheme';
export {
  getTabBarContainerStyle,
  tabBarIconStyle,
  tabBarItemStyle,
} from './model/tabBarStyles';

export { colorsLight } from './palettes/light';
export { colorsDark } from './palettes/dark';
export { gradientsLight, gradientsDark } from './palettes/gradients';

export {
  fontSize,
  fontWeight,
  layout,
  letterSpacing,
  lineHeight,
  radii,
  space,
} from './tokens';

export { THEME_STORAGE_KEY } from '../constants/storageKeys';

export type {
  AppTheme,
  ColorPalette,
  ColorScheme,
  ThemeGradients,
  ThemeShadows,
} from './types';

export { ThemeProvider } from './context/ThemeProvider';
export { useAppTheme } from './context/useAppTheme';
