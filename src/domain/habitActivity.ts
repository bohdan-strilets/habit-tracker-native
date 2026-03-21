import i18n from '@i18n/i18n';
import { localeTagForAppLanguage } from '@i18n/localeTag';
import {
  dateToLocalParts,
  localPartsToYyyyMmDd,
  normalizeToYyyyMmDd,
} from '@utils/date';

import type { Habit } from '@/types/Habit';
import type { AppLanguage } from '@/types/Language';
import type {
  DayTimelineCell,
  ProgressDaySummary,
} from '@/types/HabitActivity';

import { getStreakDateKeys, isHabitSatisfiedOnDate } from './habit';

export const getProgressDaysSummary = (habit: Habit): ProgressDaySummary[] => {
  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);

  const byDay = new Map<string, typeof habit.logs>();
  for (const log of habit.logs) {
    const key = normalizeToYyyyMmDd(log.date);
    if (!key) continue;
    const arr = byDay.get(key) ?? [];
    arr.push(log);
    byDay.set(key, arr);
  }

  const rows: ProgressDaySummary[] = [];
  for (const [dateYyyyMmDd, dayLogs] of byDay) {
    if (kind === 'count') {
      const maxP = Math.max(...dayLogs.map((l) => l.progress ?? 0));
      const satisfied = maxP >= target;
      rows.push({
        dateYyyyMmDd,
        detail: satisfied
          ? i18n.t('habitActivity.countDone', { maxP, target })
          : i18n.t('habitActivity.countPartial', { maxP, target }),
      });
    } else {
      const n = dayLogs.length;
      rows.push({
        dateYyyyMmDd,
        detail:
          n === 1
            ? i18n.t('habitActivity.logDone')
            : i18n.t('habitActivity.logCheckIns', { count: n }),
      });
    }
  }

  return rows.sort((a, b) => b.dateYyyyMmDd.localeCompare(a.dateYyyyMmDd));
};

export const getDayTimeline = (
  habit: Habit,
  daysBack: number,
): DayTimelineCell[] => {
  const safeDays = Math.max(1, Math.min(daysBack, 62));
  const streakKeys = getStreakDateKeys(habit);
  const tapByDay = new Map<string, number>();
  const maxProgressByDay = new Map<string, number>();

  for (const log of habit.logs) {
    const key = normalizeToYyyyMmDd(log.date);
    if (!key) continue;
    tapByDay.set(key, (tapByDay.get(key) ?? 0) + 1);
    const p = log.progress ?? 0;
    maxProgressByDay.set(key, Math.max(maxProgressByDay.get(key) ?? 0, p));
  }

  const out: DayTimelineCell[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const locale = localeTagForAppLanguage(i18n.language as AppLanguage);

  for (let offset = safeDays - 1; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    const key = localPartsToYyyyMmDd(dateToLocalParts(d));
    const tapCount = tapByDay.get(key) ?? 0;
    const dayMaxProgress = maxProgressByDay.get(key) ?? 0;

    out.push({
      dateYyyyMmDd: key,
      weekdayShort: d.toLocaleDateString(locale, { weekday: 'short' }),
      dayOfMonth: d.getDate(),
      completed: isHabitSatisfiedOnDate(habit, key),
      tapCount,
      dayMaxProgress,
      streakDay: streakKeys.has(key),
    });
  }

  return out;
};
