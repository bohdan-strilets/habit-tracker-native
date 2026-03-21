import { THEME_STORAGE_KEY } from '@constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildTheme } from '@theme/model/buildTheme';
import type { AppTheme, ColorScheme, ThemePreference } from '@theme/types';
import { create } from 'zustand';

import type { ThemeStore } from '@/types/ThemeStore';

export const themeByScheme: Record<ColorScheme, AppTheme> = {
  light: buildTheme('light'),
  dark: buildTheme('dark'),
};

function isThemePreference(raw: string | null): raw is ThemePreference {
  return raw === 'light' || raw === 'dark' || raw === 'system';
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  preference: 'light',
  ready: false,

  setPreference: (p) => {
    set({ preference: p });
    if (get().ready) {
      void AsyncStorage.setItem(THEME_STORAGE_KEY, p);
    }
  },

  hydrateFromStorage: async () => {
    const raw = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    const preference = isThemePreference(raw) ? raw : 'light';
    set({ preference, ready: true });
  },
}));
