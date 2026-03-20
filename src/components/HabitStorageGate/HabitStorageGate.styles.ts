import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
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
