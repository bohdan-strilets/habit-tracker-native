import { create } from 'zustand';
import { HabitStore } from '../types/HabitStore';

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],

  add: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),

  remove: (id) =>
    set((state) => ({
      habits: state.habits.filter((item) => item.id !== id),
    })),

  clean: () =>
    set(() => ({
      habits: [],
    })),
}));
