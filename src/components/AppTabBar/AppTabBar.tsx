import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import {
  BottomTabBar,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { colors } from '../../theme';

const BLUR_INTENSITY = Platform.select({ ios: 88, android: 40, default: 80 });

/**
 * Blur + hairline sit behind BottomTabBar. Safe area bottom is applied only inside
 * BottomTabBar (paddingBottom) — do not add outer paddingBottom here or it doubles.
 */
export const AppTabBar = (props: BottomTabBarProps) => {
  return (
    <View style={styles.shell}>
      {Platform.OS === 'android' ? (
        <View style={[StyleSheet.absoluteFill, styles.androidFallback]} />
      ) : null}
      <BlurView
        intensity={BLUR_INTENSITY}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.hairline} pointerEvents="none" />
      <BottomTabBar {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    position: 'relative',
    overflow: 'hidden',

    backgroundColor: colors.background.transparent,
  },

  androidFallback: {
    backgroundColor: 'rgba(250, 250, 252, 0.97)',
  },

  hairline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.tab.hairline,
    zIndex: 1,
  },
});
