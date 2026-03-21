import {
  DEFAULT_REMINDER_HOUR,
  DEFAULT_REMINDER_MINUTE,
} from '@constants/habitReminders';
import { REMINDER_PREFS_STORAGE_KEY } from '@constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ReminderPrefsStore } from '@/types/ReminderPrefsStore';

export const useReminderPrefsStore = create<ReminderPrefsStore>()(
  persist(
    (set) => ({
      allDisabled: false,
      unifiedEnabled: false,
      unifiedHour: DEFAULT_REMINDER_HOUR,
      unifiedMinute: DEFAULT_REMINDER_MINUTE,

      setAllDisabled: (value) => set({ allDisabled: value }),

      setUnifiedEnabled: (value) => set({ unifiedEnabled: value }),

      setUnifiedTime: (hour, minute) =>
        set({
          unifiedHour: Math.min(23, Math.max(0, Math.round(hour))),
          unifiedMinute: Math.min(59, Math.max(0, Math.round(minute))),
        }),
    }),
    {
      name: REMINDER_PREFS_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        allDisabled: s.allDisabled,
        unifiedEnabled: s.unifiedEnabled,
        unifiedHour: s.unifiedHour,
        unifiedMinute: s.unifiedMinute,
      }),
    },
  ),
);
