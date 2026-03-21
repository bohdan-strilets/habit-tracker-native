import {
  ALL_REMINDER_WEEKDAYS,
  HABIT_REMINDER_DATA_TYPE,
  HABIT_REMINDERS_ANDROID_CHANNEL_ID,
} from '@constants/habitReminders';
import { useHabitStore } from '@store/useHabitStore';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import type { Habit } from '@/types/Habit';

import {
  normalizeReminderWeekdays,
  parseReminderTimesFromStored,
} from './habitReminderTimes';

function isNativeNotifications(): boolean {
  return Platform.OS !== 'web';
}

export function configureHabitNotificationHandler(): void {
  if (!isNativeNotifications()) return;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

let androidChannelReady = false;

async function ensureAndroidReminderChannel(): Promise<void> {
  if (!isNativeNotifications() || Platform.OS !== 'android') return;
  if (androidChannelReady) return;

  await Notifications.setNotificationChannelAsync(
    HABIT_REMINDERS_ANDROID_CHANNEL_ID,
    {
      name: 'Habit reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    },
  );
  androidChannelReady = true;
}

function isHabitReminderRequest(data: Record<string, unknown> | undefined) {
  return data?.type === HABIT_REMINDER_DATA_TYPE;
}

async function cancelAllHabitReminderNotifications(): Promise<void> {
  if (!isNativeNotifications()) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((n) =>
        isHabitReminderRequest(
          n.content.data as Record<string, unknown> | undefined,
        ),
      )
      .map((n) =>
        Notifications.cancelScheduledNotificationAsync(n.identifier),
      ),
  );
}

async function ensureNotificationPermission(): Promise<boolean> {
  if (!isNativeNotifications()) return false;

  const settings = await Notifications.getPermissionsAsync();
  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const req = await Notifications.requestPermissionsAsync();
  return (
    req.granted ||
    req.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function syncHabitRemindersWithHabits(
  habits: Habit[],
): Promise<void> {
  if (!isNativeNotifications()) return;

  await ensureAndroidReminderChannel();
  await cancelAllHabitReminderNotifications();

  const needsReminders = habits.some((h) => {
    if (h.reminder?.enabled !== true) return false;
    return parseReminderTimesFromStored(h.reminder).length > 0;
  });
  if (!needsReminders) return;

  const allowed = await ensureNotificationPermission();
  if (!allowed) return;

  for (const habit of habits) {
    if (habit.reminder?.enabled !== true) continue;
    const times = parseReminderTimesFromStored(habit.reminder);
    if (times.length === 0) continue;

    const frequency = habit.frequency ?? 'daily';
    const weekdaysRaw = normalizeReminderWeekdays(
      habit.reminder.weekdays ?? [],
    );
    const weekdaysForSchedule =
      frequency === 'weekly'
        ? weekdaysRaw.length > 0
          ? weekdaysRaw
          : [...ALL_REMINDER_WEEKDAYS]
        : [];

    for (const { hour, minute } of times) {
      if (frequency === 'weekly') {
        for (const weekday of weekdaysForSchedule) {
          const identifier = `habit-reminder:${habit.id}:w${weekday}:${hour}:${minute}`;
          await Notifications.scheduleNotificationAsync({
            identifier,
            content: {
              title: `Time for “${habit.title}”`,
              body: 'Open Bloom to check it off for today.',
              data: {
                type: HABIT_REMINDER_DATA_TYPE,
                habitId: habit.id,
              },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
              weekday,
              hour,
              minute,
              channelId: HABIT_REMINDERS_ANDROID_CHANNEL_ID,
            },
          });
        }
      } else {
        const identifier = `habit-reminder:${habit.id}:d:${hour}:${minute}`;
        await Notifications.scheduleNotificationAsync({
          identifier,
          content: {
            title: `Time for “${habit.title}”`,
            body: 'Open Bloom to check it off for today.',
            data: {
              type: HABIT_REMINDER_DATA_TYPE,
              habitId: habit.id,
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour,
            minute,
            channelId: HABIT_REMINDERS_ANDROID_CHANNEL_ID,
          },
        });
      }
    }
  }
}

/**
 * Keeps scheduled local notifications in sync with persisted habits.
 * Call once after app shell mounts (post-hydration).
 */
export function mountHabitRemindersSync(): () => void {
  return useHabitStore.subscribe((state, prev) => {
    if (state.isLoading) return;

    if (prev == null) {
      void syncHabitRemindersWithHabits(state.habits);
      return;
    }

    const finishedHydration = prev.isLoading && !state.isLoading;
    const habitsChanged = state.habits !== prev.habits;

    if (finishedHydration || habitsChanged) {
      void syncHabitRemindersWithHabits(state.habits);
    }
  });
}
