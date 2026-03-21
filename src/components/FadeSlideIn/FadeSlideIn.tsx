import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { fadeSlideInEntrance as ENTRANCE } from './FadeSlideIn.styles';
import type { FadeSlideInProps } from './FadeSlideIn.types';

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
