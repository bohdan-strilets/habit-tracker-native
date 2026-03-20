import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from '../../theme';

export const createAddHabitFormStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    root: {
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
      marginBottom: space['4xl'],

      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,

      color: colors.text.muted,
    },

    fieldLabel: {
      marginBottom: space.md,

      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,

      color: colors.text.tertiary,
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
