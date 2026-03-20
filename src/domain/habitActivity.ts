import type {
  DayTimelineCell,
  ProgressDaySummary,
} from '../types/HabitActivity';
import type { Log } from '../types/Habit';
import { APP_LOCALE } from '../constants/locale';
import {
  dateToLocalParts,
  localPartsToYyyyMmDd,
  normalizeToYyyyMmDd,
} from '../utils/date';
import { getStreakDateKeys } from './habit';

export const getProgressDaysSummary = (logs: Log[]): ProgressDaySummary[] => {
  const map = new Map<string, number>();

  for (const log of logs) {
    if (!log.completed) continue;
    const key = normalizeToYyyyMmDd(log.date);
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return [...map.entries()]
    .map(([dateYyyyMmDd, tapCount]) => ({ dateYyyyMmDd, tapCount }))
    .sort((a, b) => b.dateYyyyMmDd.localeCompare(a.dateYyyyMmDd));
};

export const getDayTimeline = (
  logs: Log[],
  daysBack: number,
): DayTimelineCell[] => {
  const safeDays = Math.max(1, Math.min(daysBack, 62));
  const streakKeys = getStreakDateKeys(logs);
  const tapByDay = new Map<string, number>();

  for (const log of logs) {
    if (!log.completed) continue;
    const key = normalizeToYyyyMmDd(log.date);
    if (!key) continue;
    tapByDay.set(key, (tapByDay.get(key) ?? 0) + 1);
  }

  const out: DayTimelineCell[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = safeDays - 1; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    const key = localPartsToYyyyMmDd(dateToLocalParts(d));
    const tapCount = tapByDay.get(key) ?? 0;

    out.push({
      dateYyyyMmDd: key,
      weekdayShort: d.toLocaleDateString(APP_LOCALE, { weekday: 'short' }),
      dayOfMonth: d.getDate(),
      completed: tapCount > 0,
      tapCount,
      streakDay: streakKeys.has(key),
    });
  }

  return out;
};
