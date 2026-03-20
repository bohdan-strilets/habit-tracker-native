import type { HomeScreenHabitSection } from '../../types/homeScreen';
import type { HomeScreenHabit } from '../../types/homeScreenHabit';

export type HomeListRow =
  | { kind: 'header'; key: string; title: string }
  | { kind: 'habit'; key: string; habit: HomeScreenHabit };

export type HomeHabitsListProps = {
  sections: HomeScreenHabitSection[];
  habitsSnapshot: unknown;
  onOpenDetails: (id: string) => void;
  onEditHabit: (id: string) => void;
  onToggleDone: (id: string) => void;
  onDeleteHabit: (id: string) => void;
};
