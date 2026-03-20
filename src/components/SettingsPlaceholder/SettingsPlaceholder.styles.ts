import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme';
import { fontSize, fontWeight, space } from '../../theme';

export const createSettingsPlaceholderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: space.base,
      paddingTop: space.md,
    },
    title: {
      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      color: theme.colors.text.display,
      marginBottom: space.sm,
    },
    hint: {
      fontSize: fontSize.md,
      color: theme.colors.text.subtle,
    },
  });
