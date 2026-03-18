import { Text, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 44,
    fontWeight: 700,

    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export type Props = {
  title: string;
};

export const Title = ({ title }: Props) => {
  return <Text style={styles.title}>{title}</Text>;
};
