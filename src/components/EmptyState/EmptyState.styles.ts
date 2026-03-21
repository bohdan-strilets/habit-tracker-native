import type { AppTheme } from '@theme';
import { fontSize, fontWeight, layout, lineHeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createEmptyStateStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: space['6xl'],
      paddingHorizontal: space.xl,
      maxWidth: 360,
      alignSelf: 'center',
      width: '100%',
    },
    iconWrap: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: space['3xl'],
      backgroundColor: theme.colors.accent.todayBg,
    },
    title: {
      marginBottom: space.base,
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.primary,
      textAlign: 'center',
      letterSpacing: -0.3,
    },
    titleWithoutSubtitle: {
      marginBottom: space['3xl'],
    },
    subtitle: {
      marginBottom: space['3xl'],
      fontSize: fontSize.md,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.subtle,
      textAlign: 'center',
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
