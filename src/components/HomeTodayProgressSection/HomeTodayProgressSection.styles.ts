import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme';
import { fontSize, fontWeight, letterSpacing, radii, space } from '../../theme';

export const createHomeTodayProgressSectionStyles = (theme: AppTheme) =>
  StyleSheet.create({
    progressSection: {
      marginHorizontal: space.base,
      marginBottom: space.base,
      padding: space.base,
      borderRadius: radii.md,
      backgroundColor: theme.colors.background.surface,
      ...theme.shadows.cardShadow,
    },
    progressTitle: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.tertiary,
      letterSpacing: letterSpacing.section,
      textTransform: 'uppercase',
      marginBottom: space.sm,
    },
    progressSummary: {
      marginTop: space.sm,
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.secondary,
    },
  });
