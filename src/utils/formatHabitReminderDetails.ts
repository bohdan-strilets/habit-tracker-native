import { REMINDER_WEEKDAY_OPTIONS } from '@constants/habitReminders';

import type { Habit } from '@/types/Habit';

import {
  formatReminderClock24,
  normalizeReminderWeekdays,
  parseReminderTimesFromStored,
} from './habitReminderTimes';

function weekdayLabels(values: number[]): string {
  const map = new Map(
    REMINDER_WEEKDAY_OPTIONS.map((o) => [o.value, o.label]),
  );
  return values.map((v) => map.get(v) ?? String(v)).join(', ');
}

export function formatHabitReminderDetailsText(habit: Habit): string[] | null {
  const r = habit.reminder;
  if (!r?.enabled) {
    return null;
  }
  const times = parseReminderTimesFromStored(r);
  if (times.length === 0) {
    return null;
  }

  const lines: string[] = [];
  const timeStr = times
    .map((t) => formatReminderClock24(t.hour, t.minute))
    .join(', ');
  lines.push(`Times: ${timeStr} (device local time)`);

  const freq = habit.frequency ?? 'daily';
  if (freq === 'weekly') {
    const wd = normalizeReminderWeekdays(r.weekdays ?? []);
    if (wd.length === 7) {
      lines.push('Days: every day');
    } else if (wd.length > 0) {
      lines.push(`Days: ${weekdayLabels(wd)}`);
    } else {
      lines.push('Days: every day');
    }
  } else {
    lines.push('Repeats: every day');
  }

  return lines;
}
