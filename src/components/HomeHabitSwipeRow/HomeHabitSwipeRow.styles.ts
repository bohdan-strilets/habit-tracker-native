import { HOME_SWIPE_ACTION_WIDTH } from '@constants/homeHabitSwipeRow';
import type { ColorPalette } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createHomeHabitSwipeRowStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    rowWrap: {
      marginBottom: space.base,
    },
    track: {
      position: 'relative',
      borderRadius: radii.md,
      overflow: 'hidden',
    },
    slideLayer: {
      zIndex: 1,
    },
    leftStrip: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    rightStrip: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: HOME_SWIPE_ACTION_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary.main,
    },
    leftAction: {
      width: HOME_SWIPE_ACTION_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftActionEdit: {
      backgroundColor: colors.accent.todayLabel,
      borderTopLeftRadius: radii.md,
      borderBottomLeftRadius: radii.md,
    },
    leftActionDelete: {
      backgroundColor: colors.semantic.danger,
    },
    actionLabel: {
      marginTop: space.xs,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      color: colors.text.inverse,
    },
  });
