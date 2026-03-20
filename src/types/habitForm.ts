import type { HabitCategoryId } from './Habit';

export type HabitAccentPreset = { hex: string; label: string };

export type HabitCategoryOption = {
  id: HabitCategoryId;
  label: string;
  emoji: string;
};
