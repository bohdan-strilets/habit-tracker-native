import { PRESS_SPRING } from '@constants/pressSpring';
import { useHabitStats } from '@hooks/useHabitStats';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { createHabitSummaryCardStyles } from './HabitSummaryCard.styles';
import type { HabitSummaryCardProps } from './HabitSummaryCard.types';

export const HabitSummaryCard = ({
  habit,
  onPress,
  variant = 'elevated',
}: HabitSummaryCardProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createHabitSummaryCardStyles(theme), [theme]);

  const { streak, completionRate } = useHabitStats(habit);

  const scale = useSharedValue(1);
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, PRESS_SPRING);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, PRESS_SPRING);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('habitCard.openDetails')}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressableWrapper}
    >
      <Animated.View
        style={[
          styles.card,
          variant === 'plain' && styles.cardPlain,
          cardAnimatedStyle,
        ]}
      >
        <Text style={styles.title}>{habit.title}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥 {streak}</Text>
            <Text style={styles.statLabel}>{t('habitSummary.streak')}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>📊 {completionRate}%</Text>
            <Text style={styles.statLabel}>{t('habitSummary.completion')}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};
