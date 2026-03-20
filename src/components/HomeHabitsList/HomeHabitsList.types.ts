import type { HomeScreenHabitSection } from '../../types/homeScreen';
import type { HomeScreenHabit } from '../../types/homeScreenHabit';

export type HomeHabitsListProps = {
  sections: HomeScreenHabitSection[];
  /** Pass store habits so the list re-renders when logs change */
  habitsSnapshot: unknown;
  onOpenDetails: (id: string) => void;
  onToggleDone: (id: string) => void;
};
