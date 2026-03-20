import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FadeSlideIn } from '../components/FadeSlideIn';
import { HabitProgressSection } from '../components/HabitProgressSection';
import { PrimaryButton } from '../components/PrimaryButton';
import { Stack } from '../components/Stack';
import { Card } from '../components/Card';
import { ScreenBackground } from '../components/ScreenBackground';
import { useHabit } from '../hooks/useHabit';
import { useHabitStats } from '../hooks/useHabitStats';
import type { HomeStackParamList } from '../navigation/types';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  radii,
  space,
} from '../theme';
import { formatYyyyMmDdLong } from '../utils/date';

type HabitDetailsRoute = RouteProp<HomeStackParamList, 'HabitDetails'>;
type HabitDetailsNav = NativeStackNavigationProp<
  HomeStackParamList,
  'HabitDetails'
>;

export const HabitDetailsScreen = () => {
  const { habitId } = useRoute<HabitDetailsRoute>().params;
  const navigation = useNavigation<HabitDetailsNav>();
  const { habits, toggleHabit, removeHabit } = useHabit();
  const [focusEpoch, setFocusEpoch] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocusEpoch((n) => n + 1);
    }, []),
  );

  const habit = useMemo(
    () => habits.find((h) => String(h.id) === String(habitId)),
    [habits, habitId, focusEpoch],
  );

  const { isDoneToday, streak, completionRate } = useHabitStats(habit?.logs);

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

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      statusBlend.value,
      [0, 1],
      [colors.semantic.dangerLight, colors.semantic.successLight],
    ),
  }));

  const badgeTextAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      statusBlend.value,
      [0, 1],
      [colors.semantic.dangerDark, colors.semantic.successDark],
    ),
  }));

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

  useEffect(() => {
    if (habit) {
      navigation.setOptions({ title: habit.title });
    } else {
      navigation.setOptions({ title: 'Habit' });
    }
  }, [habit, navigation]);

  const handleMarkCompleted = () => {
    toggleHabit(habitId);
  };

  const handleDelete = () => {
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
  };

  if (!habit) {
    return (
      <ScreenBackground style={styles.screen}>
        <FadeSlideIn index={0}>
          <Card>
            <Stack spacing={space.xl} padding={0}>
              <Text style={styles.missing}>Habit not found</Text>
              <PrimaryButton
                title="Go back"
                onPress={() => navigation.goBack()}
              />
            </Stack>
          </Card>
        </FadeSlideIn>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FadeSlideIn index={0}>
          <Card>
            <Text style={styles.sectionHeading}>Overview</Text>
            <View style={styles.createdBlock}>
              <Text style={styles.createdLabel}>Created</Text>
              <Text style={styles.createdValue}>
                {habit.createdAt ? formatYyyyMmDdLong(habit.createdAt) : '—'}
              </Text>
            </View>

            <Animated.View style={statPulseStyle}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>🔥 {streak}</Text>
                  <Text style={styles.statLabel}>Streak</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>📊 {completionRate}%</Text>
                  <Text style={styles.statLabel}>Completion</Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.statusBadge, badgeAnimatedStyle]}>
              <Animated.Text
                style={[styles.statusText, badgeTextAnimatedStyle]}
              >
                {isDoneToday ? 'Done today' : 'Not done'}
              </Animated.Text>
            </Animated.View>
          </Card>
        </FadeSlideIn>

        <FadeSlideIn index={1}>
          <Card>
            <HabitProgressSection logs={habit.logs} />
          </Card>
        </FadeSlideIn>

        <FadeSlideIn index={2}>
          <Card>
            <Text style={styles.sectionHeading}>Actions</Text>
            <Stack spacing={space.lg} padding={0}>
              <PrimaryButton
                title={
                  isDoneToday ? 'Already completed today' : 'Mark as completed'
                }
                onPress={handleMarkCompleted}
                disabled={isDoneToday}
              />

              <PrimaryButton
                variant="danger"
                title="Delete habit"
                onPress={handleDelete}
              />
            </Stack>
          </Card>
        </FadeSlideIn>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    padding: space.base,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    gap: space['3xl'],

    paddingBottom: space['7xl'],
  },

  sectionHeading: {
    marginBottom: space.lg,

    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.section,

    color: colors.text.subtle,
  },

  missing: {
    paddingVertical: space['5xl'],

    textAlign: 'center',

    color: colors.text.hint,
  },

  createdBlock: {
    marginBottom: space.xxl,
  },

  createdLabel: {
    marginBottom: space.sm,

    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.label,

    color: colors.text.hint,
  },

  createdValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,

    color: colors.text.secondary,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginBottom: space.xl,
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.semibold,

    color: colors.text.secondary,
  },

  statLabel: {
    marginTop: space.sm,

    fontSize: fontSize.sm,

    color: colors.text.hint,
  },

  statusBadge: {
    alignSelf: 'flex-start',

    paddingHorizontal: space.mdPlus,
    paddingVertical: space.smPlus,
    borderRadius: radii.pill,
  },

  statusText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

});
