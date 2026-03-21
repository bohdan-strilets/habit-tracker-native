import { DayDetailsSheet } from '@components/DayDetailsSheet';
import { EmptyState } from '@components/EmptyState';
import { HeatmapCalendar } from '@components/HeatmapCalendar';
import { HomeHabitsList } from '@components/HomeHabitsList';
import { HomeScreenFrame } from '@components/HomeScreenFrame';
import { HomeScreenHeader } from '@components/HomeScreenHeader';
import { HomeTodayProgressSection } from '@components/HomeTodayProgressSection';
import { useHomeScreen } from '@hooks/useHomeScreen';
import { useHomeSwipe } from '@hooks/useHomeSwipe';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

export const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    userName,
    greeting,
    dateLine,
    globalStreak,
    habits,
    heatmapData,
    heatmapEndDate,
    sections,
    progress,
    completedCount,
    total,
    onToggleDone,
    onOpenDetails,
    onEditHabit,
    onCreateFirstHabit,
    onDeleteHabit,
    onReorderActiveHabits,
  } = useHomeScreen();

  const { dismissOpenSwipe } = useHomeSwipe();

  const hasHabits = habits.length > 0;

  const onOpenDetailsDismissSwipe = (id: string) => {
    dismissOpenSwipe();
    onOpenDetails(id);
  };

  return (
    <HomeScreenFrame>
      <NestableScrollContainer
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={dismissOpenSwipe}
      >
        <HomeScreenHeader
          greeting={greeting}
          userName={userName}
          dateLine={dateLine}
          globalStreak={globalStreak}
          showStreak={hasHabits}
          onOutsidePress={dismissOpenSwipe}
        />
        {hasHabits ? (
          <>
            <HeatmapCalendar
              data={heatmapData}
              endDate={heatmapEndDate}
              onDayPress={setSelectedDate}
            />
            <HomeTodayProgressSection
              progress={progress}
              completedCount={completedCount}
              total={total}
              onOutsidePress={dismissOpenSwipe}
            />
            <HomeHabitsList
              sections={sections}
              habitsSnapshot={habits}
              onOpenDetails={onOpenDetailsDismissSwipe}
              onEditHabit={onEditHabit}
              onToggleDone={onToggleDone}
              onDeleteHabit={onDeleteHabit}
              onReorderActiveHabits={onReorderActiveHabits}
            />
          </>
        ) : (
          <View style={styles.emptyRegion}>
            <EmptyState
              title="No habits yet"
              subtitle="Add your first habit to track progress, build streaks, and see your activity on the calendar."
              buttonLabel="Create your first habit"
              onPress={onCreateFirstHabit}
            />
          </View>
        )}
      </NestableScrollContainer>
      {selectedDate != null ? (
        <DayDetailsSheet
          key={selectedDate}
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      ) : null}
    </HomeScreenFrame>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  /** Fills space below the header so the empty state is centered in the remainder, not the full screen. */
  emptyRegion: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
});
