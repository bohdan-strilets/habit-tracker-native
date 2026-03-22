import { Platform, StyleSheet } from 'react-native';

/** Помірний blur: панель виглядає частиною інтерфейсу, а не окремим «склом». */
export const APP_TAB_BAR_BLUR_INTENSITY = Platform.select({
  ios: 78,
  android: 36,
  default: 70,
});

export const appTabBarStyles = StyleSheet.create({
  shell: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    flexGrow: 0,
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
