import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,

    backgroundColor: '#4CAF50',
  },

  text: {
    fontSize: 16,
    fontWeight: '600',

    color: '#fff',
  },

  disabled: {
    backgroundColor: '#cfcfcf',
  },

  pressed: {
    opacity: 0.8,
  },
});
