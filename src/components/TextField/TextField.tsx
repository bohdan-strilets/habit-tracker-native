import { TextInput } from 'react-native';
import type { TextFieldProps } from './TextField.types';
import { styles } from './TextField.styles';

export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <TextInput placeholderTextColor="#999" style={styles.input} {...props} />
  );
};
