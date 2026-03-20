import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'muted';

export type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  variant?: CardVariant;
  padding?: number;
  radius?: number;
};
