import { DEFAULT_HABIT_ICON } from '@constants/habitFormOptions';
import { isHabitSatisfiedOnDate } from '@domain/habit';
import { normalizeToYyyyMmDd } from '@utils/date';

import type { Habit } from '@/types/Habit';

export type DayDetailHabitRow = {
  id: string;
  title: string;
  completed: boolean;
  icon: string;
  accentColor?: string;
};

/**
 * Habits that existed on `dateKey` (same rules as the home heatmap) with completion for that day.
 */
export function getDayDetailHabitRows(
  habits: readonly Habit[],
  dateKey: string,
): {
  rows: DayDetailHabitRow[];
  completed: number;
  total: number;
  /** Rounded 0–100; 0 when `total` is 0. */
  percent: number;
} {
  const rows: DayDetailHabitRow[] = [];

  for (const h of habits) {
    const createdKey =
      h.createdAt != null ? normalizeToYyyyMmDd(h.createdAt) : null;
    if (createdKey && dateKey.localeCompare(createdKey) < 0) {
      continue;
    }
    rows.push({
      id: String(h.id),
      title: h.title,
      completed: isHabitSatisfiedOnDate(h, dateKey),
      icon: h.icon?.trim() || DEFAULT_HABIT_ICON,
      accentColor: h.accentColor,
    });
  }

  rows.sort((a, b) => a.title.localeCompare(b.title));

  const completed = rows.filter((r) => r.completed).length;
  const total = rows.length;
  const percent =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  return { rows, completed, total, percent };
}
