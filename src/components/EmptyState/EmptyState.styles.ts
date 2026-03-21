import type { AppTheme } from '@theme';
import { fontSize, fontWeight, layout, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createEmptyStateStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: space['7xl'],
      paddingHorizontal: space.xl,
    },
    title: {
      marginBottom: space.lg,
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.primary,
      textAlign: 'center',
      letterSpacing: -0.3,
    },
    button: {
      minWidth: 220,
      height: layout.buttonHeight,
      paddingHorizontal: space.xl,
      borderRadius: radii.lg,
      backgroundColor: theme.colors.primary.main,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.cardShadow,
    },
    buttonPressed: {
      opacity: 0.88,
    },
    buttonLabel: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.inverse,
    },
  });
