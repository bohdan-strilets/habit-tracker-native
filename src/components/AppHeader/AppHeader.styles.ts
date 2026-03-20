import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
  },

  inner: {
    paddingHorizontal: 16,
    paddingBottom: 12,

    borderBottomWidth: StyleSheet.hairlineWidth,

    backgroundColor: '#fff',
    borderBottomColor: '#e0e0e0',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
  },

  titleBlock: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,

    color: '#111',
  },

  subtitle: {
    marginTop: 2,

    fontSize: 13,
    fontWeight: '500',

    color: '#666',
  },
});
