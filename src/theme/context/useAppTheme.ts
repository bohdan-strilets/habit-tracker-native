import { useTheme } from '@hooks/useTheme';
import { themeByScheme } from '@store';
import type { ColorScheme } from '@theme/types';
import { useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export function useAppTheme() {
  const { preference, ready, setPreference } = useTheme();
  const systemScheme = useColorScheme();

  const scheme: ColorScheme = useMemo(() => {
    if (preference === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return preference;
  }, [preference, systemScheme]);

  const toggleScheme = useCallback(() => {
    setPreference(scheme === 'dark' ? 'light' : 'dark');
  }, [scheme, setPreference]);

  return {
    preference,
    scheme,
    ready,
    setPreference,
    toggleScheme,
    theme: themeByScheme[scheme],
  };
}
