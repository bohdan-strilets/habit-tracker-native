import { StyleSheet } from 'react-native';
import {
  cardShadow,
  colors,
  fontSize,
  fontWeight,
  radii,
  space,
} from '../../theme';

export const styles = StyleSheet.create({
  card: {
    padding: space.xl,
    borderRadius: radii.xl,
    overflow: 'hidden',

    backgroundColor: colors.background.surface,

    ...cardShadow,
  },

  cardPlain: {
    padding: 0,
    borderRadius: 0,

    backgroundColor: colors.background.transparent,

    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },

    elevation: 0,
  },

  title: {
    marginBottom: space.base,

    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,

    color: colors.text.primary,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,

    color: colors.text.secondary,
  },

  statLabel: {
    fontSize: fontSize.sm,

    color: colors.text.hint,
  },

  pressableWrapper: {
    flex: 1,
  },
});
