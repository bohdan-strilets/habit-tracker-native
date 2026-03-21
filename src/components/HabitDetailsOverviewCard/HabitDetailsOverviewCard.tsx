import { Card } from '@components/Card';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { ProgressBar } from '@components/ProgressBar';
import { useAppTheme } from '@theme';
import { formatYyyyMmDdLong, normalizeToYyyyMmDd } from '@utils/date';
import { formatHabitReminderDetailsText } from '@utils/formatHabitReminderDetails';
import { getCurrentLocalDateString } from '@utils/getCurrentLocalDateString';
import { getHabitCategoryLabel } from '@utils/getHabitCategoryLabel';
import { hexToRgba } from '@utils/hexToRgba';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

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
  const styles = useMemo(
    () => createHabitDetailsOverviewCardStyles(theme.colors),
    [theme.colors],
  );
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );

  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);
  const todayKey = getCurrentLocalDateString();
  const todayLogs = habit.logs.filter(
    (l) => normalizeToYyyyMmDd(l.date) === todayKey,
  );
  const todayCount =
    kind === 'count'
      ? todayLogs.length > 0
        ? Math.max(...todayLogs.map((l) => l.progress ?? 0))
        : 0
      : 0;
  const countProgress =
    kind === 'count' && target > 0 ? todayCount / target : 0;

  const categoryLabel = habit.category
    ? getHabitCategoryLabel(habit.category)
    : '—';
  const freqLabel =
    habit.frequency === 'weekly'
      ? 'Weekly'
      : habit.frequency === 'daily'
        ? 'Daily'
        : 'Daily';

  const trackingLine =
    kind === 'count'
      ? `Number goal · ${target} per day`
      : 'Checklist · once per day';

  const heroShellStyle = useMemo(() => {
    const hex = habit.accentColor?.trim();
    if (!hex) return undefined;
    return {
      backgroundColor: hexToRgba(hex, 0.1),
      borderWidth: 1,
      borderColor: hexToRgba(hex, 0.22),
    };
  }, [habit.accentColor]);

  const checkInsTotal = habit.logs.length;

  const reminderDetails = useMemo(
    () => formatHabitReminderDetailsText(habit),
    [habit],
  );

  return (
    <View style={styles.cardsColumn}>
      <Card>
        <View style={[styles.heroShell, heroShellStyle]}>
          <View style={styles.heroTop}>
            {habit.accentColor ? (
              <View
                style={[
                  styles.heroAccent,
                  { backgroundColor: habit.accentColor },
                ]}
              />
            ) : null}
            <Text style={styles.heroIcon}>{habit.icon ?? '✨'}</Text>
            <View style={styles.heroTextCol}>
              <Text style={styles.habitTitle}>{habit.title}</Text>
              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{categoryLabel}</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{freqLabel}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Animated.View style={[styles.statusBadge, badgeAnimatedStyle]}>
          <Animated.Text style={[styles.statusText, badgeTextAnimatedStyle]}>
            {isDoneToday
              ? kind === 'count'
                ? 'Goal met today'
                : 'Done today'
              : kind === 'count'
                ? 'Goal not met yet today'
                : 'Not done yet today'}
          </Animated.Text>
        </Animated.View>

        {kind === 'count' ? (
          <View style={styles.todayRow}>
            <Text style={styles.todayCaption}>
              Today · {todayCount} / {target}
            </Text>
            <ProgressBar
              progress={countProgress}
              accessibilityLabel={`Today ${todayCount} of ${target}`}
              accentColor={habit.accentColor?.trim()}
            />
          </View>
        ) : null}

        <Animated.View style={statPulseStyle}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completionRate}%</Text>
              <Text style={styles.statLabel}>Log completion</Text>
            </View>
          </View>
        </Animated.View>
      </Card>

      <Card>
        <Text style={shared.sectionHeading}>About</Text>

        <Text style={styles.blockTitle}>How you track it</Text>
        <Text style={styles.trackingValue}>{trackingLine}</Text>

        {habit.notes ? (
          <>
            <Text style={[styles.blockTitle, styles.blockTitleSpaced]}>
              Notes
            </Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{habit.notes}</Text>
            </View>
          </>
        ) : null}

        <Text style={[styles.blockTitle, styles.blockTitleSpaced]}>
          Notifications
        </Text>
        {reminderDetails ? (
          reminderDetails.map((line, i) => (
            <Text
              key={`reminder-line-${i}`}
              style={[
                styles.reminderLine,
                i === reminderDetails.length - 1 && styles.reminderLineLast,
              ]}
            >
              {line}
            </Text>
          ))
        ) : (
          <Text style={styles.reminderMuted}>
            Reminders are off, or no times are set. Turn them on under Edit
            habit.
          </Text>
        )}

        <View style={styles.metaFoot}>
          <View style={styles.metaRow}>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Created</Text>
              <Text style={styles.metaValue}>
                {habit.createdAt ? formatYyyyMmDdLong(habit.createdAt) : '—'}
              </Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Log entries</Text>
              <Text style={styles.metaValue}>{checkInsTotal}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
