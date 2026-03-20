import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_SPRING } from '../../constants/pressSpring';
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
          cardAnimatedStyle,
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
