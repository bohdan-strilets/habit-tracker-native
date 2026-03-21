import { HABIT_DETAILS_TIMELINE_DAYS } from '@constants/habits';
import { getDayTimeline, getProgressDaysSummary } from '@domain/habitActivity';
import { useAppTheme } from '@theme';
import { formatYyyyMmDdDateOnly } from '@utils/date';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { createHabitProgressSectionStyles } from './HabitProgressSection.styles';
import type { HabitProgressSectionProps } from './HabitProgressSection.types';

export const HabitProgressSection = ({ habit }: HabitProgressSectionProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHabitProgressSectionStyles(theme.colors),
    [theme.colors],
  );

  const progressDays = useMemo(() => getProgressDaysSummary(habit), [habit]);
  const timeline = useMemo(
    () => getDayTimeline(habit, HABIT_DETAILS_TIMELINE_DAYS),
    [habit],
  );

  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>
        Last {HABIT_DETAILS_TIMELINE_DAYS} days
      </Text>
      <Text style={styles.sectionHint}>
        Oldest on the left, today on the right. Solid dot = goal met that day.
        Ring = part of your current streak.
        {kind === 'count' && target > 1
          ? ' Under the dot: progress toward today’s target.'
          : ''}
      </Text>

      <View style={styles.timelineRow}>
        {timeline.map((cell, index) => {
          const isToday = index === timeline.length - 1;
          return (
            <View
              key={cell.dateYyyyMmDd}
              style={[styles.dayCell, isToday && styles.dayCellToday]}
            >
              <Text
                style={[styles.weekday, isToday && styles.weekdayTodayLabel]}
                numberOfLines={1}
              >
                {isToday ? 'Today' : cell.weekdayShort.replace(/\.$/, '')}
              </Text>
              <Text style={styles.dayNum}>{cell.dayOfMonth}</Text>
              <View
                style={[
                  styles.dot,
                  cell.completed ? styles.dotDone : styles.dotEmpty,
                  cell.streakDay && styles.dotStreakRing,
                ]}
              />
              {kind === 'count' && target > 1 && cell.dayMaxProgress > 0 ? (
                <Text style={styles.tapBadge}>
                  {cell.dayMaxProgress}/{target}
                </Text>
              ) : cell.tapCount > 1 ? (
                <Text style={styles.tapBadge}>×{cell.tapCount}</Text>
              ) : (
                <View style={styles.tapBadgePlaceholder} />
              )}
            </View>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, styles.secondTitle]}>
        Saved log entries
      </Text>
      <Text style={styles.sectionHint}>
        {kind === 'count'
          ? 'Newest first. Each row is a day you logged progress; the value is your count toward the daily goal.'
          : 'Newest first. Each row is a day you marked this habit done.'}
      </Text>

      {progressDays.length === 0 ? (
        <Text style={styles.emptyList}>No check-ins yet</Text>
      ) : (
        <View style={styles.list}>
          {progressDays.map((row) => (
            <View key={row.dateYyyyMmDd} style={styles.listRow}>
              <Text style={styles.listDate}>
                {formatYyyyMmDdDateOnly(row.dateYyyyMmDd)}
              </Text>
              <Text style={styles.listMeta} numberOfLines={2}>
                {row.detail}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
