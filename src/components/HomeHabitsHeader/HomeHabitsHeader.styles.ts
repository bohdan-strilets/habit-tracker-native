import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
  headline: {
    marginBottom: space.mdPlus,

    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.headline,

    color: colors.text.primary,
  },

  lead: {
    marginBottom: space['3xl'],

    fontSize: fontSize.lg,
    lineHeight: lineHeight.relaxed,

    color: colors.text.muted,
  },
});
