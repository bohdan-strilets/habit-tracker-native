import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type StackProps = {
  children: ReactNode;
  spacing?: number;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  padding?: number;
  scrollable?: boolean;
  style?: ViewStyle;
};
