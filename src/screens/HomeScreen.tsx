import { FadeSlideIn } from '../components/FadeSlideIn';
import { HabitsList } from '../components/HabitsList';
import { HomeHabitsHeader } from '../components/HomeHabitsHeader';
import { HomeScreenScroll } from '../components/HomeScreenScroll';
import { ScreenBackground } from '../components/ScreenBackground';
import { useHomeScreen } from '../hooks/useHomeScreen';

export const HomeScreen = () => {
  const { entranceKey, onAddHabit } = useHomeScreen();

  return (
    <ScreenBackground>
      <HomeScreenScroll>
        <FadeSlideIn index={0} playKey={entranceKey}>
          <HomeHabitsHeader onAddHabit={onAddHabit} />
        </FadeSlideIn>

        <FadeSlideIn index={1} playKey={entranceKey}>
          <HabitsList />
        </FadeSlideIn>
      </HomeScreenScroll>
    </ScreenBackground>
  );
};
