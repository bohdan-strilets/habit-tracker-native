import { getStreak, getTodayStatus } from '@domain/habit';

import type { Habit } from '@/types/Habit';
import type { HomeScreenHabit } from '@/types/homeScreenHabit';

import { normalizeToYyyyMmDd } from './date';
import { getCurrentLocalDateString } from './getCurrentLocalDateString';
import { getHabitCategoryLabel } from './getHabitCategoryLabel';

const DEFAULT_ICON = '✨';

export const habitToHomeScreenHabit = (habit: Habit): HomeScreenHabit => {
  const kind = habit.kind ?? 'boolean';
  const target = Math.max(1, habit.target ?? 1);
  const today = getCurrentLocalDateString();
  const todayLogs = habit.logs.filter(
    (l) => normalizeToYyyyMmDd(l.date) === today,
  );
  const currentValue =
    kind === 'count'
      ? todayLogs.length > 0
        ? Math.max(...todayLogs.map((l) => l.progress ?? 0))
        : 0
      : undefined;

  const notesTrim = habit.notes?.trim();

  return {
    id: habit.id,
    title: habit.title,
    icon: habit.icon?.trim() || DEFAULT_ICON,
    accentColor: habit.accentColor,
    categoryLabel: habit.category
      ? getHabitCategoryLabel(habit.category)
      : undefined,
    notes: notesTrim && notesTrim.length > 0 ? notesTrim : undefined,
    frequency: habit.frequency,
    type: kind,
    target: kind === 'count' ? target : undefined,
    completedToday: getTodayStatus(habit),
    currentValue,
    streak: getStreak(habit),
  };
};
