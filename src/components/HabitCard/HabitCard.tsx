import { ProgressBar } from '@components/ProgressBar';
import { StreakBadge } from '@components/StreakBadge/StreakBadge';
import { DEFAULT_HABIT_ACCENT_HEX } from '@constants/habitFormOptions';
import { PRESS_SPRING } from '@constants/pressSpring';
import Ionicons from '@expo/vector-icons/Ionicons';
import { layout, useAppTheme } from '@theme';
import { hexToRgba } from '@utils/hexToRgba';
import { hapticReorderHoldTick } from '@utils/safeHaptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { createHabitCardStyles } from './HabitCard.styles';
import type { HabitCardProps } from './HabitCard.types';

const LONG_PRESS_REORDER_MS = 1000;
const HOLD_HINT_FIRST_MS = 420;
const HOLD_HINT_SECOND_MS = 780;

export const HabitCard = ({
  habit,
  onOpenDetails,
  onToggleDone,
  showInlineDone = true,
  onLongPressReorder,
}: HabitCardProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createHabitCardStyles(theme), [theme]);

  const pressScale = useSharedValue(1);
  const reorderNudge = useSharedValue(1);
  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value * reorderNudge.value }],
  }));

  const holdHintTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearHoldHintTimers = useCallback(() => {
    for (const t of holdHintTimers.current) clearTimeout(t);
    holdHintTimers.current = [];
  }, []);

  const runHoldHintPulse = useCallback(() => {
    reorderNudge.value = withSequence(
      withTiming(1.012, { duration: 70 }),
      withTiming(1, { duration: 130 }),
    );
  }, [reorderNudge]);

  useEffect(() => () => clearHoldHintTimers(), [clearHoldHintTimers]);

  const handleMainPressIn = () => {
    pressScale.value = withSpring(0.98, PRESS_SPRING);
    if (!onLongPressReorder) return;
    clearHoldHintTimers();
    holdHintTimers.current.push(
      setTimeout(() => {
        hapticReorderHoldTick();
        runHoldHintPulse();
      }, HOLD_HINT_FIRST_MS),
    );
    holdHintTimers.current.push(
      setTimeout(() => {
        hapticReorderHoldTick();
        reorderNudge.value = withSequence(
          withTiming(1.018, { duration: 75 }),
          withTiming(1, { duration: 140 }),
        );
      }, HOLD_HINT_SECOND_MS),
    );
  };

  const handleMainPressOut = () => {
    clearHoldHintTimers();
    pressScale.value = withSpring(1, PRESS_SPRING);
    reorderNudge.value = withTiming(1, { duration: 140 });
  };

  const handleLongPressReorder = () => {
    clearHoldHintTimers();
    pressScale.value = withSpring(1, PRESS_SPRING);
    reorderNudge.value = 1;
    onLongPressReorder?.();
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

  const accentHex = habit.accentColor?.trim() || DEFAULT_HABIT_ACCENT_HEX;

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[styles.card, accentShell?.card, mainAnimatedStyle]}
      >
        {habit.completedToday ? (
          <LinearGradient
            colors={[hexToRgba(accentHex, 0.22), hexToRgba(accentHex, 0)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        ) : null}
        <Pressable
          accessibilityRole="button"
          accessibilityHint={
            onLongPressReorder
              ? 'Opens habit details. Light ticks while holding mean reorder is almost ready; keep holding to lift and move.'
              : 'Opens habit details'
          }
          onPress={() => onOpenDetails(habit.id)}
          onLongPress={
            onLongPressReorder ? handleLongPressReorder : undefined
          }
          delayLongPress={
            onLongPressReorder ? LONG_PRESS_REORDER_MS : undefined
          }
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

        {showInlineDone ? (
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
        ) : null}
      </Animated.View>
    </View>
  );
};
