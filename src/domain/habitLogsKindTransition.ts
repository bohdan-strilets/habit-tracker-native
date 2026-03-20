import type { Habit, HabitKind, Log } from '../types/Habit';
import { normalizeToYyyyMmDd } from '../utils/date';
import { getSatisfiedDateKeys, isHabitSatisfiedOnDate } from './habit';

function logSortKey(dateStr: string): string {
  return normalizeToYyyyMmDd(dateStr) ?? dateStr;
}

function sortLogsByDate(logs: Log[]): Log[] {
  return [...logs].sort((a, b) =>
    logSortKey(a.date).localeCompare(logSortKey(b.date)),
  );
}

export function normalizeLogsAfterKindChange(
  habitBefore: Habit,
  newKind: HabitKind,
  newTarget: number,
): Log[] {
  const oldKind = habitBefore.kind ?? 'boolean';
  if (oldKind === newKind) return habitBefore.logs;

  const target = Math.max(1, newTarget);

  if (oldKind === 'boolean' && newKind === 'count') {
    const satisfied = getSatisfiedDateKeys(habitBefore);
    const out: Log[] = [];
    for (const key of satisfied) {
      out.push({
        date: key,
        completed: true,
        progress: target,
      });
    }
    return sortLogsByDate(out);
  }

  if (oldKind === 'count' && newKind === 'boolean') {
    const keys = new Set<string>();
    for (const l of habitBefore.logs) {
      const k = normalizeToYyyyMmDd(l.date);
      if (k) keys.add(k);
    }
    const out: Log[] = [];
    for (const key of keys) {
      if (isHabitSatisfiedOnDate(habitBefore, key)) {
        out.push({ date: key, completed: true });
      }
    }
    return sortLogsByDate(out);
  }

  return habitBefore.logs;
}
