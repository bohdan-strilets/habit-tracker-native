import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  radii,
  space,
} from '../../theme';

export const createHabitDetailsOverviewCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    createdBlock: {
      marginBottom: space.xxl,
    },

    createdLabel: {
      marginBottom: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.label,
      color: colors.text.hint,
    },

    createdValue: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.medium,
      color: colors.text.secondary,
    },

    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: space.xl,
    },

    statItem: {
      alignItems: 'center',
    },

    statValue: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.semibold,
      color: colors.text.secondary,
    },

    statLabel: {
      marginTop: space.sm,
      fontSize: fontSize.sm,
      color: colors.text.hint,
    },

    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: space.mdPlus,
      paddingVertical: space.smPlus,
      borderRadius: radii.pill,
    },

    statusText: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
    },
  });
