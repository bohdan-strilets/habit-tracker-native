import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, space } from '@theme';
import { StyleSheet } from 'react-native';

export const habitStorageGateGradientFill = StyleSheet.absoluteFill;

export const createHabitStorageGateStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    gateRoot: {
      flex: 1,
      position: 'relative',

      backgroundColor: colors.background.transparent,
    },

    gate: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: space['5xl'],
      gap: space.xl,
    },

    errorTitle: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.semibold,
      color: colors.text.primary,
      textAlign: 'center',
    },

    errorBody: {
      fontSize: fontSize.lg,
      color: colors.text.subtle,
      textAlign: 'center',
      marginBottom: space.md,
    },
  });
