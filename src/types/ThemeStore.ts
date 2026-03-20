import type { ColorScheme } from '../theme/types';

export type ThemeStore = {
  scheme: ColorScheme;
  ready: boolean;
  setScheme: (s: ColorScheme) => void;
  toggleScheme: () => void;
  hydrateFromStorage: () => Promise<void>;
};
