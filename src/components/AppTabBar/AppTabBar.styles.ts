import { Platform, StyleSheet } from 'react-native';

export const APP_TAB_BAR_BLUR_INTENSITY = Platform.select({
  ios: 88,
  android: 40,
  default: 80,
});

export const appTabBarStyles = StyleSheet.create({
  shell: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },

  androidFallbackLight: {
    backgroundColor: 'rgba(250, 250, 252, 0.97)',
  },

  androidFallbackDark: {
    backgroundColor: 'rgba(28, 28, 30, 0.97)',
  },

  hairline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    zIndex: 1,
  },
});
