import { useThemeStore } from '@store/useThemeStore';
import { useShallow } from 'zustand/react/shallow';

export function useTheme() {
  return useThemeStore(
    useShallow((s) => ({
      scheme: s.scheme,
      ready: s.ready,
      setScheme: s.setScheme,
      toggleScheme: s.toggleScheme,
      hydrateFromStorage: s.hydrateFromStorage,
    })),
  );
}
