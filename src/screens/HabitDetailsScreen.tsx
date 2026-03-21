import { FadeSlideIn } from '@components/FadeSlideIn';
import { HabitDetailsActionsCard } from '@components/HabitDetailsActionsCard';
import { HabitDetailsMissing } from '@components/HabitDetailsMissing';
import { HabitDetailsOverviewCard } from '@components/HabitDetailsOverviewCard';
import { HabitDetailsProgressCard } from '@components/HabitDetailsProgressCard';
import { HabitDetailsScreenFrame } from '@components/HabitDetailsScreenFrame';
import { HabitDetailsScrollView } from '@components/HabitDetailsScrollView';
import { useHabitDetailsScreen } from '@hooks/useHabitDetailsScreen';

export const HabitDetailsScreen = () => {
  const {
    habit,
    isDoneToday,
    streak,
    completionRate,
    badgeAnimatedStyle,
    badgeTextAnimatedStyle,
    statPulseStyle,
    goBack,
    goToEdit,
    markCompleted,
    confirmDelete,
  } = useHabitDetailsScreen();

  if (!habit) {
    return (
      <HabitDetailsScreenFrame>
        <HabitDetailsMissing onGoBack={goBack} />
      </HabitDetailsScreenFrame>
    );
  }

  return (
    <HabitDetailsScreenFrame>
      <HabitDetailsScrollView>
        <FadeSlideIn index={0} playKey={habit.id}>
          <HabitDetailsOverviewCard
            habit={habit}
            streak={streak}
            completionRate={completionRate}
            isDoneToday={isDoneToday}
            badgeAnimatedStyle={badgeAnimatedStyle}
            badgeTextAnimatedStyle={badgeTextAnimatedStyle}
            statPulseStyle={statPulseStyle}
          />
        </FadeSlideIn>

        <FadeSlideIn index={1} playKey={habit.id}>
          <HabitDetailsProgressCard habit={habit} />
        </FadeSlideIn>

        <FadeSlideIn index={2} playKey={habit.id}>
          <HabitDetailsActionsCard
            isDoneToday={isDoneToday}
            onEdit={goToEdit}
            onMarkCompleted={markCompleted}
            onDelete={confirmDelete}
          />
        </FadeSlideIn>
      </HabitDetailsScrollView>
    </HabitDetailsScreenFrame>
  );
};
