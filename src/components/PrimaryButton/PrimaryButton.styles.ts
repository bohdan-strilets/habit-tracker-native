import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  layout,
  radii,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',

    height: layout.buttonHeight,
    paddingHorizontal: space.xl,
    borderRadius: radii.md,

    overflow: 'hidden',
  },

  text: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,

    color: colors.text.inverse,
  },

  disabled: {
    backgroundColor: colors.background.disabled,
  },

  danger: {
    backgroundColor: colors.semantic.dangerLight,

    borderWidth: 1,
    borderColor: colors.semantic.dangerBorder,
  },

  textDanger: {
    color: colors.semantic.danger,
  },

  textDangerDisabled: {
    color: colors.text.hint,
  },

  disabledDanger: {
    backgroundColor: colors.background.disabledMuted,

    borderColor: colors.border.light,

    opacity: 0.85,
  },
});
