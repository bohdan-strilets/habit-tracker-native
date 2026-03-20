import type { Habit } from '../../types/Habit';

export type HabitSummaryCardProps = {
  habit: Habit;
  onPress: () => void;
  variant?: 'elevated' | 'plain';
};
