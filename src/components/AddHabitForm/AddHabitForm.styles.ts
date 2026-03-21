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

export const createAddHabitFormStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    root: {
      gap: space['3xl'],

      width: '100%',
    },

    formStack: {
      gap: space['3xl'],
      width: '100%',
    },

    headline: {
      marginBottom: space.mdPlus,

      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.headline,

      color: colors.text.primary,
    },

    lead: {
      marginBottom: space.none,

      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,

      color: colors.text.muted,
    },

    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
      marginBottom: space.md,
    },

    labelRowTight: {
      marginBottom: space.sm,
    },

    fieldLabel: {
      flex: 1,
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
      color: colors.text.tertiary,
    },

    sectionLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
      marginBottom: space.sm,
    },

    sectionLabelText: {
      flex: 1,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.section,
      color: colors.text.hint,
    },

    switchHint: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.body,
      color: colors.text.hint,
      marginBottom: space.sm,
    },

    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
    },

    switchLabel: {
      flex: 1,
      fontSize: fontSize.md,
      lineHeight: lineHeight.body,
      color: colors.text.secondary,
    },

    counter: {
      marginTop: space.smPlus,

      fontSize: fontSize.sm,
      textAlign: 'right',

      color: colors.text.faint,
    },

    inlineHint: {
      fontSize: fontSize.md,
      fontStyle: 'italic',

      color: colors.text.hint,
    },

    horizontalScroll: {
      marginBottom: space.none,
    },

    horizontalContent: {
      gap: space.sm,
      paddingVertical: space.xs,
    },

    emojiHit: {
      width: 48,
      height: 48,
      borderRadius: radii.md,
      borderWidth: 2,
      borderColor: colors.border.hairline,
      backgroundColor: colors.background.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    emojiHitSelected: {
      borderColor: colors.primary.main,
      backgroundColor: colors.semantic.successLight,
    },

    emojiGlyph: {
      fontSize: fontSize['4xl'],
    },

    colorHit: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
    },

    colorHitSelected: {
      borderColor: colors.text.primary,
    },

    chipScroll: {
      marginBottom: space.none,
    },

    chipScrollContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: space.sm,
    },

    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.xs,
      paddingVertical: space.smPlus,
      paddingHorizontal: space.base,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.border.default,
      backgroundColor: colors.background.surfaceMuted,
    },

    categoryChipSelected: {
      borderColor: colors.primary.main,
      backgroundColor: colors.semantic.successLight,
    },

    categoryChipEmoji: {
      fontSize: fontSize.md,
    },

    categoryChipLabel: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.secondary,
    },

    reminderTimeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
      marginBottom: space.md,
    },

    reminderTimeFields: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
    },

    reminderTimeField: {
      flex: 1,
      minWidth: 0,
    },

    reminderColon: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: colors.text.tertiary,
    },

    reminderRemoveHit: {
      padding: space.sm,
    },

    reminderAddTime: {
      alignSelf: 'flex-start',
      paddingVertical: space.sm,
      paddingHorizontal: space.none,
    },

    reminderAddTimeLabel: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
      color: colors.primary.main,
    },

    reminderAddTimeDisabled: {
      color: colors.text.faint,
    },

    notesInput: {
      minHeight: 88,
      paddingTop: space.md,
      textAlignVertical: 'top',
    },

    tipsTitle: {
      marginBottom: space.base,

      fontSize: fontSize.base,
      fontWeight: fontWeight.bold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.label,

      color: colors.text.tertiary,
    },

    tipLine: {
      marginBottom: space.mdPlus,

      fontSize: fontSize.base,
      lineHeight: lineHeight.body,

      color: colors.text.subtle,
    },

    tipLineLast: {
      marginBottom: space.none,
    },
  });
