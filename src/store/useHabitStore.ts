import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { HabitStore } from '../types/HabitStore';
import { getCurrentLocalDateString } from '../utils/getCurrentLocalDateString';

const hydrationErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : String(err);

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      isLoading: true,
      hydrationError: null,

      retryHydration: () => {
        set({ isLoading: true, hydrationError: null });
        void useHabitStore.persist.rehydrate();
      },

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
    }),
    {
      name: 'habits',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ habits: state.habits }),
      onRehydrateStorage: () => (_state, err) => {
        useHabitStore.setState({
          isLoading: false,
          hydrationError: err != null ? hydrationErrorMessage(err) : null,
        });
      },
    },
  ),
);
