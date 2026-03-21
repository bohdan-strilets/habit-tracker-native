import { THEME_STORAGE_KEY } from '@constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildTheme } from '@theme/model/buildTheme';
import type { AppTheme, ColorScheme } from '@theme/types';
import { create } from 'zustand';

import type { ThemeStore } from '@/types/ThemeStore';

export const themeByScheme: Record<ColorScheme, AppTheme> = {
  light: buildTheme('light'),
  dark: buildTheme('dark'),
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  scheme: 'light',
  ready: false,

  setScheme: (s) => {
    set({ scheme: s });
    if (get().ready) {
      void AsyncStorage.setItem(THEME_STORAGE_KEY, s);
    }
  },

  toggleScheme: () => {
    const next = get().scheme === 'light' ? 'dark' : 'light';
    get().setScheme(next);
  },

  hydrateFromStorage: async () => {
    const raw = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    const scheme: ColorScheme =
      raw === 'dark' || raw === 'light' ? raw : 'light';
    set({ scheme, ready: true });
  },
}));
