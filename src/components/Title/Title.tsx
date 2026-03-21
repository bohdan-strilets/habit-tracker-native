import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Text } from 'react-native';

import { createTitleStyles } from './Title.styles';
import type { TitleProps } from './Title.types';

export const Title = ({ title }: TitleProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createTitleStyles(theme.colors), [theme.colors]);

  return <Text style={styles.title}>{title}</Text>;
};
