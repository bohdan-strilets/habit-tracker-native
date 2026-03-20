import { Text } from 'react-native';
import type { TitleProps } from './Title.types';
import { styles } from './Title.styles';

export const Title = ({ title }: TitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};
