import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, letterSpacing, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createHomeHabitsListStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    list: {
      flex: 1,
    },
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
      flexGrow: 1,
    },
    listFooterFill: {
      flexGrow: 1,
    },
  });
