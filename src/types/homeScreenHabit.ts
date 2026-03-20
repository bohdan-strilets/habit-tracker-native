import type { HabitFrequency } from './Habit';

export type HomeScreenHabit = {
  id: string;
  title: string;
  icon: string;
  accentColor?: string;
  categoryLabel?: string;
  notes?: string;
  frequency?: HabitFrequency;
  type: 'boolean' | 'count';
  target?: number;
  completedToday: boolean;
  currentValue?: number;
  streak: number;
};
