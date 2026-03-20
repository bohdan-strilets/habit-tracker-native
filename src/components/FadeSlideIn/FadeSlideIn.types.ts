import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type FadeSlideInProps = {
  children: ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
  playKey?: number | string;
};
