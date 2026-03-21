import { Card } from '@components/Card';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { PrimaryButton } from '@components/PrimaryButton';
import { Stack } from '@components/Stack';
import { TextField } from '@components/TextField';
import { APP_DISPLAY_NAME } from '@constants/branding';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettingsScreen } from '@hooks/useSettingsScreen';
import { fontSize, space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';

import { createSettingsScreenContentStyles } from './SettingsScreenContent.styles';

export const SettingsScreenContent = () => {
  const { theme } = useAppTheme();
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );
  const styles = useMemo(
    () => createSettingsScreenContentStyles(theme.colors),
    [theme.colors],
  );

  const {
    themePreference,
    selectLightTheme,
    selectDarkTheme,
    selectSystemTheme,
    permissionLabel,
    notificationsEnabled,
    canRequestNotifications,
    requestNotificationPermission,
    openSystemSettings,
    confirmClearAllHabits,
    appVersion,
    isNotificationsSectionNative,
    permissionResolved,
    allRemindersDisabled,
    setAllRemindersDisabled,
    unifiedReminderEnabled,
    setUnifiedReminderEnabled,
    unifiedHourStr,
    unifiedMinuteStr,
    onChangeUnifiedHourStr,
    onChangeUnifiedMinuteStr,
    onBlurUnifiedHour,
    onBlurUnifiedMinute,
  } = useSettingsScreen();

  const showUnifiedTime =
    isNotificationsSectionNative &&
    !allRemindersDisabled &&
    unifiedReminderEnabled;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Stack spacing={space['3xl']} padding={0}>
        <Card>
          <Text style={shared.sectionHeading}>Reminders</Text>
          <Text style={styles.body}>
            Habit reminders are delivered locally on this device at the times you
            choose. System notification permission is required.
          </Text>
          {isNotificationsSectionNative ? (
            <>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Status</Text>
                <Text style={styles.statusValue}>{permissionLabel}</Text>
              </View>
              {canRequestNotifications ? (
                <PrimaryButton
                  title="Allow notifications"
                  onPress={requestNotificationPermission}
                />
              ) : null}
              {!notificationsEnabled && permissionResolved ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Open system settings"
                  onPress={openSystemSettings}
                  style={({ pressed }) => [
                    styles.linkButton,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Text style={styles.linkText}>
                    Open system settings…
                  </Text>
                </Pressable>
              ) : null}

              <View style={styles.prefsBlock}>
                <Text style={styles.switchHint}>
                  These options apply to every habit that has reminders turned
                  on.
                </Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>
                    Turn off all reminders
                  </Text>
                  <Switch
                    accessibilityLabel="Turn off all reminders"
                    value={allRemindersDisabled}
                    onValueChange={setAllRemindersDisabled}
                    trackColor={{
                      false: theme.colors.border.default,
                      true: theme.colors.primary.main,
                    }}
                    thumbColor={theme.colors.background.surface}
                  />
                </View>
                <View style={styles.switchRow}>
                  <Text
                    style={[
                      styles.switchLabel,
                      allRemindersDisabled && { opacity: 0.45 },
                    ]}
                  >
                    Same time for every habit
                  </Text>
                  <Switch
                    accessibilityLabel="Same time for every habit"
                    value={unifiedReminderEnabled}
                    onValueChange={setUnifiedReminderEnabled}
                    disabled={allRemindersDisabled}
                    trackColor={{
                      false: theme.colors.border.default,
                      true: theme.colors.primary.main,
                    }}
                    thumbColor={theme.colors.background.surface}
                  />
                </View>
                {showUnifiedTime ? (
                  <View>
                    <Text style={styles.timeFieldLabel}>Time (24h)</Text>
                    <View style={styles.reminderTimeRow}>
                      <View style={styles.reminderTimeFields}>
                        <View style={styles.reminderTimeField}>
                          <TextField
                            value={unifiedHourStr}
                            onChangeText={onChangeUnifiedHourStr}
                            onBlur={onBlurUnifiedHour}
                            placeholder="09"
                            accessibilityLabel="Shared reminder hour"
                            keyboardType="number-pad"
                            returnKeyType="next"
                            maxLength={2}
                          />
                        </View>
                        <Text style={styles.reminderColon}>:</Text>
                        <View style={styles.reminderTimeField}>
                          <TextField
                            value={unifiedMinuteStr}
                            onChangeText={onChangeUnifiedMinuteStr}
                            onBlur={onBlurUnifiedMinute}
                            placeholder="00"
                            accessibilityLabel="Shared reminder minutes"
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={2}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            </>
          ) : (
            <Text style={styles.body}>
              Notifications are not available on the web. Use the iOS or Android
              app.
            </Text>
          )}
        </Card>

        <Card>
          <Text style={shared.sectionHeading}>Appearance</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: themePreference === 'light' }}
            onPress={selectLightTheme}
            style={({ pressed }) => [
              styles.themeRow,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.themeRowLabel}>Light</Text>
            <Ionicons
              name={
                themePreference === 'light'
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={fontSize['3xl']}
              color={
                themePreference === 'light'
                  ? theme.colors.primary.main
                  : theme.colors.text.hint
              }
            />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: themePreference === 'dark' }}
            onPress={selectDarkTheme}
            style={({ pressed }) => [
              styles.themeRow,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.themeRowLabel}>Dark</Text>
            <Ionicons
              name={
                themePreference === 'dark'
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={fontSize['3xl']}
              color={
                themePreference === 'dark'
                  ? theme.colors.primary.main
                  : theme.colors.text.hint
              }
            />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: themePreference === 'system' }}
            onPress={selectSystemTheme}
            style={({ pressed }) => [
              styles.themeRow,
              styles.themeRowLast,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.themeRowLabel}>System</Text>
            <Ionicons
              name={
                themePreference === 'system'
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={fontSize['3xl']}
              color={
                themePreference === 'system'
                  ? theme.colors.primary.main
                  : theme.colors.text.hint
              }
            />
          </Pressable>
        </Card>

        <Card>
          <Text style={shared.sectionHeading}>Data</Text>
          <Text style={styles.body}>
            Permanently delete all habits and completion history from this
            device.
          </Text>
          <PrimaryButton
            variant="danger"
            title="Delete all habits"
            onPress={confirmClearAllHabits}
          />
        </Card>

        <Card variant="muted">
          <Text style={shared.sectionHeading}>About</Text>
          <Text style={styles.versionLine}>
            {APP_DISPLAY_NAME} · version {appVersion}
          </Text>
          <Text style={styles.versionMuted}>
            Your data is stored locally on this device.
          </Text>
        </Card>
      </Stack>
    </ScrollView>
  );
};
