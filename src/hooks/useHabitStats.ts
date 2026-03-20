import { useMemo } from 'react';
import { getCompletionRate, getStreak, getTodayStatus } from '../domain/habit';
import { Log } from '../types/Habit';

const EMPTY_LOGS: Log[] = [];

export type HabitStats = {
  isDoneToday: boolean;
  streak: number;
  completionRate: number;
};

export const useHabitStats = (logs: Log[] | undefined): HabitStats => {
  const safeLogs = logs ?? EMPTY_LOGS;

  return useMemo(
    () => ({
      isDoneToday: getTodayStatus(safeLogs),
      streak: getStreak(safeLogs),
      completionRate: getCompletionRate(safeLogs),
    }),
    [safeLogs],
  );
};
