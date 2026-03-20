import { Easing } from 'react-native-reanimated';

export const fadeSlideInEntrance = {
  duration: 520,
  stagger: 88,
  offsetY: 16,
  easing: Easing.out(Easing.cubic),
} as const;
