import type { Habit } from '../types/Habit';
import {
  dateToLocalParts,
  localPartsToYyyyMmDd,
  normalizeToYyyyMmDd,
  parseLocalDateParts,
  partsToLocalDate,
  toTodayYyyyMmDd,
} from '../utils/date';

export const isHabitSatisfiedOnDate = (
  habit: Habit,
  dateKey: string,
): boolean => {
  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);
  const dayLogs = habit.logs.filter(
    (l) => normalizeToYyyyMmDd(l.date) === dateKey,
  );
  if (dayLogs.length === 0) return false;
  if (kind === 'boolean') {
    return dayLogs.some((l) => l.completed);
  }
  const maxProgress = Math.max(...dayLogs.map((l) => l.progress ?? 0));
  return maxProgress >= target;
};

export const getSatisfiedDateKeys = (habit: Habit): Set<string> => {
  const keys = new Set<string>();
  for (const log of habit.logs) {
    const k = normalizeToYyyyMmDd(log.date);
    if (k) keys.add(k);
  }
  const satisfied = new Set<string>();
  for (const d of keys) {
    if (isHabitSatisfiedOnDate(habit, d)) satisfied.add(d);
  }
  return satisfied;
};

export const getTodayStatus = (habit: Habit): boolean =>
  isHabitSatisfiedOnDate(habit, toTodayYyyyMmDd());

export const getStreakDateKeys = (habit: Habit): Set<string> => {
  const completedDatesNormalized = getSatisfiedDateKeys(habit);
  if (completedDatesNormalized.size === 0) return new Set();

  const sortedDesc = [...completedDatesNormalized].sort((a, b) =>
    b.localeCompare(a),
  );
  const latest = sortedDesc[0];

  const latestParts = parseLocalDateParts(latest);
  if (!latestParts) return new Set();

  const keys = new Set<string>();
  let cursor = partsToLocalDate(latestParts);

  while (true) {
    const key = localPartsToYyyyMmDd(dateToLocalParts(cursor));
    if (!completedDatesNormalized.has(key)) break;

    keys.add(key);
    cursor.setDate(cursor.getDate() - 1);
  }

  return keys;
};

export const getStreak = (habit: Habit): number => getStreakDateKeys(habit).size;

export const getCompletionRate = (habit: Habit): number => {
  const logs = habit.logs;
  if (logs.length === 0) return 0;

  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);

  let sum = 0;
  for (const l of logs) {
    if (kind === 'count') {
      const raw = l.progress ?? (l.completed ? target : 0);
      sum += Math.min(1, raw / target);
    } else {
      sum += l.completed ? 1 : 0;
    }
  }

  return Math.round((sum / logs.length) * 100);
};
