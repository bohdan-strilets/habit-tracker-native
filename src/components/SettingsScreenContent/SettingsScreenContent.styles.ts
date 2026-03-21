import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, lineHeight, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createSettingsScreenContentStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: space['7xl'],
      paddingHorizontal: space.xl,
      paddingTop: space.lg,
    },
    stack: {
      gap: space['3xl'],
    },
    body: {
      marginBottom: space.lg,
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * 1.45,
      color: colors.text.secondary,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: space.lg,
      gap: space.md,
    },
    statusLabel: {
      fontSize: fontSize.sm,
      color: colors.text.subtle,
    },
    statusValue: {
      flexShrink: 1,
      textAlign: 'right',
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.primary,
    },
    linkButton: {
      alignSelf: 'flex-start',
      marginTop: space.sm,
      paddingVertical: space.sm,
    },
    linkText: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.primary.dark,
    },
    themeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: space.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border.light,
    },
    themeRowLast: {
      borderBottomWidth: 0,
    },
    themeRowLabel: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      color: colors.text.primary,
    },
    versionLine: {
      fontSize: fontSize.sm,
      color: colors.text.secondary,
    },
    versionMuted: {
      marginTop: space.sm,
      fontSize: fontSize.xs,
      color: colors.text.hint,
    },
    prefsBlock: {
      marginTop: space['3xl'],
      paddingTop: space['3xl'],
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border.light,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.md,
      marginBottom: space.lg,
    },
    switchLabel: {
      flex: 1,
      fontSize: fontSize.md,
      lineHeight: lineHeight.body,
      color: colors.text.secondary,
    },
    switchHint: {
      marginBottom: space.lg,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.body,
      color: colors.text.hint,
    },
    reminderTimeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
    },
    reminderTimeFields: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.sm,
    },
    reminderTimeField: {
      flex: 1,
      minWidth: 0,
      maxWidth: 88,
    },
    reminderColon: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: colors.text.tertiary,
    },
    timeFieldLabel: {
      marginBottom: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.subtle,
    },
  });
