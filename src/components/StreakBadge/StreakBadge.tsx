import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '../../theme';
import type { StreakBadgeProps } from './StreakBadge.types';
import { createStreakBadgeStyles } from './StreakBadge.styles';

export const StreakBadge = ({
  days,
  variant = 'default',
}: StreakBadgeProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStreakBadgeStyles(theme), [theme]);
  const compact = variant === 'compact';

  return (
    <View
      style={[styles.badge, compact && styles.badgeCompact]}
      accessibilityLabel={`Streak ${days} days`}
    >
      <Text style={[styles.text, compact && styles.textCompact]}>
        🔥 {days}
        {!compact ? ' days' : ''}
      </Text>
    </View>
  );
};
