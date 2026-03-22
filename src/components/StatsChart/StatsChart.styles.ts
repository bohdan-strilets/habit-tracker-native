import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createStatsChartStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    headerBlock: {
      marginBottom: space.lg,
    },
    title: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.bold,
      color: colors.text.display,
      letterSpacing: -0.4,
    },
    subtitle: {
      marginTop: space.sm,
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * 1.45,
      color: colors.text.muted,
    },
    metricsRow: {
      flexDirection: 'row',
      gap: space.md,
      marginBottom: space.lg,
    },
    metric: {
      flex: 1,
      minWidth: 0,
      paddingVertical: space.md,
      paddingHorizontal: space.base,
      borderRadius: 12,
      backgroundColor: colors.background.surfaceMuted,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border.hairline,
    },
    metricLabel: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: colors.text.hint,
      marginBottom: space.xs,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    metricValue: {
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.bold,
      color: colors.text.primary,
      letterSpacing: -0.3,
    },
    chartBlock: {
      marginHorizontal: -space.sm,
      alignItems: 'center',
    },
    emptyText: {
      marginTop: space.sm,
      fontSize: fontSize.base,
      lineHeight: fontSize.base * 1.45,
      color: colors.text.muted,
    },
    footnote: {
      marginTop: space.md,
      fontSize: fontSize.xs,
      lineHeight: fontSize.xs * 1.45,
      color: colors.text.hint,
      textAlign: 'center',
    },
  });
