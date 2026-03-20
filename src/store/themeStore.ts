import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { THEME_STORAGE_KEY } from '../constants/storageKeys';
import { buildTheme } from '../theme/model/buildTheme';
import type { AppTheme, ColorScheme } from '../theme/types';

export const themeByScheme: Record<ColorScheme, AppTheme> = {
  light: buildTheme('light'),
  dark: buildTheme('dark'),
};

type ThemeState = {
  scheme: ColorScheme;
  ready: boolean;
  setScheme: (s: ColorScheme) => void;
  toggleScheme: () => void;
  hydrateFromStorage: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
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
