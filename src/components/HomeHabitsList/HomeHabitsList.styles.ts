import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, letterSpacing, space } from '../../theme';

export const createHomeHabitsListStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    sectionHeader: {
      paddingHorizontal: space.base,
      paddingTop: space.lg,
      paddingBottom: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.hint,
      letterSpacing: letterSpacing.section,
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
    listContent: {
      paddingHorizontal: space.base,
      paddingBottom: space['3xl'],
    },
  });
