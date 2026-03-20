import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
  },

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

  danger: {
    backgroundColor: '#fdecec',

    borderWidth: 1,
    borderColor: '#f0b4b4',
  },

  textDanger: {
    color: '#c62828',
  },

  textDangerDisabled: {
    color: '#888',
  },

  disabledDanger: {
    backgroundColor: '#eee',

    borderColor: '#ddd',

    opacity: 0.85,
  },
});
