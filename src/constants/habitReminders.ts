export const HABIT_REMINDER_DATA_TYPE = 'habit-reminder';

export const HABIT_REMINDERS_ANDROID_CHANNEL_ID = 'habit-reminders';

/** Default hour (0–23) when the user turns reminders on. */
export const DEFAULT_REMINDER_HOUR = 9;

export const DEFAULT_REMINDER_MINUTE = 0;

export const MAX_REMINDER_TIMES_PER_HABIT = 6;

/** Expo weekly trigger: 1 = Sunday … 7 = Saturday */
export const ALL_REMINDER_WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const;

export const REMINDER_WEEKDAY_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: 'Sun' },
  { value: 2, label: 'Mon' },
  { value: 3, label: 'Tue' },
  { value: 4, label: 'Wed' },
  { value: 5, label: 'Thu' },
  { value: 6, label: 'Fri' },
  { value: 7, label: 'Sat' },
];
