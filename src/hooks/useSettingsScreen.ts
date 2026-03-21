import { useFocusEffect } from '@react-navigation/native';
import { useHabitStore } from '@store/useHabitStore';
import { useReminderPrefsStore } from '@store/useReminderPrefsStore';
import { useAppTheme } from '@theme';
import {
  normalizeReminderFieldsForCommit,
  reminderFieldsToTimes,
  sanitizeReminderTimeDigitInput,
} from '@utils/habitReminderTimes';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

function formatNotificationPermissionLabel(
  status: Notifications.NotificationPermissionsStatus | null,
): string {
  if (status == null) return '…';

  if (Platform.OS === 'web') {
    return 'Mobile app only';
  }

  if (
    status.granted ||
    status.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return 'On';
  }

  if (status.canAskAgain) {
    return 'Permission needed';
  }

  return 'Off in system settings';
}

export function useSettingsScreen() {
  const { preference, setPreference } = useAppTheme();
  const clean = useHabitStore((s) => s.clean);

  const {
    allDisabled,
    unifiedEnabled,
    unifiedHour,
    unifiedMinute,
    setAllDisabled,
    setUnifiedEnabled,
    setUnifiedTime,
  } = useReminderPrefsStore(
    useShallow((s) => ({
      allDisabled: s.allDisabled,
      unifiedEnabled: s.unifiedEnabled,
      unifiedHour: s.unifiedHour,
      unifiedMinute: s.unifiedMinute,
      setAllDisabled: s.setAllDisabled,
      setUnifiedEnabled: s.setUnifiedEnabled,
      setUnifiedTime: s.setUnifiedTime,
    })),
  );

  const [hourStr, setHourStr] = useState(() =>
    String(unifiedHour).padStart(2, '0'),
  );
  const [minuteStr, setMinuteStr] = useState(() =>
    String(unifiedMinute).padStart(2, '0'),
  );

  useEffect(() => {
    setHourStr(String(unifiedHour).padStart(2, '0'));
    setMinuteStr(String(unifiedMinute).padStart(2, '0'));
  }, [unifiedHour, unifiedMinute]);

  const [permission, setPermission] =
    useState<Notifications.NotificationPermissionsStatus | null>(null);

  const refreshPermission = useCallback(async () => {
    if (Platform.OS === 'web') {
      setPermission(null);
      return;
    }
    const next = await Notifications.getPermissionsAsync();
    setPermission(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refreshPermission();
    }, [refreshPermission]),
  );

  const requestNotificationPermission = useCallback(async () => {
    if (Platform.OS === 'web') return;
    await Notifications.requestPermissionsAsync();
    setPermission(await Notifications.getPermissionsAsync());
  }, []);

  const openSystemSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

  const selectLightTheme = useCallback(() => {
    setPreference('light');
  }, [setPreference]);

  const selectDarkTheme = useCallback(() => {
    setPreference('dark');
  }, [setPreference]);

  const selectSystemTheme = useCallback(() => {
    setPreference('system');
  }, [setPreference]);

  const commitUnifiedTimeFromFields = useCallback(() => {
    const rows = normalizeReminderFieldsForCommit([
      { hourStr, minuteStr },
    ]);
    setHourStr(rows[0].hourStr);
    setMinuteStr(rows[0].minuteStr);
    const times = reminderFieldsToTimes(rows);
    const t = times[0];
    if (t) {
      setUnifiedTime(t.hour, t.minute);
    }
  }, [hourStr, minuteStr, setUnifiedTime]);

  const onChangeUnifiedHourStr = useCallback((raw: string) => {
    setHourStr(sanitizeReminderTimeDigitInput(raw));
  }, []);

  const onChangeUnifiedMinuteStr = useCallback((raw: string) => {
    setMinuteStr(sanitizeReminderTimeDigitInput(raw));
  }, []);

  const onBlurUnifiedHour = useCallback(() => {
    commitUnifiedTimeFromFields();
  }, [commitUnifiedTimeFromFields]);

  const onBlurUnifiedMinute = useCallback(() => {
    commitUnifiedTimeFromFields();
  }, [commitUnifiedTimeFromFields]);

  const confirmClearAllHabits = useCallback(() => {
    Alert.alert(
      'Delete all habits',
      'This cannot be undone. All habits and completion history will be removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete all',
          style: 'destructive',
          onPress: () => {
            clean();
          },
        },
      ],
    );
  }, [clean]);

  const appVersion =
    Constants.expoConfig?.version ?? Constants.nativeAppVersion ?? '—';

  const notificationsEnabled =
    Platform.OS !== 'web' &&
    permission != null &&
    (permission.granted ||
      permission.ios?.status ===
        Notifications.IosAuthorizationStatus.PROVISIONAL);

  const canRequestNotifications =
    Platform.OS !== 'web' &&
    permission != null &&
    !notificationsEnabled &&
    permission.canAskAgain;

  const permissionResolved = Platform.OS === 'web' || permission != null;

  return {
    themePreference: preference,
    selectLightTheme,
    selectDarkTheme,
    selectSystemTheme,
    permissionLabel: formatNotificationPermissionLabel(permission),
    notificationsEnabled,
    canRequestNotifications,
    requestNotificationPermission,
    openSystemSettings,
    confirmClearAllHabits,
    appVersion,
    isNotificationsSectionNative: Platform.OS !== 'web',
    permissionResolved,
    allRemindersDisabled: allDisabled,
    setAllRemindersDisabled: setAllDisabled,
    unifiedReminderEnabled: unifiedEnabled,
    setUnifiedReminderEnabled: setUnifiedEnabled,
    unifiedHourStr: hourStr,
    unifiedMinuteStr: minuteStr,
    onChangeUnifiedHourStr,
    onChangeUnifiedMinuteStr,
    onBlurUnifiedHour,
    onBlurUnifiedMinute,
  };
}
