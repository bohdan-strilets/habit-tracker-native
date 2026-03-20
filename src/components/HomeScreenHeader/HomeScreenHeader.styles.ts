import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme';
import { fontSize, fontWeight, letterSpacing, space } from '../../theme';

export const createHomeScreenHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: space.base,
      paddingTop: space.sm,
      paddingBottom: space.base,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: space.md,
    },
    greetingBlock: {
      flex: 1,
      minWidth: 0,
    },
    greeting: {
      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      color: theme.colors.text.display,
      letterSpacing: letterSpacing.headline,
    },
    date: {
      marginTop: space.xs,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.subtle,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
    },
  });
