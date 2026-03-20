import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../theme';
import { darkenHex } from '../../utils/darkenHex';
import type { ProgressBarProps } from './ProgressBar.types';
import { createProgressBarStyles } from './ProgressBar.styles';

const PROGRESS_MS = 480;
const easing = Easing.out(Easing.cubic);

export const ProgressBar = ({
  progress,
  accessibilityLabel,
  accentColor,
}: ProgressBarProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createProgressBarStyles(theme), [theme]);
  const clamped = Math.min(1, Math.max(0, progress));

  const [trackWidth, setTrackWidth] = useState(0);
  const trackW = useSharedValue(0);
  const progressSv = useSharedValue(0);

  useEffect(() => {
    progressSv.value = withTiming(clamped, {
      duration: PROGRESS_MS,
      easing,
    });
  }, [clamped, progressSv]);

  const fillStyle = useAnimatedStyle(() => ({
    width: trackW.value * progressSv.value,
  }));

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth(w);
    trackW.value = w;
  };

  const accent = accentColor?.trim();
  const gradientColors = useMemo((): [string, string] => {
    if (accent) {
      return [accent, darkenHex(accent, 0.62)];
    }
    return [theme.colors.primary.main, theme.colors.primary.dark];
  }, [accent, theme.colors.primary.dark, theme.colors.primary.main]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      accessibilityLabel={accessibilityLabel}
      style={styles.track}
      onLayout={onTrackLayout}
    >
      <Animated.View style={[styles.fillClip, fillStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gradient, trackWidth > 0 && { width: trackWidth }]}
        />
      </Animated.View>
    </View>
  );
};
