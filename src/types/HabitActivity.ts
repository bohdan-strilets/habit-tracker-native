export type ProgressDaySummary = {
  dateYyyyMmDd: string;
  tapCount: number;
};

export type DayTimelineCell = {
  dateYyyyMmDd: string;
  weekdayShort: string;
  dayOfMonth: number;
  completed: boolean;
  tapCount: number;
  streakDay: boolean;
};
