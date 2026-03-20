import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  HabitDetails: { habitId: string };
  EditHabit: { habitId: string };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  AddHabit: undefined;
  Settings: undefined;
};
