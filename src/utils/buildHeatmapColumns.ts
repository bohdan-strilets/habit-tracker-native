import { APP_LOCALE } from '@constants/locale';

import type { HeatmapDay } from '@/types/heatmapCalendar';

import {
  addLocalDays,
  endOfLocalWeekSunday,
  startOfLocalDay,
  startOfLocalWeekMonday,
  toLocalDateKey,
} from './heatmapCalendarDates';

export type HeatmapColumnModel = {
  weekKey: string;
  monthLabel: string | null;
  cells: HeatmapCellModel[];
};

export type HeatmapCellModel =
  | { kind: 'pad' }
  | { kind: 'day'; dateKey: string; completed: number; total: number };

const MONTH_FMT = new Intl.DateTimeFormat(APP_LOCALE, { month: 'short' });

function monthLabelForMonday(monday: Date, prevMonday: Date | null): string | null {
  if (!prevMonday) {
    return MONTH_FMT.format(monday);
  }
  if (monday.getMonth() !== prevMonday.getMonth()) {
    return MONTH_FMT.format(monday);
  }
  return null;
}

/**
 * Builds week columns (Mon→Sun rows) for a sliding window ending at `rangeEnd` (local).
 * Pads with `pad` cells outside `[rangeStart, rangeEnd]`.
 */
export function buildHeatmapColumns(
  dataByDate: ReadonlyMap<string, HeatmapDay>,
  rangeStart: Date,
  rangeEnd: Date,
): HeatmapColumnModel[] {
  const start = startOfLocalDay(rangeStart);
  const end = startOfLocalDay(rangeEnd);
  if (start.getTime() > end.getTime()) {
    return [];
  }

  const gridStartMonday = startOfLocalWeekMonday(start);
  const gridEndSunday = endOfLocalWeekSunday(end);

  const columns: HeatmapColumnModel[] = [];
  let monday = gridStartMonday;
  let prevMonday: Date | null = null;

  while (monday.getTime() <= gridEndSunday.getTime()) {
    const weekKey = toLocalDateKey(monday);
    const monthLabel = monthLabelForMonday(monday, prevMonday);
    const cells: HeatmapCellModel[] = [];

    for (let row = 0; row < 7; row += 1) {
      const cellDate = addLocalDays(monday, row);
      const t = cellDate.getTime();
      if (t < start.getTime() || t > end.getTime()) {
        cells.push({ kind: 'pad' });
        continue;
      }

      const dateKey = toLocalDateKey(cellDate);
      const rowData = dataByDate.get(dateKey);
      cells.push({
        kind: 'day',
        dateKey,
        completed: rowData?.completed ?? 0,
        total: rowData?.total ?? 0,
      });
    }

    columns.push({ weekKey, monthLabel, cells });
    prevMonday = monday;
    monday = addLocalDays(monday, 7);
  }

  return columns;
}
