import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export type Props = TextInputProps;

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 20,
    height: 50,

    backgroundColor: '#fff',
  },
});

export const StyledTextInput = ({ ...props }: Props) => {
  return <TextInput style={styles.input} {...props} />;
};
