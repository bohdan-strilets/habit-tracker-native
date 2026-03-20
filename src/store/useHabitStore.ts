import { create } from 'zustand';
import { HabitStore } from '../types/HabitStore';
import { getCurrentLocalDateString } from '../utils/getCurrentLocalDateString';

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],

  add: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),

  remove: (id) =>
    set((state) => ({
      habits: state.habits.filter((item) => String(item.id) !== String(id)),
    })),

  toggle: (id) =>
    set((state) => ({
      habits: state.habits.map((item) => {
        const newLog = { date: getCurrentLocalDateString(), completed: true };
        if (String(item.id) === String(id))
          return { ...item, logs: [...item.logs, newLog] };

        return item;
      }),
    })),

  clean: () =>
    set(() => ({
      habits: [],
    })),
}));
