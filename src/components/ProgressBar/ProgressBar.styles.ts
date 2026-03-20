import { StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme';
import { radii, space } from '../../theme';

export const createProgressBarStyles = (theme: AppTheme) =>
  StyleSheet.create({
    track: {
      height: space.mdPlus,
      borderRadius: radii.pill,
      backgroundColor: theme.colors.border.hairline,
      overflow: 'hidden',
    },
    fillClip: {
      height: '100%',
      borderRadius: radii.pill,
      overflow: 'hidden',
    },
    gradient: {
      height: '100%',
    },
  });
