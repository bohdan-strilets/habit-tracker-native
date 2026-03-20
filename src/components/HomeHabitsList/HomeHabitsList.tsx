import { useCallback, useMemo } from 'react';
import { SectionList, Text } from 'react-native';
import { HabitCard } from '../HabitCard';
import { useAppTheme } from '../../theme';
import type { HomeScreenHabit } from '../../types/homeScreenHabit';
import type { HomeHabitsListProps } from './HomeHabitsList.types';
import { createHomeHabitsListStyles } from './HomeHabitsList.styles';

export const HomeHabitsList = ({
  sections,
  habitsSnapshot,
  onOpenDetails,
  onToggleDone,
}: HomeHabitsListProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeHabitsListStyles(theme.colors),
    [theme.colors],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    ),
    [styles.sectionHeader],
  );

  const renderItem = useCallback(
    ({ item }: { item: HomeScreenHabit }) => (
      <HabitCard
        habit={item}
        onOpenDetails={onOpenDetails}
        onToggleDone={onToggleDone}
      />
    ),
    [onOpenDetails, onToggleDone],
  );

  const keyExtractor = useCallback((item: HomeScreenHabit) => item.id, []);

  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      windowSize={8}
      initialNumToRender={8}
      extraData={habitsSnapshot}
    />
  );
};
