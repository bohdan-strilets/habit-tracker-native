import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    gap: 20,

    width: '100%',
  },

  headline: {
    marginBottom: 10,

    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,

    color: '#111',
  },

  lead: {
    marginBottom: 22,

    fontSize: 15,
    lineHeight: 22,

    color: '#555',
  },

  fieldLabel: {
    marginBottom: 8,

    fontSize: 13,
    fontWeight: '600',

    color: '#444',
  },

  counter: {
    marginTop: 6,

    fontSize: 12,
    textAlign: 'right',

    color: '#999',
  },

  inlineHint: {
    fontSize: 13,
    fontStyle: 'italic',

    color: '#888',
  },

  tipsTitle: {
    marginBottom: 12,

    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,

    color: '#444',
  },

  tipLine: {
    marginBottom: 10,

    fontSize: 14,
    lineHeight: 21,

    color: '#666',
  },

  tipLineLast: {
    marginBottom: 0,
  },
});
