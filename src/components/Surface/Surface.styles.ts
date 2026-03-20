import { StyleSheet, type ViewStyle } from 'react-native';

export const elevationStyles: Record<0 | 1 | 2 | 3, ViewStyle> = {
  0: {},

  1: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    elevation: 1,
  },

  2: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 3,
  },

  3: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    elevation: 6,
  },
};

export const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
