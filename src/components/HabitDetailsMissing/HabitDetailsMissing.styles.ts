import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { space } from '../../theme';

export const createHabitDetailsMissingStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    missing: {
      paddingVertical: space['5xl'],
      textAlign: 'center',
      color: colors.text.hint,
    },
  });
