import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
  title: {
    marginBottom: space.xl,

    fontSize: fontSize.hero,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.display,

    color: colors.text.display,
  },
});
