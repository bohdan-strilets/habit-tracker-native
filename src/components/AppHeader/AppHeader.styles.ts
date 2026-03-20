import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  layout,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
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
});
