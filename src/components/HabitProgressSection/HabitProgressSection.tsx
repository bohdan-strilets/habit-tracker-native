import { HABIT_DETAILS_TIMELINE_DAYS } from '@constants/habits';
import { getDayTimeline, getProgressDaysSummary } from '@domain/habitActivity';
import { useAppTheme } from '@theme';
import { formatYyyyMmDdDateOnly } from '@utils/date';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { createHabitProgressSectionStyles } from './HabitProgressSection.styles';
import type { HabitProgressSectionProps } from './HabitProgressSection.types';

export const HabitProgressSection = ({ habit }: HabitProgressSectionProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHabitProgressSectionStyles(theme.colors),
    [theme.colors],
  );

  const progressDays = useMemo(
    () => getProgressDaysSummary(habit),
    [habit, i18n.language],
  );
  const timeline = useMemo(
    () => getDayTimeline(habit, HABIT_DETAILS_TIMELINE_DAYS),
    [habit, i18n.language],
  );

  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>
        {t('habitProgress.lastDays', { days: HABIT_DETAILS_TIMELINE_DAYS })}
      </Text>
      <Text style={styles.sectionHint}>
        {t('habitProgress.hint')}
        {kind === 'count' && target > 1 ? t('habitProgress.hintCount') : ''}
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
                {isToday
                  ? t('habitProgress.today')
                  : cell.weekdayShort.replace(/\.$/, '')}
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
        {t('habitProgress.savedLogs')}
      </Text>
      <Text style={styles.sectionHint}>
        {kind === 'count'
          ? t('habitProgress.hintLogsCount')
          : t('habitProgress.hintLogsBool')}
      </Text>

      {progressDays.length === 0 ? (
        <Text style={styles.emptyList}>{t('habitProgress.noCheckIns')}</Text>
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
