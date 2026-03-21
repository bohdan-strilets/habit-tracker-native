import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createEmptyStateStyles } from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

const EMPTY_ICON_SIZE = 44;

export const EmptyState = ({
  title,
  subtitle,
  buttonLabel,
  onPress,
}: EmptyStateProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createEmptyStateStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <View style={styles.iconWrap} importantForAccessibility="no">
        <Ionicons
          name="leaf-outline"
          size={EMPTY_ICON_SIZE}
          color={theme.colors.primary.dark}
        />
      </View>
      <Text
        style={[styles.title, !subtitle ? styles.titleWithoutSubtitle : null]}
      >
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonLabel}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
};
