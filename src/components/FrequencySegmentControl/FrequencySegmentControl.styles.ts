import { StyleSheet } from 'react-native';
import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, layout, radii } from '../../theme';

export const TRACK_PADDING = 3;

export const createFrequencySegmentStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    track: {
      flexDirection: 'row',
      alignItems: 'stretch',
      position: 'relative',

      minHeight: layout.buttonHeight,

      borderWidth: 1,
      borderColor: colors.border.default,
      borderRadius: radii.md,
      backgroundColor: colors.background.surfaceMuted,
      overflow: 'hidden',
    },
    indicator: {
      position: 'absolute',
      top: TRACK_PADDING,
      bottom: TRACK_PADDING,
      borderRadius: radii.sm,
      backgroundColor: colors.semantic.successLight,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    segment: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
    },
  });
