import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createStatsCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    root: {
      flex: 1,
      minWidth: 96,
      paddingVertical: space.lg,
      paddingHorizontal: space.md,
      borderRadius: radii.lg,
      backgroundColor: colors.background.surface,
      alignItems: 'center',
      gap: space.sm,
    },
    icon: {
      fontSize: fontSize['2xl'],
      lineHeight: fontSize['3xl'],
    },
    value: {
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.bold,
      color: colors.text.display,
      letterSpacing: -0.5,
    },
    label: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: colors.text.muted,
      textAlign: 'center',
    },
  });
