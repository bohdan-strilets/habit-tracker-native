import { useMemo } from 'react';
import { Text } from 'react-native';
import { useAppTheme } from '../../theme';
import type { TitleProps } from './Title.types';
import { createTitleStyles } from './Title.styles';

export const Title = ({ title }: TitleProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createTitleStyles(theme.colors),
    [theme.colors],
  );

  return <Text style={styles.title}>{title}</Text>;
};
