import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, lineHeight, space } from '../../theme';

export const createHabitsListEmptyStateStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    title: {
      marginBottom: space.mdPlus,

      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,

      color: colors.text.primary,
    },

    hint: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,

      color: colors.text.muted,
    },
  });
