import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useAppTheme } from '../../theme';
import {
  THEME_TOGGLE_ICON_SIZE,
  themeToggleStyles as styles,
} from './ThemeToggle.styles';

export const ThemeToggle = () => {
  const { scheme, toggleScheme, theme } = useAppTheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onPress={toggleScheme}
      style={({ pressed }) => [styles.hit, pressed && styles.pressed]}
    >
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={THEME_TOGGLE_ICON_SIZE}
        color={isDark ? '#ffd54f' : theme.colors.text.subtle}
      />
    </Pressable>
  );
};
