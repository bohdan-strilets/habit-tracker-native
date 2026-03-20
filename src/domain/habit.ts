import { Log } from '../types/Habit';
import {
  dateToLocalParts,
  localPartsToYyyyMmDd,
  normalizeToYyyyMmDd,
  parseLocalDateParts,
  partsToLocalDate,
  toTodayYyyyMmDd,
} from '../utils/date';

export const getTodayStatus = (logs: Log[]): boolean => {
  const today = toTodayYyyyMmDd();
  return logs.some((l) => {
    if (!l.completed) return false;
    if (l.date === today) return true;
    return normalizeToYyyyMmDd(l.date) === today;
  });
};

export const getStreakDateKeys = (logs: Log[]): Set<string> => {
  const completedDatesNormalized = new Set(
    logs
      .filter((l) => l.completed)
      .map((l) => normalizeToYyyyMmDd(l.date))
      .filter((d): d is string => d !== null),
  );

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

export const getStreak = (logs: Log[]): number => getStreakDateKeys(logs).size;

export const getCompletionRate = (logs: Log[]): number => {
  if (logs.length === 0) return 0;

  const completed = logs.reduce((acc, l) => acc + (l.completed ? 1 : 0), 0);
  return Math.round((completed / logs.length) * 100);
};
