import type { HomeScreenHabit } from '@/types/homeScreenHabit';

export type HomeHabitSwipeRowProps = {
  habit: HomeScreenHabit;
  onOpenDetails: (id: string) => void;
  onEditHabit: (id: string) => void;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
};
