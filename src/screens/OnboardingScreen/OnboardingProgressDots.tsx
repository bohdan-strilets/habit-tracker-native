import { useAppTheme } from '@theme';
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createOnboardingScreenStyles } from './OnboardingScreen.styles';

const DOT = 8;
const TIMING_MS = 280;

type DotProps = {
  index: number;
  progress: SharedValue<number>;
  inactive: string;
  active: string;
};

const ProgressDot = memo(function ProgressDot({
  index,
  progress,
  inactive,
  active,
}: DotProps) {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [index - 0.45, index, index + 0.45],
      [1, 1.28, 1],
      Extrapolation.CLAMP,
    );
    const backgroundColor = interpolateColor(
      progress.value,
      [index - 0.45, index, index + 0.45],
      [inactive, active, inactive],
    );
    return {
      transform: [{ scale }],
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: DOT,
          height: DOT,
          borderRadius: DOT / 2,
        },
        style,
      ]}
    />
  );
});

type OnboardingProgressDotsProps = {
  step: number;
  total: number;
};

export const OnboardingProgressDots = memo(function OnboardingProgressDots({
  step,
  total,
}: OnboardingProgressDotsProps) {
  const { theme } = useAppTheme();
  const styles = createOnboardingScreenStyles(theme.colors);
  const progress = useSharedValue(step);

  useEffect(() => {
    progress.value = withTiming(step, { duration: TIMING_MS });
  }, [step, progress]);

  const inactive = theme.colors.text.faint;
  const active = theme.colors.primary.main;

  return (
    <View style={styles.dotsRow} accessibilityRole="progressbar">
      {Array.from({ length: total }, (_, i) => (
        <ProgressDot
          key={i}
          index={i}
          progress={progress}
          inactive={inactive}
          active={active}
        />
      ))}
    </View>
  );
});
