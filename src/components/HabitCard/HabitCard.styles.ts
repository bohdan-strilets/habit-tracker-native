import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    overflow: 'hidden',

    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    elevation: 3,
  },

  cardPlain: {
    padding: 0,
    borderRadius: 0,

    backgroundColor: 'transparent',

    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },

    elevation: 0,
  },

  title: {
    marginBottom: 12,

    fontSize: 17,
    fontWeight: '600',

    color: '#111',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 16,
    fontWeight: '600',

    color: '#222',
  },

  statLabel: {
    fontSize: 12,

    color: '#888',
  },

  pressableWrapper: {
    flex: 1,
  },
});
