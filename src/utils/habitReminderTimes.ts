import {
  ALL_REMINDER_WEEKDAYS,
  DEFAULT_REMINDER_HOUR,
  DEFAULT_REMINDER_MINUTE,
  MAX_REMINDER_TIMES_PER_HABIT,
} from '@constants/habitReminders';

import type {
  Habit,
  HabitFrequency,
  HabitReminderSettings,
  HabitReminderTime,
} from '@/types/Habit';

type StoredReminder = {
  enabled?: boolean;
  times?: unknown;
  hours?: unknown;
  weekdays?: unknown;
};

export function normalizeHabitReminderTimes(
  times: HabitReminderTime[],
): HabitReminderTime[] {
  const seen = new Set<string>();
  const out: HabitReminderTime[] = [];
  for (const t of times) {
    const h = Math.min(23, Math.max(0, Math.round(Number(t.hour))));
    const m = Math.min(59, Math.max(0, Math.round(Number(t.minute))));
    const key = `${h}:${m}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push({ hour: h, minute: m });
  }
  out.sort((a, b) => a.hour - b.hour || a.minute - b.minute);
  return out.slice(0, MAX_REMINDER_TIMES_PER_HABIT);
}

export function normalizeReminderWeekdays(days: number[]): number[] {
  return [
    ...new Set(
      days.filter((d) => Number.isInteger(d) && d >= 1 && d <= 7),
    ),
  ].sort((a, b) => a - b);
}

/** Supports legacy persisted `hours: number[]`. */
export function parseReminderTimesFromStored(
  reminder: Habit['reminder'] | undefined,
): HabitReminderTime[] {
  if (!reminder) {
    return [];
  }
  const raw = reminder as StoredReminder;
  if (Array.isArray(raw.times) && raw.times.length > 0) {
    const mapped: HabitReminderTime[] = [];
    for (const item of raw.times) {
      if (item && typeof item === 'object' && 'hour' in item) {
        const o = item as { hour: unknown; minute?: unknown };
        mapped.push({
          hour: Number(o.hour),
          minute: Number(o.minute ?? 0),
        });
      }
    }
    return normalizeHabitReminderTimes(mapped);
  }
  if (Array.isArray(raw.hours) && raw.hours.length > 0) {
    return normalizeHabitReminderTimes(
      raw.hours.map((h) => ({
        hour: Number(h),
        minute: 0,
      })),
    );
  }
  return [];
}

export function parseReminderWeekdaysFromStored(
  reminder: Habit['reminder'] | undefined,
  habitFrequency: HabitFrequency,
): number[] {
  if (habitFrequency !== 'weekly') {
    return [...ALL_REMINDER_WEEKDAYS];
  }
  if (!reminder) {
    return [...ALL_REMINDER_WEEKDAYS];
  }
  const raw = reminder as StoredReminder;
  if (Array.isArray(raw.weekdays) && raw.weekdays.length > 0) {
    return normalizeReminderWeekdays(
      raw.weekdays.map((d) => Number(d)),
    );
  }
  return [...ALL_REMINDER_WEEKDAYS];
}

export function buildHabitReminderForSave(options: {
  enabled: boolean;
  times: HabitReminderTime[];
  frequency: HabitFrequency;
  weekdays: number[];
}): HabitReminderSettings {
  const { enabled, times, frequency, weekdays } = options;
  const normalizedTimes = normalizeHabitReminderTimes(times);
  const timesWhenEnabled =
    normalizedTimes.length > 0
      ? normalizedTimes
      : [{ hour: DEFAULT_REMINDER_HOUR, minute: DEFAULT_REMINDER_MINUTE }];

  const base: HabitReminderSettings = {
    enabled,
    times: enabled ? timesWhenEnabled : normalizedTimes,
  };

  if (frequency === 'weekly') {
    const wd = normalizeReminderWeekdays(weekdays);
    base.weekdays =
      wd.length > 0 ? wd : [...ALL_REMINDER_WEEKDAYS];
  }

  return base;
}

export function formatReminderClock24(hour: number, minute: number): string {
  const h = Math.min(23, Math.max(0, hour));
  const m = Math.min(59, Math.max(0, minute));
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Form row: keep raw strings while typing; normalize on blur / save. */
export type HabitReminderFieldRow = {
  hourStr: string;
  minuteStr: string;
};

export function defaultReminderFields(): HabitReminderFieldRow[] {
  return [
    {
      hourStr: String(DEFAULT_REMINDER_HOUR).padStart(2, '0'),
      minuteStr: String(DEFAULT_REMINDER_MINUTE).padStart(2, '0'),
    },
  ];
}

export function timesToReminderFields(
  times: HabitReminderTime[],
): HabitReminderFieldRow[] {
  return times.map((t) => ({
    hourStr: String(Math.min(23, Math.max(0, Math.round(t.hour)))).padStart(
      2,
      '0',
    ),
    minuteStr: String(Math.min(59, Math.max(0, Math.round(t.minute)))).padStart(
      2,
      '0',
    ),
  }));
}

export function sanitizeReminderTimeDigitInput(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 2);
}

export function normalizeReminderHourStrOnBlur(raw: string): string {
  const t = sanitizeReminderTimeDigitInput(raw);
  if (t === '') {
    return String(DEFAULT_REMINDER_HOUR).padStart(2, '0');
  }
  const n = Math.min(23, Math.max(0, parseInt(t, 10) || 0));
  return String(n).padStart(2, '0');
}

export function normalizeReminderMinuteStrOnBlur(raw: string): string {
  const t = sanitizeReminderTimeDigitInput(raw);
  if (t === '') {
    return String(DEFAULT_REMINDER_MINUTE).padStart(2, '0');
  }
  const n = Math.min(59, Math.max(0, parseInt(t, 10) || 0));
  return String(n).padStart(2, '0');
}

function hourStrToNumber(s: string): number {
  const t = sanitizeReminderTimeDigitInput(s);
  if (t === '') {
    return DEFAULT_REMINDER_HOUR;
  }
  return Math.min(23, Math.max(0, parseInt(t, 10) || 0));
}

function minuteStrToNumber(s: string): number {
  const t = sanitizeReminderTimeDigitInput(s);
  if (t === '') {
    return DEFAULT_REMINDER_MINUTE;
  }
  return Math.min(59, Math.max(0, parseInt(t, 10) || 0));
}

export function reminderFieldsToTimes(
  rows: HabitReminderFieldRow[],
): HabitReminderTime[] {
  return normalizeHabitReminderTimes(
    rows.map((r) => ({
      hour: hourStrToNumber(r.hourStr),
      minute: minuteStrToNumber(r.minuteStr),
    })),
  );
}

/** Use before save so values are valid even if the user never blurred a field. */
export function normalizeReminderFieldsForCommit(
  rows: HabitReminderFieldRow[],
): HabitReminderFieldRow[] {
  return rows.map((r) => ({
    hourStr: normalizeReminderHourStrOnBlur(r.hourStr),
    minuteStr: normalizeReminderMinuteStrOnBlur(r.minuteStr),
  }));
}
