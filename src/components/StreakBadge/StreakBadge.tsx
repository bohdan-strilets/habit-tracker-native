import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { createStreakBadgeStyles } from './StreakBadge.styles';
import type { StreakBadgeProps } from './StreakBadge.types';

export const StreakBadge = ({
  days,
  variant = 'default',
}: StreakBadgeProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStreakBadgeStyles(theme), [theme]);
  const compact = variant === 'compact';

  return (
    <View
      style={[styles.badge, compact && styles.badgeCompact]}
      accessibilityLabel={t('streak.daysA11y', { days })}
    >
      <Text style={[styles.text, compact && styles.textCompact]}>
        🔥{' '}
        {!compact ? t('streak.days', { days }) : t('streak.daysCompact', { days })}
      </Text>
    </View>
  );
};
