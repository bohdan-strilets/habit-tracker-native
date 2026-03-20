import { useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useHabitStats } from '../../hooks/useHabitStats';
import type { HabitCardProps } from './HabitCard.types';
import { styles } from './HabitCard.styles';

export const HabitCard = ({
  title,
  logs,
  onPress,
  variant = 'elevated',
}: HabitCardProps) => {
  const { streak, completionRate } = useHabitStats(logs);

  const scale = useRef(new Animated.Value(1)).current;
  const animatedCardStyle = { transform: [{ scale }] };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Opens habit details"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressableWrapper}
    >
      <Animated.View
        style={[
          styles.card,
          variant === 'plain' && styles.cardPlain,
          animatedCardStyle,
        ]}
      >
        <Text style={styles.title}>{title}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥 {streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>📊 {completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};
