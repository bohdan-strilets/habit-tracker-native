import { useTheme } from '@hooks/useTheme';
import { type ReactNode,useEffect } from 'react';

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
