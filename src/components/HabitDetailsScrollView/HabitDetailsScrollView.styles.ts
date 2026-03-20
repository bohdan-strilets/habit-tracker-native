import { StyleSheet } from 'react-native';
import { space } from '../../theme';

export const habitDetailsScrollViewStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: space['3xl'],
    paddingBottom: space['7xl'],
  },
});
