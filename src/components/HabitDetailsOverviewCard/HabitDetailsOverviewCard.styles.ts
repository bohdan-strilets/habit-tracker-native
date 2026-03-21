import type { ColorPalette } from '@theme';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radii,
  space,
} from '@theme';
import { StyleSheet } from 'react-native';

export const createHabitDetailsOverviewCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    cardsColumn: {
      alignSelf: 'stretch',
      gap: space['5xl'],
    },

    heroShell: {
      borderRadius: radii.lg,
      padding: space.base,
      marginBottom: space.none,
      overflow: 'hidden',
    },

    heroTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: space.base,
    },

    heroAccent: {
      width: 4,
      borderRadius: radii.xs,
      alignSelf: 'stretch',
      minHeight: 56,
    },

    heroIcon: {
      fontSize: 44,
      lineHeight: 50,
    },

    heroTextCol: {
      flex: 1,
      minWidth: 0,
    },

    habitTitle: {
      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.headline,
      color: colors.text.display,
      marginBottom: space.sm,
    },

    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: space.sm,
    },

    chip: {
      paddingVertical: space.xs,
      paddingHorizontal: space.smPlus,
      borderRadius: radii.pill,
      backgroundColor: colors.background.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border.hairline,
    },

    chipText: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.secondary,
    },

    blockTitle: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.label,
      color: colors.text.hint,
      marginBottom: space.sm,
    },

    blockTitleSpaced: {
      marginTop: space['6xl'],
    },

    trackingValue: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.relaxed,
      color: colors.text.secondary,
    },

    todayRow: {
      marginTop: space.lg,
    },

    todayCaption: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      color: colors.text.hint,
      marginBottom: space.sm,
    },

    notesBox: {
      padding: space.base,
      borderRadius: radii.md,
      backgroundColor: colors.background.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border.hairline,
    },

    notesText: {
      fontSize: fontSize.md,
      lineHeight: lineHeight.relaxed,
      color: colors.text.subtle,
    },

    reminderLine: {
      fontSize: fontSize.md,
      lineHeight: lineHeight.relaxed,
      color: colors.text.secondary,
      marginBottom: space.xs,
    },

    reminderLineLast: {
      marginBottom: space.none,
    },

    reminderMuted: {
      fontSize: fontSize.md,
      lineHeight: lineHeight.relaxed,
      fontStyle: 'italic',
      color: colors.text.hint,
    },

    metaFoot: {
      marginTop: space['6xl'],
      paddingTop: space.lg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border.hairline,
    },

    metaRow: {
      flexDirection: 'row',
      gap: space.base,
    },

    metaCell: {
      flex: 1,
      minWidth: 0,
    },

    metaLabel: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.label,
      color: colors.text.hint,
      marginBottom: space.xs,
    },

    metaValue: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: colors.text.secondary,
    },

    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: space.base,
      marginTop: space['5xl'],
      marginBottom: space.none,
      paddingTop: space.lg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border.hairline,
    },

    statItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: space.sm,
      borderRadius: radii.md,
      backgroundColor: colors.background.surfaceMuted,
    },

    statValue: {
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.bold,
      color: colors.text.secondary,
    },

    statLabel: {
      marginTop: space.xs,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.label,
      color: colors.text.hint,
    },

    statusBadge: {
      alignSelf: 'flex-start',
      marginTop: space.lg,
      paddingHorizontal: space.mdPlus,
      paddingVertical: space.smPlus,
      borderRadius: radii.pill,
    },

    statusText: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
    },
  });
