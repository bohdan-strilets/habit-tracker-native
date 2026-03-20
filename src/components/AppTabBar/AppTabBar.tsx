import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../../theme';
import {
  APP_TAB_BAR_BLUR_INTENSITY,
  appTabBarStyles as styles,
} from './AppTabBar.styles';
import type { AppTabBarProps } from './AppTabBar.types';

export const AppTabBar = (props: AppTabBarProps) => {
  const { scheme, theme } = useAppTheme();
  const blurTint = scheme === 'dark' ? 'dark' : 'light';

  return (
    <View style={styles.shell}>
      {Platform.OS === 'android' ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            scheme === 'dark'
              ? styles.androidFallbackDark
              : styles.androidFallbackLight,
          ]}
        />
      ) : null}
      <BlurView
        intensity={APP_TAB_BAR_BLUR_INTENSITY}
        tint={blurTint}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[styles.hairline, { backgroundColor: theme.colors.tab.hairline }]}
        pointerEvents="none"
      />
      <BottomTabBar {...props} />
    </View>
  );
};
