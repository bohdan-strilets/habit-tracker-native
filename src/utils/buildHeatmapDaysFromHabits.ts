import { getSatisfiedDateKeys } from '@domain/habit';
import { normalizeToYyyyMmDd } from '@utils/date';

import type { Habit } from '@/types/Habit';
import type { HeatmapDay } from '@/types/heatmapCalendar';

import { addLocalDays, startOfLocalDay, toLocalDateKey } from './heatmapCalendarDates';

type HabitHeatmapMeta = {
  satisfied: Set<string>;
  createdKey: string | null;
};

function habitHeatmapMeta(habit: Habit): HabitHeatmapMeta {
  const createdKey =
    habit.createdAt != null ? normalizeToYyyyMmDd(habit.createdAt) : null;
  return {
    satisfied: getSatisfiedDateKeys(habit),
    createdKey,
  };
}

function habitCountsForDay(
  metas: readonly HabitHeatmapMeta[],
  dateKey: string,
): { completed: number; total: number } {
  let total = 0;
  let completed = 0;
  for (let i = 0; i < metas.length; i += 1) {
    const { satisfied, createdKey } = metas[i];
    if (createdKey && dateKey.localeCompare(createdKey) < 0) {
      continue;
    }
    total += 1;
    if (satisfied.has(dateKey)) {
      completed += 1;
    }
  }
  return { completed, total };
}

/**
 * One row per local calendar day in [endDate − (windowDays−1), endDate].
 * `total` / `completed` match home semantics: every habit counts each day after `createdAt`.
 */
export function buildHeatmapDaysFromHabits(
  habits: readonly Habit[],
  endDate: Date,
  windowDays: number,
): HeatmapDay[] {
  const rangeEnd = startOfLocalDay(endDate);
  const rangeStart = addLocalDays(rangeEnd, -(Math.max(1, windowDays) - 1));

  const metas = habits.map(habitHeatmapMeta);
  const out: HeatmapDay[] = [];

  let cursor = rangeStart;
  while (cursor.getTime() <= rangeEnd.getTime()) {
    const dateKey = toLocalDateKey(cursor);
    const { completed, total } = habitCountsForDay(metas, dateKey);
    out.push({ date: dateKey, completed, total });
    cursor = addLocalDays(cursor, 1);
  }

  return out;
}
