import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
        <Card>
          <Stack spacing={16} padding={0}>
            <Text style={styles.missing}>Habit not found</Text>
            <PrimaryButton
              title="Go back"
              onPress={() => navigation.goBack()}
            />
          </Stack>
        </Card>
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
        <Card>
          <Text style={styles.sectionHeading}>Overview</Text>
          <View style={styles.createdBlock}>
            <Text style={styles.createdLabel}>Created</Text>
            <Text style={styles.createdValue}>
              {habit.createdAt
                ? formatYyyyMmDdLong(habit.createdAt)
                : '—'}
            </Text>
          </View>

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

          <View
            style={[
              styles.statusBadge,
              isDoneToday ? styles.done : styles.notDone,
            ]}
          >
            <Text style={styles.statusText}>
              {isDoneToday ? 'Done today' : 'Not done'}
            </Text>
          </View>
        </Card>

        <Card>
          <HabitProgressSection logs={habit.logs} />
        </Card>

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

            <Pressable
              accessibilityRole="button"
              onPress={handleDelete}
              style={({ pressed }) => [
                styles.dangerButton,
                pressed && styles.dangerPressed,
              ]}
            >
              <Text style={styles.dangerText}>Delete habit</Text>
            </Pressable>
          </Stack>
        </Card>
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

  done: {
    backgroundColor: '#e6f7ee',
  },

  notDone: {
    backgroundColor: '#fdecec',
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

  dangerPressed: {
    opacity: 0.85,
  },

  dangerText: {
    fontSize: 16,
    fontWeight: '600',

    color: '#c62828',
  },
});
