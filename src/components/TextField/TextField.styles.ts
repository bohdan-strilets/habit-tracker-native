import { StyleSheet } from 'react-native';
import { colors, fontSize, inputShadow, layout, radii, space } from '../../theme';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: layout.buttonHeight,

    paddingHorizontal: space.lg,
    paddingVertical: space.mdPlus,

    borderWidth: 1,
    borderRadius: radii.md,

    fontSize: fontSize.xl,

    color: colors.text.secondary,

    backgroundColor: colors.background.input,

    borderColor: colors.border.default,

    ...inputShadow,
  },
});
