import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, radii, space } from '../../theme';

export const createFieldRequirementBadgeStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    badge: {
      paddingVertical: space.xs,
      paddingHorizontal: space.smPlus,
      borderRadius: radii.pill,
      overflow: 'hidden',
    },
    badgeRequired: {
      backgroundColor: colors.semantic.successLight,
    },
    badgeRequiredText: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      color: colors.semantic.successDark,
    },
    badgeOptional: {
      backgroundColor: colors.background.surfaceMuted,
    },
    badgeOptionalText: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      color: colors.text.hint,
    },
  });
