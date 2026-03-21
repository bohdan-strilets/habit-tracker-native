import { useThemeStore } from '@store/useThemeStore';
import { useShallow } from 'zustand/react/shallow';

export function useTheme() {
  return useThemeStore(
    useShallow((s) => ({
      preference: s.preference,
      ready: s.ready,
      setPreference: s.setPreference,
      hydrateFromStorage: s.hydrateFromStorage,
    })),
  );
}
