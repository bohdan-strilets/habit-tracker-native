import { useTheme } from '../../hooks/useTheme';
import { themeByScheme } from '../../store';

export function useAppTheme() {
  const { scheme, ready, setScheme, toggleScheme } = useTheme();
  return {
    scheme,
    ready,
    setScheme,
    toggleScheme,
    theme: themeByScheme[scheme],
  };
}
