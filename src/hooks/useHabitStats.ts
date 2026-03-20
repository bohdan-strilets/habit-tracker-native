import { useMemo } from 'react';
import { getCompletionRate, getStreak, getTodayStatus } from '../domain/habit';
import type { Habit } from '../types/Habit';

export type HabitStats = {
  isDoneToday: boolean;
  streak: number;
  completionRate: number;
};

export const useHabitStats = (habit: Habit | undefined): HabitStats => {
  return useMemo(() => {
    if (!habit) {
      return { isDoneToday: false, streak: 0, completionRate: 0 };
    }
    return {
      isDoneToday: getTodayStatus(habit),
      streak: getStreak(habit),
      completionRate: getCompletionRate(habit),
    };
  }, [habit, habit?.logs]);
};
