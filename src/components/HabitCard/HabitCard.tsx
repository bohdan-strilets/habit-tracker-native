import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_SPRING } from '../../constants/pressSpring';
import { layout, useAppTheme } from '../../theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { ProgressBar } from '../ProgressBar';
import { StreakBadge } from '../StreakBadge/StreakBadge';
import type { HabitCardProps } from './HabitCard.types';
import { createHabitCardStyles } from './HabitCard.styles';

export const HabitCard = ({
  habit,
  onOpenDetails,
  onToggleDone,
}: HabitCardProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createHabitCardStyles(theme), [theme]);

  const scale = useSharedValue(1);
  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleMainPressIn = () => {
    scale.value = withSpring(0.98, PRESS_SPRING);
  };

  const handleMainPressOut = () => {
    scale.value = withSpring(1, PRESS_SPRING);
  };

  const target = habit.target ?? 1;
  const current = habit.currentValue ?? 0;
  const countProgress = target > 0 ? current / target : 0;

  const accentShell = useMemo(() => {
    const hex = habit.accentColor?.trim();
    if (!hex) return null;
    return {
      card: { borderLeftWidth: 3, borderLeftColor: hex },
      iconWrap: { backgroundColor: hexToRgba(hex, 0.2) },
    };
  }, [habit.accentColor]);

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.card,
          habit.completedToday && styles.cardDone,
          accentShell?.card,
          mainAnimatedStyle,
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Opens habit details"
          onPress={() => onOpenDetails(habit.id)}
          onPressIn={handleMainPressIn}
          onPressOut={handleMainPressOut}
          style={styles.cardMain}
        >
          <View style={[styles.iconWrap, accentShell?.iconWrap]}>
            <Text style={styles.icon}>{habit.icon}</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={2}>
                {habit.title}
              </Text>
              <StreakBadge days={habit.streak} variant="compact" />
            </View>

            {habit.categoryLabel ? (
              <Text style={styles.categoryMeta} numberOfLines={1}>
                {habit.categoryLabel}
                {habit.frequency === 'weekly' ? ' · Weekly' : ''}
              </Text>
            ) : habit.frequency === 'weekly' ? (
              <Text style={styles.categoryMeta} numberOfLines={1}>
                Weekly
              </Text>
            ) : null}

            {habit.notes ? (
              <Text style={styles.notesMeta} numberOfLines={2}>
                {habit.notes}
              </Text>
            ) : null}

            {habit.type === 'count' ? (
              <>
                <Text style={styles.countLabel}>
                  {current} / {target}
                </Text>
                <ProgressBar
                  progress={countProgress}
                  accessibilityLabel={`Progress ${current} of ${target}`}
                  accentColor={habit.accentColor?.trim()}
                />
              </>
            ) : (
              <Text
                style={
                  habit.completedToday ? styles.statusDone : styles.statusTodo
                }
              >
                {habit.completedToday ? 'Done' : 'Not done'}
              </Text>
            )}
          </View>
        </Pressable>

        <View style={styles.doneColumn}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              habit.completedToday
                ? 'Mark habit as not done today'
                : 'Mark habit as done today'
            }
            accessibilityState={{ selected: habit.completedToday }}
            onPress={() => onToggleDone(habit.id)}
            style={({ pressed }) => [
              styles.doneButton,
              habit.completedToday && styles.doneButtonMuted,
              pressed && styles.doneButtonPressed,
            ]}
          >
            <Ionicons
              name={
                habit.completedToday
                  ? 'checkmark-circle'
                  : 'checkmark-circle-outline'
              }
              size={layout.habitCardDoneIconSize}
              color={
                habit.completedToday
                  ? theme.colors.primary.dark
                  : theme.colors.text.inverse
              }
            />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};
