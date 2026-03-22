import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createOnboardingScreenStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    flex: { flex: 1 },
    keyboardRoot: { flex: 1 },
    center: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: space.xl,
      maxWidth: 420,
      width: '100%',
      alignSelf: 'center',
    },
    title: {
      fontSize: fontSize.hero,
      fontWeight: fontWeight.bold,
      color: colors.text.display,
      textAlign: 'center',
      marginBottom: space.md,
    },
    subtitle: {
      fontSize: fontSize.lg,
      fontWeight: '400',
      color: colors.text.muted,
      textAlign: 'center',
      lineHeight: Math.round(fontSize.lg * 1.45),
      marginBottom: space['6xl'],
    },
    sectionSpacer: { height: space['6xl'] },
    dotsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: space.sm,
      paddingVertical: space.lg,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });

export const createGoalCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    card: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border.subtle,
      backgroundColor: colors.background.surface,
      paddingVertical: space.lg,
      paddingHorizontal: space.lg,
      marginBottom: space.md,
    },
    cardSelected: {
      borderColor: colors.primary.dark,
      backgroundColor: colors.semantic.successLight,
    },
    cardLabel: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.medium,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    cardLabelSelected: {
      color: colors.primary.dark,
    },
  });
