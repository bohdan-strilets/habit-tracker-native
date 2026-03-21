import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { TextInput } from 'react-native';

import { createTextFieldStyles } from './TextField.styles';
import type { TextFieldProps } from './TextField.types';

export const TextField = ({ style, ...props }: TextFieldProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createTextFieldStyles(theme), [theme]);

  return (
    <TextInput
      placeholderTextColor={theme.colors.text.faint}
      style={[styles.input, style]}
      {...props}
    />
  );
};
