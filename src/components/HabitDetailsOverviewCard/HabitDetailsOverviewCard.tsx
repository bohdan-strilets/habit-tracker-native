import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Card } from '../Card';
import { createHabitDetailsSharedStyles } from '../HabitDetailsShared';
import { useAppTheme } from '../../theme';
import { formatYyyyMmDdLong } from '../../utils/date';
import { createHabitDetailsOverviewCardStyles } from './HabitDetailsOverviewCard.styles';
import type { HabitDetailsOverviewCardProps } from './HabitDetailsOverviewCard.types';

export const HabitDetailsOverviewCard = ({
  habit,
  streak,
  completionRate,
  isDoneToday,
  badgeAnimatedStyle,
  badgeTextAnimatedStyle,
  statPulseStyle,
}: HabitDetailsOverviewCardProps) => {
  const { theme } = useAppTheme();
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );
  const styles = useMemo(
    () => createHabitDetailsOverviewCardStyles(theme.colors),
    [theme.colors],
  );

  return (
    <Card>
      <Text style={shared.sectionHeading}>Overview</Text>
      <View style={styles.createdBlock}>
        <Text style={styles.createdLabel}>Created</Text>
        <Text style={styles.createdValue}>
          {habit.createdAt ? formatYyyyMmDdLong(habit.createdAt) : '—'}
        </Text>
      </View>

      <Animated.View style={statPulseStyle}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥 {streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>📊 {completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.statusBadge, badgeAnimatedStyle]}>
        <Animated.Text style={[styles.statusText, badgeTextAnimatedStyle]}>
          {isDoneToday ? 'Done today' : 'Not done'}
        </Animated.Text>
      </Animated.View>
    </Card>
  );
};
