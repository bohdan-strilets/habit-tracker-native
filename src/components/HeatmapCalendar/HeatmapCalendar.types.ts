import type { HeatmapDay } from '@/types/heatmapCalendar';

export type { HeatmapDay } from '@/types/heatmapCalendar';

export type HeatmapCalendarProps = {
  data: HeatmapDay[];
  /** Inclusive end of the visible window (local date). Defaults to today. */
  endDate?: Date;
  /** Days to include counting back from `endDate` (inclusive). Default 90. */
  windowDays?: number;
  /** Called when the user taps a day cell (YYYY-MM-DD). */
  onDayPress?: (dateKey: string) => void;
};
