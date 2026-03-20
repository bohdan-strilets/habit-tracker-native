import { useEffect, type ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { hydrateFromStorage } = useTheme();

  useEffect(() => {
    void hydrateFromStorage();
  }, [hydrateFromStorage]);

  return children;
}
