import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, letterSpacing, space } from '../../theme';

export const createTitleStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    title: {
      marginBottom: space.xl,

      fontSize: fontSize.hero,
      fontWeight: fontWeight.bold,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.display,

      color: colors.text.display,
    },
  });
