import type { ViewStyle } from 'react-native';

import type { StackProps } from './Stack.types';

type Align = NonNullable<StackProps['align']>;
type Justify = NonNullable<StackProps['justify']>;

export function stackLayoutStyle(
  padding: number,
  align: Align,
  justify: Justify,
  style?: ViewStyle,
): ViewStyle[] {
  return [{ padding, alignItems: align, justifyContent: justify }, style ?? {}];
}
