import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createEmptyStateStyles } from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState = ({
  title,
  buttonLabel,
  onPress,
}: EmptyStateProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createEmptyStateStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
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
