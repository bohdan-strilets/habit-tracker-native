import { useMemo } from 'react';
import { TextInput } from 'react-native';
import { useAppTheme } from '../../theme';
import type { TextFieldProps } from './TextField.types';
import { createTextFieldStyles } from './TextField.styles';

export const TextField = ({ ...props }: TextFieldProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createTextFieldStyles(theme), [theme]);

  return (
    <TextInput
      placeholderTextColor={theme.colors.text.faint}
      style={styles.input}
      {...props}
    />
  );
};
