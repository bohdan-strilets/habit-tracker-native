import { useCallback, useMemo, type ReactElement } from 'react';
import { Pressable, Text, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useHomeSwipe } from '../../hooks/useHomeSwipe';
import { HomeHabitSwipeRow } from '../HomeHabitSwipeRow';
import { useAppTheme } from '../../theme';
import type { HomeHabitsListProps, HomeListRow } from './HomeHabitsList.types';
import { createHomeHabitsListStyles } from './HomeHabitsList.styles';
import { flattenHomeHabitsSections } from './utils/flattenHomeHabitsSections';

export const HomeHabitsList = ({
  sections,
  habitsSnapshot,
  onOpenDetails,
  onEditHabit,
  onToggleDone,
  onDeleteHabit,
}: HomeHabitsListProps) => {
  const { height: windowHeight } = useWindowDimensions();
  const { theme } = useAppTheme();
  const { dismissOpenSwipe } = useHomeSwipe();
  const styles = useMemo(
    () => createHomeHabitsListStyles(theme.colors),
    [theme.colors],
  );

  const listData = useMemo(
    () => flattenHomeHabitsSections(sections),
    [sections],
  );

  const renderItem = useCallback(
    ({ item }: { item: HomeListRow }) => {
      if (item.kind === 'header') {
        return (
          <Pressable onPress={dismissOpenSwipe}>
            <Text style={styles.sectionHeader}>{item.title}</Text>
          </Pressable>
        );
      }
      return (
        <HomeHabitSwipeRow
          habit={item.habit}
          onOpenDetails={onOpenDetails}
          onEditHabit={onEditHabit}
          onToggleDone={onToggleDone}
          onDelete={onDeleteHabit}
        />
      );
    },
    [
      onDeleteHabit,
      onEditHabit,
      onOpenDetails,
      onToggleDone,
      dismissOpenSwipe,
      styles.sectionHeader,
    ],
  );

  const keyExtractor = useCallback((item: HomeListRow) => item.key, []);

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
    <FlatList
      data={listData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={listFooter}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      windowSize={8}
      initialNumToRender={12}
      extraData={habitsSnapshot}
      onScrollBeginDrag={dismissOpenSwipe}
    />
  );
};
