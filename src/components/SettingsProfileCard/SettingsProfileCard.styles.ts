import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createSettingsProfileCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: space.lg,
      gap: space.md,
    },
    viewLabel: {
      fontSize: fontSize.sm,
      color: colors.text.subtle,
    },
    viewValue: {
      flexShrink: 1,
      textAlign: 'right',
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.primary,
    },
    editLink: {
      alignSelf: 'flex-start',
      marginTop: space.md,
      paddingVertical: space.sm,
    },
    editLinkText: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.primary.dark,
    },
    fieldLabel: {
      marginBottom: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.subtle,
    },
    fieldLabelSpaced: {
      marginTop: space.lg,
    },
    nameField: {
      marginBottom: space.xs,
    },
    goalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: space.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border.light,
    },
    goalRowLast: {
      borderBottomWidth: 0,
    },
    goalRowSelected: {
      backgroundColor: colors.semantic.successLight,
      marginHorizontal: -space.sm,
      paddingHorizontal: space.sm,
      borderRadius: radii.sm,
      borderBottomWidth: 0,
    },
    goalRowLabel: {
      flex: 1,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      color: colors.text.primary,
    },
    goalRowLabelSelected: {
      color: colors.primary.dark,
    },
    saveBlock: {
      marginTop: space.lg,
    },
    cancelPress: {
      alignSelf: 'center',
      marginTop: space.md,
      paddingVertical: space.sm,
    },
    cancelText: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors.text.muted,
    },
  });
