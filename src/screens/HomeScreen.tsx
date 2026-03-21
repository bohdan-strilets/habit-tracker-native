import { EmptyState } from '@components/EmptyState';
import { HomeHabitsList } from '@components/HomeHabitsList';
import { HomeScreenFrame } from '@components/HomeScreenFrame';
import { HomeScreenHeader } from '@components/HomeScreenHeader';
import { HomeTodayProgressSection } from '@components/HomeTodayProgressSection';
import { useHomeScreen } from '@hooks/useHomeScreen';
import { useHomeSwipe } from '@hooks/useHomeSwipe';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

export const HomeScreen = () => {
  const {
    userName,
    greeting,
    dateLine,
    globalStreak,
    habits,
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
    </HomeScreenFrame>
  );
};
