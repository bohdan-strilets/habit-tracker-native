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

  const onOpenDetailsDismissSwipe = (id: string) => {
    dismissOpenSwipe();
    onOpenDetails(id);
  };

  return (
    <HomeScreenFrame>
      <NestableScrollContainer
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={dismissOpenSwipe}
      >
        <HomeScreenHeader
          greeting={greeting}
          userName={userName}
          dateLine={dateLine}
          globalStreak={globalStreak}
          onOutsidePress={dismissOpenSwipe}
        />
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
        {habits.length === 0 ? (
          <EmptyState
            title="No habits yet"
            buttonLabel="Create your first habit"
            onPress={onCreateFirstHabit}
          />
        ) : (
          <HomeHabitsList
            sections={sections}
            habitsSnapshot={habits}
            onOpenDetails={onOpenDetailsDismissSwipe}
            onEditHabit={onEditHabit}
            onToggleDone={onToggleDone}
            onDeleteHabit={onDeleteHabit}
            onReorderActiveHabits={onReorderActiveHabits}
          />
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
