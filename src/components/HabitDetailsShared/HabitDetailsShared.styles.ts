import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, letterSpacing, space } from '../../theme';

export const createHabitDetailsSharedStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    sectionHeading: {
      marginBottom: space.lg,
      fontSize: fontSize.md,
      fontWeight: fontWeight.bold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.section,
      color: colors.text.subtle,
    },
  });
