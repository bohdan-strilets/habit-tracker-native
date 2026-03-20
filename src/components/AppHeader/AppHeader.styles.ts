import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  layout,
  space,
} from '../../theme';

export const createAppHeaderStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    safe: {
      backgroundColor: colors.background.transparent,
    },

    headerFill: {
      width: '100%',
    },

    inner: {
      paddingHorizontal: space.xl,
      paddingBottom: space.base,

      borderBottomWidth: StyleSheet.hairlineWidth,

      backgroundColor: colors.background.transparent,
      borderBottomColor: colors.border.default,
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.base,
    },

    backSlot: {
      overflow: 'hidden',
      alignSelf: 'stretch',
      justifyContent: 'center',
    },

    backHit: {
      padding: 8,
      marginLeft: -8,
    },

    backPressed: {
      opacity: 0.65,
    },

    logo: {
      width: layout.logoSize,
      height: layout.logoSize,
    },

    titleBlock: {
      flex: 1,
      minWidth: 0,
    },

    title: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.title,

      color: colors.text.primary,
    },

    subtitle: {
      marginTop: space.xs,

      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,

      color: colors.text.subtle,
    },

    subtitleSecondary: {
      marginTop: 2,

      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,

      color: colors.text.hint,
    },
  });
