import { Habit } from './Habit';

export type HabitStore = {
  habits: Habit[];

  add: (habit: Habit) => void;
  remove: (id: string) => void;
  clean: () => void;
};
