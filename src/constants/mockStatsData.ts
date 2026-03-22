import { addLocalDays, startOfLocalDay, toLocalDateKey } from '@utils/heatmapCalendarDates';

import type { HeatmapDay } from '@/types/heatmapCalendar';

/**
 * Deterministic mock heatmap rows for previews / empty state demos.
 * Last `dayCount` local days ending today; `total` habits varies slightly by weekday.
 */
export function generateMockHeatmapDays(dayCount: number): HeatmapDay[] {
  const end = startOfLocalDay(new Date());
  const start = addLocalDays(end, -(Math.max(1, dayCount) - 1));

  const out: HeatmapDay[] = [];
  let cursor = start;
  let i = 0;
  while (cursor.getTime() <= end.getTime()) {
    const dateKey = toLocalDateKey(cursor);
    const dow = cursor.getDay();
    const total = 4 + (dow % 3);
    const seed = (i * 17 + dow * 3) % 10;
    const completed =
      seed < 2 ? 0 : Math.min(total, seed >= 8 ? total : total - (seed % 2));

    out.push({ date: dateKey, completed, total });
    cursor = addLocalDays(cursor, 1);
    i += 1;
  }

  return out;
}

/** 90 days of mock data for the stats screen when there are no habits yet. */
export const MOCK_STATS_HEATMAP_DAYS: HeatmapDay[] =
  generateMockHeatmapDays(90);
