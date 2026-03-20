import { useShallow } from 'zustand/react/shallow';
import { themeByScheme, useThemeStore } from '../../store';

export function useAppTheme() {
  return useThemeStore(
    useShallow((s) => ({
      scheme: s.scheme,
      ready: s.ready,
      setScheme: s.setScheme,
      toggleScheme: s.toggleScheme,
      theme: themeByScheme[s.scheme],
    })),
  );
}
