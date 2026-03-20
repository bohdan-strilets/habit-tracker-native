import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '../../store';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const hydrateFromStorage = useThemeStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    void hydrateFromStorage();
  }, [hydrateFromStorage]);

  return children;
}
