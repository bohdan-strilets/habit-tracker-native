import { LANGUAGE_STORAGE_KEY } from '@constants/storageKeys';
import { resolveDeviceLanguage } from '@i18n/resolveDeviceLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import type { AppLanguage } from '@/types/Language';
import type { LanguageStore } from '@/types/LanguageStore';

function isAppLanguage(raw: string | null): raw is AppLanguage {
  return raw === 'en' || raw === 'uk' || raw === 'pl';
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: resolveDeviceLanguage(),
  ready: false,

  setLanguage: (lang) => {
    set({ language: lang });
    if (get().ready) {
      void AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  },

  hydrateFromStorage: async () => {
    const raw = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    let language: AppLanguage;
    if (isAppLanguage(raw)) {
      language = raw;
    } else {
      language = resolveDeviceLanguage();
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
    set({ language, ready: true });
  },
}));
