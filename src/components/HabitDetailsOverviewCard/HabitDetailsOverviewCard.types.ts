import type { TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';
import type { Habit } from '../../types/Habit';

export type HabitDetailsOverviewCardProps = {
  habit: Habit;
  streak: number;
  completionRate: number;
  isDoneToday: boolean;
  badgeAnimatedStyle: AnimatedStyle<ViewStyle>;
  badgeTextAnimatedStyle: AnimatedStyle<TextStyle>;
  statPulseStyle: AnimatedStyle<ViewStyle>;
};
