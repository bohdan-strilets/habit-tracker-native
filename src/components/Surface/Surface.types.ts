import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;

  padding?: number;
  radius?: number;

  elevation?: 0 | 1 | 2 | 3;
  background?: string;
};
