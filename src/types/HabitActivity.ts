export type ProgressDaySummary = {
  dateYyyyMmDd: string;
  /** Human-readable status for that day (progress or check-in summary) */
  detail: string;
};

export type DayTimelineCell = {
  dateYyyyMmDd: string;
  weekdayShort: string;
  dayOfMonth: number;
  completed: boolean;
  tapCount: number;
  /** Best `progress` logged that calendar day (count habits); 0 otherwise */
  dayMaxProgress: number;
  streakDay: boolean;
};
