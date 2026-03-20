import type { Log } from '../../types/Habit';

export type HabitCardProps = {
  title: string;
  logs: Log[];
  onPress: () => void;
  variant?: 'elevated' | 'plain';
};
