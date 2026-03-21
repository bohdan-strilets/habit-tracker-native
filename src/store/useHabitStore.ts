import { getTodayStatus } from '@domain/habit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { normalizeToYyyyMmDd } from '@utils/date';
import { getCurrentLocalDateString } from '@utils/getCurrentLocalDateString';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { HabitStore } from '@/types/HabitStore';

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

      update: (id, patch) =>
        set((state) => ({
          habits: state.habits.map((item) => {
            if (String(item.id) !== String(id)) return item;
            const nextLogs = patch.logs !== undefined ? patch.logs : item.logs;
            return {
              ...item,
              ...patch,
              id: item.id,
              logs: nextLogs,
              createdAt: item.createdAt,
            };
          }),
        })),

      remove: (id) =>
        set((state) => ({
          habits: state.habits.filter((item) => String(item.id) !== String(id)),
        })),

      toggle: (id) =>
        set((state) => ({
          habits: state.habits.map((item) => {
            if (String(item.id) !== String(id)) return item;
            const today = getCurrentLocalDateString();
            const kind = item.kind ?? 'boolean';
            const target = Math.max(1, item.target ?? 1);

            const withoutToday = item.logs.filter(
              (l) => normalizeToYyyyMmDd(l.date) !== today,
            );

            if (kind === 'boolean') {
              if (getTodayStatus(item)) {
                return { ...item, logs: withoutToday };
              }
              return {
                ...item,
                logs: [...withoutToday, { date: today, completed: true }],
              };
            }

            const todayLogs = item.logs.filter(
              (l) => normalizeToYyyyMmDd(l.date) === today,
            );
            const maxP =
              todayLogs.length > 0
                ? Math.max(...todayLogs.map((l) => l.progress ?? 0))
                : 0;
            const done = maxP >= target;

            if (done) {
              return { ...item, logs: withoutToday };
            }
            return {
              ...item,
              logs: [
                ...withoutToday,
                {
                  date: today,
                  completed: true,
                  progress: target,
                },
              ],
            };
          }),
        })),

      incrementCountToday: (id) =>
        set((state) => ({
          habits: state.habits.map((item) => {
            if (String(item.id) !== String(id)) return item;
            if ((item.kind ?? 'boolean') !== 'count') return item;

            const today = getCurrentLocalDateString();
            const target = Math.max(1, item.target ?? 1);
            const withoutToday = item.logs.filter(
              (l) => normalizeToYyyyMmDd(l.date) !== today,
            );
            const todayLogs = item.logs.filter(
              (l) => normalizeToYyyyMmDd(l.date) === today,
            );
            const maxP =
              todayLogs.length > 0
                ? Math.max(...todayLogs.map((l) => l.progress ?? 0))
                : 0;

            if (maxP >= target) {
              return { ...item, logs: withoutToday };
            }

            const next = Math.min(maxP + 1, target);
            return {
              ...item,
              logs: [
                ...withoutToday,
                {
                  date: today,
                  completed: next >= target,
                  progress: next,
                },
              ],
            };
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
