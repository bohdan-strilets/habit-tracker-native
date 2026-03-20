import { Habit } from './Habit';

export type HabitStore = {
  habits: Habit[];
  isLoading: boolean;
  hydrationError: string | null;

  add: (habit: Habit) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clean: () => void;
  retryHydration: () => void;
};
