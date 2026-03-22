import { Surface } from '@components/Surface';
import { radii, space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Text } from 'react-native';

import { createStatsCardStyles } from './StatsCard.styles';
import type { StatsCardProps } from './StatsCard.types';

export const StatsCard = ({ icon, value, label, style }: StatsCardProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createStatsCardStyles(theme.colors),
    [theme.colors],
  );

  return (
    <Surface
      elevation={2}
      padding={space.none}
      radius={radii.lg}
      style={[styles.root, style]}
    >
      <Text style={styles.icon} importantForAccessibility="no">
        {icon}
      </Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </Surface>
  );
};
