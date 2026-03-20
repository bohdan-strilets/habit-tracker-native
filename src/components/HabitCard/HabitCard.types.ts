import type { HomeScreenHabit } from '../../types/homeScreenHabit';

export type HabitCardProps = {
  habit: HomeScreenHabit;
  onOpenDetails: (id: string) => void;
  onToggleDone: (id: string) => void;
};
