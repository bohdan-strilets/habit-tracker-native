import { Card } from '@components/Card';
import { FadeSlideIn } from '@components/FadeSlideIn';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { PrimaryButton } from '@components/PrimaryButton';
import { Stack } from '@components/Stack';
import { TextField } from '@components/TextField';
import { APP_DISPLAY_NAME } from '@constants/branding';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettingsScreen } from '@hooks/useSettingsScreen';
import { useLanguageStore } from '@store/useLanguageStore';
import { fontSize, space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';

import type { AppLanguage } from '@/types/Language';

import { createSettingsScreenContentStyles } from './SettingsScreenContent.styles';

export const SettingsScreenContent = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const selectLanguage = (lang: AppLanguage) => () => setLanguage(lang);
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
        <FadeSlideIn index={0}>
          <Card>
            <Text style={shared.sectionHeading}>{t('settings.remindersTitle')}</Text>
            <Text style={styles.body}>{t('settings.remindersLead')}</Text>
            {isNotificationsSectionNative ? (
              <>
                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>{t('settings.status')}</Text>
                  <Text style={styles.statusValue}>{permissionLabel}</Text>
                </View>
                {canRequestNotifications ? (
                  <PrimaryButton
                    title={t('settings.allowNotifications')}
                    onPress={requestNotificationPermission}
                  />
                ) : null}
                {!notificationsEnabled && permissionResolved ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t('settings.openSystemSettingsA11y')}
                    onPress={openSystemSettings}
                    style={({ pressed }) => [
                      styles.linkButton,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={styles.linkText}>
                      {t('settings.openSystemSettings')}
                    </Text>
                  </Pressable>
                ) : null}

                <View style={styles.prefsBlock}>
                  <Text style={styles.switchHint}>
                    {t('settings.globalRulesHint')}
                  </Text>
                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>
                      {t('settings.turnOffAll')}
                    </Text>
                    <Switch
                      accessibilityLabel={t('settings.turnOffAll')}
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
                      {t('settings.sameTimeAll')}
                    </Text>
                    <Switch
                      accessibilityLabel={t('settings.sameTimeAll')}
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
                      <Text style={styles.timeFieldLabel}>{t('settings.time24h')}</Text>
                      <View style={styles.reminderTimeRow}>
                        <View style={styles.reminderTimeFields}>
                          <View style={styles.reminderTimeField}>
                            <TextField
                              value={unifiedHourStr}
                              onChangeText={onChangeUnifiedHourStr}
                              onBlur={onBlurUnifiedHour}
                              placeholder="09"
                              accessibilityLabel={t('settings.sharedHourA11y')}
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
                              accessibilityLabel={t('settings.sharedMinuteA11y')}
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
              <Text style={styles.body}>{t('settings.webOnly')}</Text>
            )}
          </Card>
        </FadeSlideIn>

        <FadeSlideIn index={1}>
          <Card>
            <Text style={shared.sectionHeading}>{t('settings.appearance')}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: themePreference === 'light' }}
              onPress={selectLightTheme}
              style={({ pressed }) => [
                styles.themeRow,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.themeRowLabel}>{t('settings.themeLight')}</Text>
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
              <Text style={styles.themeRowLabel}>{t('settings.themeDark')}</Text>
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
              <Text style={styles.themeRowLabel}>{t('settings.themeSystem')}</Text>
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
        </FadeSlideIn>

        <FadeSlideIn index={2}>
          <Card>
            <Text style={shared.sectionHeading}>{t('settings.languageTitle')}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: language === 'en' }}
              onPress={selectLanguage('en')}
              style={({ pressed }) => [
                styles.themeRow,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.themeRowLabel}>{t('settings.languageEnglish')}</Text>
              <Ionicons
                name={
                  language === 'en' ? 'checkmark-circle' : 'ellipse-outline'
                }
                size={fontSize['3xl']}
                color={
                  language === 'en'
                    ? theme.colors.primary.main
                    : theme.colors.text.hint
                }
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: language === 'uk' }}
              onPress={selectLanguage('uk')}
              style={({ pressed }) => [
                styles.themeRow,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.themeRowLabel}>{t('settings.languageUkrainian')}</Text>
              <Ionicons
                name={
                  language === 'uk' ? 'checkmark-circle' : 'ellipse-outline'
                }
                size={fontSize['3xl']}
                color={
                  language === 'uk'
                    ? theme.colors.primary.main
                    : theme.colors.text.hint
                }
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: language === 'pl' }}
              onPress={selectLanguage('pl')}
              style={({ pressed }) => [
                styles.themeRow,
                styles.themeRowLast,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.themeRowLabel}>{t('settings.languagePolish')}</Text>
              <Ionicons
                name={
                  language === 'pl' ? 'checkmark-circle' : 'ellipse-outline'
                }
                size={fontSize['3xl']}
                color={
                  language === 'pl'
                    ? theme.colors.primary.main
                    : theme.colors.text.hint
                }
              />
            </Pressable>
          </Card>
        </FadeSlideIn>

        <FadeSlideIn index={3}>
          <Card>
            <Text style={shared.sectionHeading}>{t('settings.dataTitle')}</Text>
            <Text style={styles.body}>{t('settings.dataLead')}</Text>
            <PrimaryButton
              variant="danger"
              title={t('settings.deleteAllHabits')}
              onPress={confirmClearAllHabits}
            />
          </Card>
        </FadeSlideIn>

        <FadeSlideIn index={4}>
          <Card variant="muted">
            <Text style={shared.sectionHeading}>{t('settings.aboutTitle')}</Text>
            <Text style={styles.versionLine}>
              {t('settings.versionLine', {
                name: APP_DISPLAY_NAME,
                version: appVersion,
              })}
            </Text>
            <Text style={styles.versionMuted}>{t('settings.aboutFoot')}</Text>
          </Card>
        </FadeSlideIn>
      </Stack>
    </ScrollView>
  );
};
