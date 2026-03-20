import { TextInput } from 'react-native';
import { colors } from '../../theme';
import type { TextFieldProps } from './TextField.types';
import { styles } from './TextField.styles';

export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <TextInput
      placeholderTextColor={colors.text.faint}
      style={styles.input}
      {...props}
    />
  );
};
