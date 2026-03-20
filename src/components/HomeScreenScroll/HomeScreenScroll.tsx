import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useAppTheme } from '../../theme';
import { createHomeScreenScrollStyles } from './HomeScreenScroll.styles';
import type { HomeScreenScrollProps } from './HomeScreenScroll.types';

export const HomeScreenScroll = ({ children }: HomeScreenScrollProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () =>
      createHomeScreenScrollStyles(theme.colors.background.transparent),
    [theme.colors.background.transparent],
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};
