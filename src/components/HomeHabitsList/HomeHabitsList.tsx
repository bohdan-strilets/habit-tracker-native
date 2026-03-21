import { HomeHabitReorderLift } from '@components/HomeHabitReorderLift';
import { HomeHabitSwipeRow } from '@components/HomeHabitSwipeRow';
import { LIST_REORDER_SPRING } from '@constants/homeHabitsList';
import { useHomeSwipe } from '@hooks/useHomeSwipe';
import { radii, useAppTheme } from '@theme';
import { hapticReorderLift, hapticReorderRelease } from '@utils/safeHaptics';
import { type ReactElement, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { NestableDraggableFlatList } from 'react-native-draggable-flatlist';

import type { HomeScreenHabit } from '@/types/homeScreenHabit';

import { createHomeHabitsListStyles } from './HomeHabitsList.styles';
import type { HomeHabitsListProps } from './HomeHabitsList.types';

export const HomeHabitsList = ({
  sections,
  habitsSnapshot,
  onOpenDetails,
  onEditHabit,
  onToggleDone,
  onDeleteHabit,
  onReorderActiveHabits,
}: HomeHabitsListProps) => {
  const { height: windowHeight } = useWindowDimensions();
  const { scheme, theme } = useAppTheme();
  const { dismissOpenSwipe } = useHomeSwipe();
  const styles = useMemo(
    () => createHomeHabitsListStyles(theme.colors),
    [theme.colors],
  );

  const { active, completed, activeTitle, completedTitle } = useMemo(() => {
    let activeRows: HomeScreenHabit[] = [];
    let completedRows: HomeScreenHabit[] = [];
    let activeHeader = '';
    let completedHeader = '';
    for (const s of sections) {
      if (s.key === 'active') {
        activeRows = s.data;
        activeHeader = s.title;
      } else if (s.key === 'completed') {
        completedRows = s.data;
        completedHeader = s.title;
      }
    }
    return {
      active: activeRows,
      completed: completedRows,
      activeTitle: activeHeader,
      completedTitle: completedHeader,
    };
  }, [sections]);

  const renderActiveItem = useCallback(
    ({
      item,
      drag,
      isActive,
    }: {
      item: HomeScreenHabit;
      drag: () => void;
      isActive: boolean;
    }) => (
      <HomeHabitReorderLift>
        <HomeHabitSwipeRow
          habit={item}
          onOpenDetails={onOpenDetails}
          onEditHabit={onEditHabit}
          onToggleDone={onToggleDone}
          onDelete={onDeleteHabit}
          onBeginReorder={drag}
          reorderLifted={isActive}
        />
      </HomeHabitReorderLift>
    ),
    [onDeleteHabit, onEditHabit, onOpenDetails, onToggleDone],
  );

  const renderReorderPlaceholder = useCallback(() => {
    return (
      <View
        style={[
          reorderSlotStyles.placeholder,
          {
            borderColor: theme.colors.border.subtle,
            backgroundColor: theme.colors.background.surfaceMuted,
            opacity: scheme === 'dark' ? 0.32 : 0.45,
          },
        ]}
      />
    );
  }, [scheme, theme.colors.background.surfaceMuted, theme.colors.border.subtle]);

  const keyExtractorHabit = useCallback((item: HomeScreenHabit) => item.id, []);

  const onDragBegin = useCallback(() => {
    dismissOpenSwipe();
    hapticReorderLift();
  }, [dismissOpenSwipe]);

  const onDragEnd = useCallback(
    ({ data }: { data: HomeScreenHabit[] }) => {
      onReorderActiveHabits(data.map((h) => h.id));
      hapticReorderRelease();
    },
    [onReorderActiveHabits],
  );

  /** Fills space below the last row so taps on “empty” list area dismiss open swipe. */
  const footerMinHeight = Math.max(120, Math.floor(windowHeight * 0.28));

  const listFooter = useMemo((): ReactElement => {
    return (
      <Pressable
        style={[styles.listFooterFill, { minHeight: footerMinHeight }]}
        onPress={dismissOpenSwipe}
      />
    );
  }, [dismissOpenSwipe, footerMinHeight, styles.listFooterFill]);

  return (
    <View style={styles.listContent}>
      {active.length > 0 ? (
        <>
          <Pressable onPress={dismissOpenSwipe}>
            <Text style={styles.sectionHeader}>{activeTitle}</Text>
          </Pressable>
          <NestableDraggableFlatList
            data={active}
            keyExtractor={keyExtractorHabit}
            renderItem={renderActiveItem}
            renderPlaceholder={renderReorderPlaceholder}
            onDragBegin={onDragBegin}
            onDragEnd={onDragEnd}
            animationConfig={LIST_REORDER_SPRING}
            extraData={habitsSnapshot}
            scrollEnabled={false}
          />
        </>
      ) : null}

      {completed.length > 0 ? (
        <>
          <Pressable onPress={dismissOpenSwipe}>
            <Text style={styles.sectionHeader}>{completedTitle}</Text>
          </Pressable>
          {completed.map((habit) => (
            <HomeHabitSwipeRow
              key={habit.id}
              habit={habit}
              onOpenDetails={onOpenDetails}
              onEditHabit={onEditHabit}
              onToggleDone={onToggleDone}
              onDelete={onDeleteHabit}
            />
          ))}
        </>
      ) : null}

      {listFooter}
    </View>
  );
};

const reorderSlotStyles = StyleSheet.create({
  placeholder: {
    flex: 1,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
