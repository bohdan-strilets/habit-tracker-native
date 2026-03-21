import type { AppLanguage } from './Language';

export type LanguageStore = {
  language: AppLanguage;
  ready: boolean;
  setLanguage: (lang: AppLanguage) => void;
  hydrateFromStorage: () => Promise<void>;
};
