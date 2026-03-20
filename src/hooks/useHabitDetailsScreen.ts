import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { HomeStackParamList } from '../navigation/types';
import { useAppTheme } from '../theme';
import { useHabit } from './useHabit';
import { useHabitStats } from './useHabitStats';

type HabitDetailsRoute = RouteProp<HomeStackParamList, 'HabitDetails'>;
type HabitDetailsNav = NativeStackNavigationProp<
  HomeStackParamList,
  'HabitDetails'
>;

export const useHabitDetailsScreen = () => {
  const { habitId } = useRoute<HabitDetailsRoute>().params;
  const navigation = useNavigation<HabitDetailsNav>();
  const { habits, toggleHabit, incrementCountToday, removeHabit } = useHabit();
  const [focusEpoch, setFocusEpoch] = useState(0);
  const { theme } = useAppTheme();

  const badgeBg0 = theme.colors.semantic.dangerLight;
  const badgeBg1 = theme.colors.semantic.successLight;
  const badgeFg0 = theme.colors.semantic.dangerDark;
  const badgeFg1 = theme.colors.semantic.successDark;

  useFocusEffect(
    useCallback(() => {
      setFocusEpoch((n) => n + 1);
    }, []),
  );

  const habit = useMemo(
    () => habits.find((h) => String(h.id) === String(habitId)),
    [habits, habitId, focusEpoch],
  );

  const { isDoneToday, streak, completionRate } = useHabitStats(habit);

  const blendHabitKey = habit
    ? String(habitId)
    : `pending-${String(habitId)}`;

  const statusBlend = useSharedValue(habit ? (isDoneToday ? 1 : 0) : 0);
  const prevBlendKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevBlendKeyRef.current;
    prevBlendKeyRef.current = blendHabitKey;

    if (prev !== blendHabitKey) {
      statusBlend.value = habit ? (isDoneToday ? 1 : 0) : 0;
      return;
    }

    if (!habit) return;

    statusBlend.value = withTiming(isDoneToday ? 1 : 0, {
      duration: 440,
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
  }, [blendHabitKey, habit, isDoneToday, statusBlend]);

  const badgeAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        statusBlend.value,
        [0, 1],
        [badgeBg0, badgeBg1],
      ),
    }),
    [badgeBg0, badgeBg1],
  );

  const badgeTextAnimatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        statusBlend.value,
        [0, 1],
        [badgeFg0, badgeFg1],
      ),
    }),
    [badgeFg0, badgeFg1],
  );

  const statPulse = useSharedValue(1);
  const skipStatPulse = useRef(true);
  useEffect(() => {
    skipStatPulse.current = true;
  }, [habitId]);

  useEffect(() => {
    if (skipStatPulse.current) {
      skipStatPulse.current = false;
      return;
    }
    statPulse.value = 1;
    statPulse.value = withSequence(
      withTiming(1.045, {
        duration: 140,
        easing: Easing.out(Easing.quad),
      }),
      withSpring(1, {
        stiffness: 320,
        damping: 20,
        mass: 0.35,
      }),
    );
  }, [streak, completionRate, statPulse]);

  const statPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: statPulse.value }],
  }));

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const markCompleted = useCallback(() => {
    const h = habits.find((x) => String(x.id) === String(habitId));
    const kind = h?.kind ?? 'boolean';
    if (kind === 'count') {
      incrementCountToday(habitId);
    } else {
      toggleHabit(habitId);
    }
  }, [habitId, habits, incrementCountToday, toggleHabit]);

  const confirmDelete = useCallback(() => {
    Alert.alert('Delete habit', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeHabit(habitId);
          navigation.goBack();
        },
      },
    ]);
  }, [habitId, navigation, removeHabit]);

  return {
    habit,
    isDoneToday,
    streak,
    completionRate,
    badgeAnimatedStyle,
    badgeTextAnimatedStyle,
    statPulseStyle,
    goBack,
    markCompleted,
    confirmDelete,
  };
};
