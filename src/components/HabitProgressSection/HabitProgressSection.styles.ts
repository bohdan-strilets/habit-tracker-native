import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  space,
  layout,
} from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: space.sm,
  },

  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,

    color: colors.text.primary,
  },

  secondTitle: {
    marginTop: space['3xl'],
  },

  sectionHint: {
    marginTop: space.smPlus,

    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,

    color: colors.text.hint,
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',

    paddingVertical: space.base,
    width: '100%',
  },

  dayCell: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',

    paddingHorizontal: space.xs,
  },

  dayCellToday: {
    marginHorizontal: space.xxs,
    paddingVertical: space.smPlus,
    borderRadius: radii.sm,

    backgroundColor: colors.accent.todayBg,
  },

  weekday: {
    fontSize: fontSize.tiny,
    textAlign: 'center',
    textTransform: 'capitalize',

    color: colors.text.hint,
  },

  weekdayTodayLabel: {
    fontSize: fontSize.micro,
    fontWeight: fontWeight.bold,
    textTransform: 'none',

    color: colors.accent.todayLabel,
  },

  dayNum: {
    marginTop: space.xs,

    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,

    color: colors.text.secondary,
  },

  dot: {
    width: layout.dotSize,
    height: layout.dotSize,
    marginTop: space.smMid,
    borderWidth: 2,
    borderRadius: radii.xs,
  },

  dotEmpty: {
    backgroundColor: colors.progress.dotEmpty,

    borderColor: colors.progress.dotEmptyBorder,
  },

  dotDone: {
    backgroundColor: colors.progress.dotDone,

    borderColor: colors.progress.dotDoneBorder,
  },

  dotStreakRing: {
    borderWidth: 2,

    borderColor: colors.progress.streakRing,
  },

  tapBadge: {
    marginTop: space.sm,
    height: layout.tapBadgeHeight,

    fontSize: fontSize.xs,

    color: colors.text.subtle,
  },

  tapBadgePlaceholder: {
    marginTop: space.sm,
    height: layout.tapBadgeHeight,
  },

  emptyList: {
    marginTop: space.md,

    fontSize: fontSize.base,

    color: colors.text.faint,
  },

  list: {
    marginTop: space.md,

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border.subtle,
  },

  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: space.mdPlus,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.hairline,
  },

  listDate: {
    flex: 1,
    paddingRight: space.md,

    fontSize: fontSize.base,

    color: colors.text.secondary,
  },

  listMeta: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,

    color: colors.primary.main,
  },
});
