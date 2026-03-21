import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import {
  THEME_TOGGLE_ICON_SIZE,
  themeToggleStyles as styles,
} from './ThemeToggle.styles';

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { scheme, toggleScheme, theme } = useAppTheme();
  const isDark = scheme === 'dark';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isDark ? t('themeToggle.toLight') : t('themeToggle.toDark')
      }
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
