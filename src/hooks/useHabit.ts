import { useHabitStore } from '@store/useHabitStore';

export const useHabit = () => {
  const habits = useHabitStore((state) => state.habits);
  const isLoading = useHabitStore((state) => state.isLoading);
  const hydrationError = useHabitStore((state) => state.hydrationError);

  const addHabit = useHabitStore((state) => state.add);
  const updateHabit = useHabitStore((state) => state.update);
  const removeHabit = useHabitStore((state) => state.remove);
  const toggleHabit = useHabitStore((state) => state.toggle);
  const incrementCountToday = useHabitStore(
    (state) => state.incrementCountToday,
  );
  const cleanHabits = useHabitStore((state) => state.clean);
  const retryHydration = useHabitStore((state) => state.retryHydration);

  return {
    habits,
    isLoading,
    hydrationError,
    addHabit,
    updateHabit,
    removeHabit,
    toggleHabit,
    incrementCountToday,
    cleanHabits,
    retryHydration,
  };
};
