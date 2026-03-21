import type { HabitCategoryId } from './Habit';

export type HabitAccentPreset = { hex: string; labelKey: string };

export type HabitCategoryOption = {
  id: HabitCategoryId;
  emoji: string;
};
