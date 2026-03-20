import { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const ENTRANCE = {
  duration: 520,
  stagger: 88,
  offsetY: 16,
  easing: Easing.out(Easing.cubic),
} as const;

export type FadeSlideInProps = {
  children: ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
  /** When this value changes, the entrance animation runs again. */
  playKey?: number | string;
};

export function FadeSlideIn({
  children,
  index,
  style,
  playKey,
}: FadeSlideInProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue<number>(ENTRANCE.offsetY);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = ENTRANCE.offsetY;
    const delay = index * ENTRANCE.stagger;
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: ENTRANCE.duration,
        easing: ENTRANCE.easing,
      }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: ENTRANCE.duration,
        easing: ENTRANCE.easing,
      }),
    );
  }, [index, opacity, translateY, playKey]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}
