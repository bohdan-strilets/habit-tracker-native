import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { useHabit } from '../hooks/useHabit';
import { useHabitStats } from '../hooks/useHabitStats';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { formatYyyyMmDdLong } from '../utils/date';

type HabitDetailsRoute = RouteProp<RootStackParamList, 'HabitDetails'>;
type HabitDetailsNav = NativeStackNavigationProp<
  RootStackParamList,
  'HabitDetails'
>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
      ['#fdecec', '#e6f7ee'],
    ),
  }));

  const badgeTextAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      statusBlend.value,
      [0, 1],
      ['#b71c1c', '#1b5e20'],
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

  const dangerScale = useSharedValue(1);
  const dangerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dangerScale.value }],
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
      <View style={styles.screen}>
        <FadeSlideIn index={0}>
          <Card>
            <Stack spacing={16} padding={0}>
              <Text style={styles.missing}>Habit not found</Text>
              <PrimaryButton
                title="Go back"
                onPress={() => navigation.goBack()}
              />
            </Stack>
          </Card>
        </FadeSlideIn>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
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
            <Stack spacing={14} padding={0}>
              <PrimaryButton
                title={
                  isDoneToday ? 'Already completed today' : 'Mark as completed'
                }
                onPress={handleMarkCompleted}
                disabled={isDoneToday}
              />

              <AnimatedPressable
                accessibilityRole="button"
                onPress={handleDelete}
                onPressIn={() => {
                  dangerScale.value = withSpring(0.97, {
                    stiffness: 420,
                    damping: 22,
                    mass: 0.25,
                  });
                }}
                onPressOut={() => {
                  dangerScale.value = withSpring(1, {
                    stiffness: 420,
                    damping: 22,
                    mass: 0.25,
                  });
                }}
                style={[styles.dangerButton, dangerAnimatedStyle]}
              >
                <Text style={styles.dangerText}>Delete habit</Text>
              </AnimatedPressable>
            </Stack>
          </Card>
        </FadeSlideIn>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    padding: 12,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    gap: 20,

    paddingBottom: 32,
  },

  sectionHeading: {
    marginBottom: 14,

    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,

    color: '#666',
  },

  missing: {
    paddingVertical: 24,

    textAlign: 'center',

    color: '#888',
  },

  createdBlock: {
    marginBottom: 18,
  },

  createdLabel: {
    marginBottom: 4,

    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,

    color: '#888',
  },

  createdValue: {
    fontSize: 16,
    fontWeight: '500',

    color: '#222',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginBottom: 16,
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '600',

    color: '#222',
  },

  statLabel: {
    marginTop: 4,

    fontSize: 12,

    color: '#888',
  },

  statusBadge: {
    alignSelf: 'flex-start',

    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },

  dangerButton: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 48,
    borderRadius: 12,
    borderWidth: 1,

    backgroundColor: '#fdecec',

    borderColor: '#f0b4b4',
  },

  dangerText: {
    fontSize: 16,
    fontWeight: '600',

    color: '#c62828',
  },
});
