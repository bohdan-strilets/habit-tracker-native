import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { HABIT_DETAILS_TIMELINE_DAYS } from '../../constants/habits';
import {
  getDayTimeline,
  getProgressDaysSummary,
} from '../../domain/habitActivity';
import { formatYyyyMmDdDateOnly } from '../../utils/date';
import { formatTapLabel } from '../../utils/formatTapLabel';
import type { HabitProgressSectionProps } from './HabitProgressSection.types';
import { styles } from './HabitProgressSection.styles';

export const HabitProgressSection = ({ logs }: HabitProgressSectionProps) => {
  const progressDays = useMemo(() => getProgressDaysSummary(logs), [logs]);
  const timeline = useMemo(
    () => getDayTimeline(logs, HABIT_DETAILS_TIMELINE_DAYS),
    [logs],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Daily progress</Text>
      <Text style={styles.sectionHint}>
        Last {HABIT_DETAILS_TIMELINE_DAYS} days (left → right, today on the
        right): green — marked, gray — not marked. Ring — day in current streak.
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
              {cell.tapCount > 1 ? (
                <Text style={styles.tapBadge}>×{cell.tapCount}</Text>
              ) : (
                <View style={styles.tapBadgePlaceholder} />
              )}
            </View>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, styles.secondTitle]}>
        Days with check-ins
      </Text>
      <Text style={styles.sectionHint}>
        When you marked progress (number of taps per day).
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
              <Text style={styles.listMeta}>{formatTapLabel(row.tapCount)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
