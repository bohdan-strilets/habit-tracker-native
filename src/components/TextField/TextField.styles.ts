import type { AppTheme } from '@theme';
import { fontSize, layout, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createTextFieldStyles = (theme: AppTheme) =>
  StyleSheet.create({
    input: {
      width: '100%',
      height: layout.buttonHeight,

      paddingHorizontal: space.lg,
      paddingVertical: space.mdPlus,

      borderWidth: 1,
      borderRadius: radii.md,

      fontSize: fontSize.xl,

      color: theme.colors.text.secondary,

      backgroundColor: theme.colors.background.input,

      borderColor: theme.colors.border.default,

      ...theme.shadows.inputShadow,
    },
  });
