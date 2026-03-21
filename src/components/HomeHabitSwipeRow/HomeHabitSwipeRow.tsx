import { HabitCard } from '@components/HabitCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHomeSwipe } from '@hooks/useHomeSwipe';
import { layout, useAppTheme } from '@theme';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  DRAG_OVERSHOOT_LEFT,
  DRAG_OVERSHOOT_RIGHT,
  LEFT_OPEN,
  REVEAL_FRACTION,
  RIGHT_OPEN,
} from './HomeHabitSwipeRow.constants';
import { createHomeHabitSwipeRowStyles } from './HomeHabitSwipeRow.styles';
import type { HomeHabitSwipeRowProps } from './HomeHabitSwipeRow.types';

const SNAP_SPRING = {
  stiffness: 400,
  damping: 32,
  mass: 0.42,
} as const;

export const HomeHabitSwipeRow = ({
  habit,
  onOpenDetails,
  onEditHabit,
  onToggleDone,
  onDelete,
}: HomeHabitSwipeRowProps) => {
  const { theme } = useAppTheme();
  const { activeRowId, setActiveRowId } = useHomeSwipe();

  const styles = useMemo(
    () => createHomeHabitSwipeRowStyles(theme.colors),
    [theme.colors],
  );

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const [snap, setSnap] = useState<'none' | 'left' | 'right'>('none');

  const onOpenedRight = useCallback(() => {
    setSnap('right');
    setActiveRowId(habit.id);
  }, [habit.id, setActiveRowId]);

  const onOpenedLeft = useCallback(() => {
    setSnap('left');
    setActiveRowId(habit.id);
  }, [habit.id, setActiveRowId]);

  const onClosedSnap = useCallback(() => {
    setSnap('none');
    setActiveRowId((curr) => (curr === habit.id ? null : curr));
  }, [habit.id, setActiveRowId]);

  const closeRowJs = useCallback(() => {
    translateX.value = withSpring(0, SNAP_SPRING);
    setSnap('none');
    setActiveRowId((curr) => (curr === habit.id ? null : curr));
  }, [habit.id, setActiveRowId, translateX]);

  useEffect(() => {
    if (snap === 'none') return;
    if (activeRowId != null && activeRowId !== habit.id) {
      translateX.value = withSpring(0, SNAP_SPRING);
      setSnap('none');
    }
  }, [activeRowId, habit.id, snap, translateX]);

  useEffect(() => {
    if (activeRowId !== null) return;
    if (snap === 'none') return;
    translateX.value = withSpring(0, SNAP_SPRING);
    setSnap('none');
  }, [activeRowId, snap, translateX]);

  const handleCardOpenDetails = useCallback(
    (id: string) => {
      if (snap !== 'none') {
        closeRowJs();
        return;
      }
      onOpenDetails(id);
    },
    [closeRowJs, onOpenDetails, snap],
  );

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-14, 14])
      .onBegin(() => {
        startX.value = translateX.value;
      })
      .onUpdate((e) => {
        const raw = startX.value + e.translationX;
        const min = -(RIGHT_OPEN + DRAG_OVERSHOOT_RIGHT);
        const max = LEFT_OPEN + DRAG_OVERSHOOT_LEFT;
        translateX.value = Math.min(max, Math.max(min, raw));
      })
      .onEnd(() => {
        const x = translateX.value;

        if (x < -RIGHT_OPEN * REVEAL_FRACTION) {
          translateX.value = withSpring(
            -RIGHT_OPEN,
            SNAP_SPRING,
            (finished) => {
              if (finished) runOnJS(onOpenedRight)();
            },
          );
          return;
        }

        if (x > LEFT_OPEN * REVEAL_FRACTION) {
          translateX.value = withSpring(LEFT_OPEN, SNAP_SPRING, (finished) => {
            if (finished) runOnJS(onOpenedLeft)();
          });
          return;
        }

        translateX.value = withSpring(0, SNAP_SPRING, (finished) => {
          if (finished) runOnJS(onClosedSnap)();
        });
      });
  }, [onClosedSnap, onOpenedLeft, onOpenedRight]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onPressDoneInStrip = useCallback(() => {
    onToggleDone(habit.id);
    closeRowJs();
  }, [closeRowJs, habit.id, onToggleDone]);

  const onPressEdit = useCallback(() => {
    closeRowJs();
    onEditHabit(habit.id);
  }, [closeRowJs, habit.id, onEditHabit]);

  const onPressDelete = useCallback(() => {
    closeRowJs();
    onDelete(habit.id);
  }, [closeRowJs, habit.id, onDelete]);

  return (
    <View
      style={styles.rowWrap}
      accessibilityHint="Swipe left to show Done, swipe right for edit and delete"
    >
      <View style={styles.track}>
        <View style={[styles.leftStrip, { width: LEFT_OPEN }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Edit habit"
            style={({ pressed }) => [
              styles.leftAction,
              styles.leftActionEdit,
              pressed && { opacity: 0.92 },
            ]}
            onPress={onPressEdit}
          >
            <Ionicons
              name="create-outline"
              size={22}
              color={theme.colors.text.inverse}
            />
            <Text style={styles.actionLabel}>Edit</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Delete habit"
            style={({ pressed }) => [
              styles.leftAction,
              styles.leftActionDelete,
              pressed && { opacity: 0.92 },
            ]}
            onPress={onPressDelete}
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color={theme.colors.text.inverse}
            />
            <Text style={styles.actionLabel}>Delete</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.rightStrip,
            habit.completedToday && {
              backgroundColor: theme.colors.background.surfaceMuted,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              habit.completedToday
                ? 'Mark habit as not done today'
                : 'Mark habit as done today'
            }
            accessibilityState={{ selected: habit.completedToday }}
            onPress={onPressDoneInStrip}
            style={({ pressed }) => [
              {
                flex: 1,
                alignSelf: 'stretch',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
              pressed && { opacity: 0.9 },
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
            <Text
              style={[
                styles.actionLabel,
                habit.completedToday && { color: theme.colors.primary.dark },
              ]}
            >
              Done
            </Text>
          </Pressable>
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.slideLayer, slideStyle]}>
            <HabitCard
              habit={habit}
              showInlineDone={false}
              onOpenDetails={handleCardOpenDetails}
              onToggleDone={onToggleDone}
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};
