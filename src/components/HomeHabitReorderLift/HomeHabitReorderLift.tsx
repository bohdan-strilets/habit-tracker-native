import {
  ELEVATION_LIFTED,
  IOS_REORDER_SPRING,
  SCALE_LIFTED,
  SHADOW_OFFSET_Y,
  SHADOW_RADIUS,
  TRANSLATE_Y_LIFT,
} from '@constants/homeHabitReorderLift';
import { radii, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useOnCellActiveAnimation } from 'react-native-draggable-flatlist';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { HomeHabitReorderLiftProps } from './HomeHabitReorderLift.types';

export function HomeHabitReorderLift({ children }: HomeHabitReorderLiftProps) {
  const { scheme, theme } = useAppTheme();
  const { onActiveAnim } = useOnCellActiveAnimation({
    animationConfig: IOS_REORDER_SPRING,
  });

  const shadowOpacityMax = scheme === 'dark' ? 0.42 : 0.2;
  const shadowColor = theme.colors.shadow;

  const shellStyle = useMemo(
    () => ({
      borderRadius: radii.md,
      backgroundColor: theme.colors.background.transparent,
    }),
    [theme.colors.background.transparent],
  );

  const liftStyle = useAnimatedStyle(() => {
    const t = onActiveAnim.value;
    const u = interpolate(t, [0, 1], [0, 1], Extrapolation.CLAMP);
    const liftCurve = 1 - (1 - u) ** 2.2;
    const scale = interpolate(liftCurve, [0, 1], [1, SCALE_LIFTED]);
    const y = interpolate(liftCurve, [0, 1], [0, TRANSLATE_Y_LIFT]);
    const shadowOp = interpolate(liftCurve, [0, 1], [0, shadowOpacityMax]);
    const radius = interpolate(liftCurve, [0, 1], [0, SHADOW_RADIUS]);
    const offY = interpolate(liftCurve, [0, 1], [0, SHADOW_OFFSET_Y]);
    const elev = interpolate(liftCurve, [0, 1], [0, ELEVATION_LIFTED]);
    const z = Math.round(interpolate(t, [0, 0.12, 1], [0, 0, 48]));

    return {
      transform: [{ translateY: y }, { scale }],
      shadowColor,
      shadowOffset: { width: 0, height: offY },
      shadowOpacity: shadowOp,
      shadowRadius: radius,
      elevation: Math.max(0, Math.round(elev)),
      zIndex: z,
    };
  }, [onActiveAnim, shadowColor, shadowOpacityMax]);

  return (
    <Animated.View style={[shellStyle, liftStyle, styles.clipShadow]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  clipShadow: {
    overflow: 'visible',
  },
});
