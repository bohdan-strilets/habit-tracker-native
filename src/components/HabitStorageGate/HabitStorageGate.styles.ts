import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gateRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },

  gate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },

  errorBody: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
});
