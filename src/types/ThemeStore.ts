import type { ThemePreference } from '@theme/types';

export type ThemeStore = {
  preference: ThemePreference;
  ready: boolean;
  setPreference: (p: ThemePreference) => void;
  hydrateFromStorage: () => Promise<void>;
};
