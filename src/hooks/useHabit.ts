import { useHabitStore } from '../store/useHabitStore';

export const useHabit = () => {
  const habits = useHabitStore((state) => state.habits);

  const addHabit = useHabitStore((state) => state.add);
  const removeHabit = useHabitStore((state) => state.remove);
  const toggleHabit = useHabitStore((state) => state.toggle);
  const cleanHabits = useHabitStore((state) => state.clean);

  return { habits, addHabit, removeHabit, toggleHabit, cleanHabits };
};
