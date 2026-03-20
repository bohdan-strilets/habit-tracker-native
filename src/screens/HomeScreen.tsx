import { EmptyState } from '../components/EmptyState';
import { HomeHabitsList } from '../components/HomeHabitsList';
import { HomeScreenFrame } from '../components/HomeScreenFrame';
import { HomeScreenHeader } from '../components/HomeScreenHeader';
import { HomeTodayProgressSection } from '../components/HomeTodayProgressSection';
import { useHomeScreen } from '../hooks/useHomeScreen';

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
    onCreateFirstHabit,
  } = useHomeScreen();

  return (
    <HomeScreenFrame>
      <HomeScreenHeader
        greeting={greeting}
        userName={userName}
        dateLine={dateLine}
        globalStreak={globalStreak}
      />
      <HomeTodayProgressSection
        progress={progress}
        completedCount={completedCount}
        total={total}
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
          onOpenDetails={onOpenDetails}
          onToggleDone={onToggleDone}
        />
      )}
    </HomeScreenFrame>
  );
};
