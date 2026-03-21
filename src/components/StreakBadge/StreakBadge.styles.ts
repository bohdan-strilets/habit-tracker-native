import type { AppTheme } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createStreakBadgeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.xs,
      paddingVertical: space.sm,
      paddingHorizontal: space.base,
      borderRadius: radii.pill,
      backgroundColor: theme.colors.semantic.successLight,
    },
    badgeCompact: {
      paddingVertical: space.xs,
      paddingHorizontal: space.smPlus,
      gap: space.xxs,
    },
    text: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: theme.colors.semantic.successDark,
    },
    textCompact: {
      fontSize: fontSize.xs,
    },
  });
