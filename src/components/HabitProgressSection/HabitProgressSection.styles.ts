import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',

    color: '#111',
  },

  secondTitle: {
    marginTop: 20,
  },

  sectionHint: {
    marginTop: 6,

    fontSize: 12,
    lineHeight: 16,

    color: '#888',
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',

    paddingVertical: 12,
    width: '100%',
  },

  dayCell: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',

    paddingHorizontal: 2,
  },

  dayCellToday: {
    marginHorizontal: 1,
    paddingVertical: 6,
    borderRadius: 10,

    backgroundColor: '#f5f9ff',
  },

  weekday: {
    fontSize: 9,
    textAlign: 'center',
    textTransform: 'capitalize',

    color: '#888',
  },

  weekdayTodayLabel: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'none',

    color: '#1565c0',
  },

  dayNum: {
    marginTop: 2,

    fontSize: 13,
    fontWeight: '600',

    color: '#222',
  },

  dot: {
    width: 12,
    height: 12,
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 6,
  },

  dotEmpty: {
    backgroundColor: '#f0f0f0',

    borderColor: '#e0e0e0',
  },

  dotDone: {
    backgroundColor: '#c8e6c9',

    borderColor: '#81c784',
  },

  dotStreakRing: {
    borderWidth: 2,

    borderColor: '#2e7d32',
  },

  tapBadge: {
    marginTop: 4,
    height: 14,

    fontSize: 10,

    color: '#666',
  },

  tapBadgePlaceholder: {
    marginTop: 4,
    height: 14,
  },

  emptyList: {
    marginTop: 8,

    fontSize: 14,

    color: '#999',
  },

  list: {
    marginTop: 8,

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e8e8e8',
  },

  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },

  listDate: {
    flex: 1,
    paddingRight: 8,

    fontSize: 14,

    color: '#222',
  },

  listMeta: {
    fontSize: 14,
    fontWeight: '600',

    color: '#4CAF50',
  },
});
