import { useCallback, useEffect, useMemo } from 'react';
import {
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getStreak } from '../domain/habit';
import type { HomeStackParamList, MainTabParamList } from '../navigation/types';
import type { HomeScreenHabitSection } from '../types/homeScreen';
import { habitToHomeScreenHabit } from '../utils/habitToHomeScreenHabit';
import { useHabit } from './useHabit';

const USER_NAME = 'Bohdan';

type HomeNav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList>
>;

function formatTodayDate(d: Date) {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function greetingLabel(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const useHomeScreen = () => {
  const navigation = useNavigation<HomeNav>();
  const { habits, toggleHabit, incrementCountToday } = useHabit();

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const now = useMemo(() => new Date(), []);
  const dateLine = useMemo(() => formatTodayDate(now), [now]);
  const greeting = useMemo(() => greetingLabel(now.getHours()), [now]);

  const rows = useMemo(() => habits.map(habitToHomeScreenHabit), [habits]);

  const globalStreak = useMemo(
    () =>
      habits.length === 0 ? 0 : Math.max(...habits.map((h) => getStreak(h))),
    [habits],
  );

  const { completedCount, total, sections } = useMemo(() => {
    const totalH = rows.length;
    const done = rows.filter((h) => h.completedToday).length;
    const active = rows.filter((h) => !h.completedToday);
    const completed = rows.filter((h) => h.completedToday);
    const next: HomeScreenHabitSection[] = [];
    if (active.length) next.push({ title: 'Active', data: active });
    if (completed.length)
      next.push({ title: 'Completed today', data: completed });
    return { completedCount: done, total: totalH, sections: next };
  }, [rows]);

  const progress = total > 0 ? completedCount / total : 0;

  const onToggleDone = useCallback(
    (id: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const h = habits.find((x) => String(x.id) === String(id));
      const kind = h?.kind ?? 'boolean';
      if (kind === 'count') {
        incrementCountToday(id);
      } else {
        toggleHabit(id);
      }
    },
    [habits, incrementCountToday, toggleHabit],
  );

  const onOpenDetails = useCallback(
    (id: string) => {
      navigation.navigate('HabitDetails', { habitId: id });
    },
    [navigation],
  );

  const onCreateFirstHabit = useCallback(() => {
    navigation.navigate('AddHabit');
  }, [navigation]);

  return {
    userName: USER_NAME,
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
  };
};
