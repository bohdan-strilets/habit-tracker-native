import i18n from '@i18n/i18n';

import type { Habit } from '@/types/Habit';

import {
  formatReminderClock24,
  normalizeReminderWeekdays,
  parseReminderTimesFromStored,
} from './habitReminderTimes';

function weekdayLabels(values: number[]): string {
  return values
    .map((v) => i18n.t(`habitForm.weekdays.${String(v)}`))
    .join(', ');
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
  lines.push(i18n.t('reminderDetails.times', { times: timeStr }));

  const freq = habit.frequency ?? 'daily';
  if (freq === 'weekly') {
    const wd = normalizeReminderWeekdays(r.weekdays ?? []);
    if (wd.length === 7) {
      lines.push(i18n.t('reminderDetails.daysEvery'));
    } else if (wd.length > 0) {
      lines.push(i18n.t('reminderDetails.daysList', { days: weekdayLabels(wd) }));
    } else {
      lines.push(i18n.t('reminderDetails.daysEvery'));
    }
  } else {
    lines.push(i18n.t('reminderDetails.repeatsDaily'));
  }

  return lines;
}
