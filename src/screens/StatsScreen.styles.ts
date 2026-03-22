import { space } from '@theme';
import { StyleSheet } from 'react-native';

export const createStatsScreenStyles = () =>
  StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: space['7xl'],
      paddingHorizontal: space.xl,
      paddingTop: space.lg,
      gap: space['3xl'],
    },
    kpiRow: {
      flexDirection: 'row',
      gap: space.md,
      alignItems: 'stretch',
    },
    kpiItem: {
      flex: 1,
      minWidth: 0,
    },
  });
