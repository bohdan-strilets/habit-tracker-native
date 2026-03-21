import type { HomeScreenHabit } from './homeScreenHabit';

export type HomeScreenHabitSection = {
  /** Stable id for logic; `title` is localized. */
  key: 'active' | 'completed';
  title: string;
  data: HomeScreenHabit[];
};
