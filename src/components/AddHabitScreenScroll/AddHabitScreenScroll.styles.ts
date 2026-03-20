import { StyleSheet } from 'react-native';
import { space } from '../../theme';

export const addHabitScreenScrollStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: space['7xl'],
  },
});
