import { Platform } from 'react-native';

export const IOS_REORDER_SPRING = {
  stiffness: 640,
  damping: 34,
  mass: 0.26,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
} as const;

export const SCALE_LIFTED = 1.038;
export const TRANSLATE_Y_LIFT = Platform.OS === 'ios' ? -9 : -6;
export const SHADOW_RADIUS = 22;
export const SHADOW_OFFSET_Y = 16;
export const ELEVATION_LIFTED = 20;
