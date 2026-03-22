import { localeTagForAppLanguage } from '@i18n/localeTag';
import { getStreak } from '@domain/habit';
import type { HomeStackParamList, MainTabParamList } from '@navigation/types';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { habitToHomeScreenHabit } from '@utils/habitToHomeScreenHabit';
import type { AppLanguage } from '@/types/Language';
import type { HomeScreenHabitSection } from '@/types/homeScreen';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, LayoutAnimation, Platform, UIManager } from 'react-native';

import { useHabit } from './useHabit';

const USER_NAME = 'Bohdan';

type HomeNav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export const useHomeScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<HomeNav>();
  const {
    habits,
    toggleHabit,
    incrementCountToday,
    removeHabit,
    reorderActiveHabits,
  } = useHabit();

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const now = useMemo(() => new Date(), []);
  const dateLine = useMemo(() => {
    const locale = localeTagForAppLanguage(i18n.language as AppLanguage);
    return now.toLocaleDateString(locale, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }, [now, i18n.language]);
  const greeting = useMemo(() => {
    const hour = now.getHours();
    if (hour < 12) return t('greeting.morning');
    if (hour < 17) return t('greeting.afternoon');
    return t('greeting.evening');
  }, [now, t]);

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
    if (active.length)
      next.push({
        key: 'active',
        title: t('home.sectionActive'),
        data: active,
      });
    if (completed.length)
      next.push({
        key: 'completed',
        title: t('home.sectionCompleted'),
        data: completed,
      });
    return { completedCount: done, total: totalH, sections: next };
  }, [rows, t]);

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

  const onEditHabit = useCallback(
    (id: string) => {
      navigation.navigate('EditHabit', { habitId: id });
    },
    [navigation],
  );

  const onCreateFirstHabit = useCallback(() => {
    navigation.navigate('AddHabit');
  }, [navigation]);

  const onDeleteHabit = useCallback(
    (id: string) => {
      Alert.alert(t('home.deleteTitle'), t('home.deleteMessage'), [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            removeHabit(id);
          },
        },
      ]);
    },
    [removeHabit, t],
  );

  const onReorderActiveHabits = useCallback(
    (orderedActiveIds: string[]) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      reorderActiveHabits(orderedActiveIds);
    },
    [reorderActiveHabits],
  );

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
    onEditHabit,
    onCreateFirstHabit,
    onDeleteHabit,
    onReorderActiveHabits,
  };
};
