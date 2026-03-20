import { StyleSheet } from 'react-native';
import { space } from '../../theme';

export const createHomeScreenScrollStyles = (transparent: string) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: transparent,
    },
    scrollContent: {
      gap: space['6xl'],
      padding: space.base,
      paddingBottom: space['7xl'],
    },
  });
