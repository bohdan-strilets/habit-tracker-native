import type { ColorPalette } from '@theme';
import { space } from '@theme';
import { StyleSheet } from 'react-native';

export const createHabitDetailsMissingStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    missing: {
      paddingVertical: space['5xl'],
      textAlign: 'center',
      color: colors.text.hint,
    },
  });
