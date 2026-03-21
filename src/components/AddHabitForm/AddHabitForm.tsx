import { Card } from '@components/Card';
import { FadeSlideIn } from '@components/FadeSlideIn';
import { FieldRequirementBadge } from '@components/FieldRequirementBadge';
import { FrequencySegmentControl } from '@components/FrequencySegmentControl';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { PrimaryButton } from '@components/PrimaryButton';
import { Stack } from '@components/Stack';
import { TextField } from '@components/TextField';
import { TextFieldWithVoice } from '@components/TextFieldWithVoice';
import {
  HABIT_ACCENT_PRESETS,
  HABIT_CATEGORY_OPTIONS,
  HABIT_ICON_PRESETS,
} from '@constants/habitFormOptions';
import {
  MAX_REMINDER_TIMES_PER_HABIT,
  REMINDER_WEEKDAY_OPTIONS,
} from '@constants/habitReminders';
import {
  HABIT_DETAILS_TIMELINE_DAYS,
  HABIT_NOTES_MAX_LENGTH,
  HABIT_TITLE_MAX_LENGTH,
} from '@constants/habits';
import Ionicons from '@expo/vector-icons/Ionicons';
import { space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';

import { createAddHabitFormStyles } from './AddHabitForm.styles';
import type { AddHabitFormProps } from './AddHabitForm.types';

export const AddHabitForm = ({
  formMode = 'create',
  title,
  onChangeTitle,
  selectedIcon,
  onSelectIcon,
  selectedAccentHex,
  onSelectAccentHex,
  categoryId,
  onSelectCategory,
  notes,
  onChangeNotes,
  frequency,
  onSelectFrequency,
  trackAsCount,
  onChangeTrackAsCount,
  targetStr,
  onChangeTargetStr,
  reminderEnabled,
  onChangeReminderEnabled,
  reminderFields,
  onAddReminderTime,
  onRemoveReminderTime,
  onChangeReminderHourStr,
  onChangeReminderMinuteStr,
  onBlurReminderHour,
  onBlurReminderMinute,
  reminderWeekdays,
  onToggleReminderWeekday,
  onSave,
  entrancePlayKey,
}: AddHabitFormProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createAddHabitFormStyles(theme.colors),
    [theme.colors],
  );
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );

  const isEdit = formMode === 'edit';
  const trimmed = title.trim();
  const canSave = trimmed.length > 0;
  const parsedTarget = parseInt(targetStr.replace(/\s/g, ''), 10);
  const targetOk =
    !trackAsCount ||
    (targetStr.trim().length > 0 &&
      Number.isFinite(parsedTarget) &&
      parsedTarget >= 1);

  const canAddMoreReminderTimes =
    reminderFields.length < MAX_REMINDER_TIMES_PER_HABIT;

  const handleSave = () => {
    if (!canSave || !targetOk) return;
    Keyboard.dismiss();
    onSave();
  };

  return (
    <View style={styles.root}>
      <FadeSlideIn index={0} playKey={entrancePlayKey}>
        <View style={styles.formStack}>
          <Card>
            <Text style={styles.headline}>
              {isEdit ? t('habitForm.headlineEdit') : t('habitForm.headlineNew')}
            </Text>
            {!isEdit ? (
              <Text style={styles.lead}>{t('habitForm.leadNew')}</Text>
            ) : (
              <Text style={styles.lead}>{t('habitForm.leadEdit')}</Text>
            )}
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>{t('habitForm.appearance')}</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>{t('habitForm.icon')}</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalScroll}
                  contentContainerStyle={styles.horizontalContent}
                >
                  {HABIT_ICON_PRESETS.map((emoji) => {
                    const selected = selectedIcon === emoji;
                    return (
                      <Pressable
                        key={emoji}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={t('habitForm.iconA11y', {
                          emoji,
                        })}
                        onPress={() => onSelectIcon(emoji)}
                        style={[
                          styles.emojiHit,
                          selected && styles.emojiHitSelected,
                        ]}
                      >
                        <Text style={styles.emojiGlyph}>{emoji}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>{t('habitForm.accent')}</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalScroll}
                  contentContainerStyle={styles.horizontalContent}
                >
                  {HABIT_ACCENT_PRESETS.map(({ hex, labelKey }) => {
                    const label = t(`habitForm.accentLabels.${labelKey}`);
                    const selected = selectedAccentHex === hex;
                    return (
                      <Pressable
                        key={hex}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={t('habitForm.colorA11y', { label })}
                        onPress={() => onSelectAccentHex(hex)}
                        style={[
                          styles.colorHit,
                          { backgroundColor: hex },
                          selected && styles.colorHitSelected,
                        ]}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </Stack>
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>{t('habitForm.basics')}</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>{t('habitForm.habitName')}</Text>
                  <FieldRequirementBadge kind="required" />
                </View>
                <TextFieldWithVoice
                  value={title}
                  onChangeText={onChangeTitle}
                  placeholder={t('habitForm.namePlaceholder')}
                  accessibilityLabel={t('habitForm.nameA11y')}
                  voiceAccessibilityLabel={t('habitForm.voiceNameA11y')}
                  maxLength={HABIT_TITLE_MAX_LENGTH}
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                  autoCorrect
                  autoCapitalize="sentences"
                />
                <Text style={styles.counter}>
                  {title.length}/{HABIT_TITLE_MAX_LENGTH}
                </Text>
              </View>
            </Stack>
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>{t('habitForm.details')}</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>{t('habitForm.category')}</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.chipScroll}
                  contentContainerStyle={styles.chipScrollContent}
                >
                  {HABIT_CATEGORY_OPTIONS.map((cat) => {
                    const selected = categoryId === cat.id;
                    return (
                      <Pressable
                        key={cat.id}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        onPress={() => onSelectCategory(cat.id)}
                        style={[
                          styles.categoryChip,
                          selected && styles.categoryChipSelected,
                        ]}
                      >
                        <Text style={styles.categoryChipEmoji}>
                          {cat.emoji}
                        </Text>
                        <Text style={styles.categoryChipLabel}>
                          {t(`habitForm.categories.${cat.id}`)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>{t('habitForm.notes')}</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <TextFieldWithVoice
                  value={notes}
                  onChangeText={onChangeNotes}
                  placeholder={t('habitForm.notesPlaceholder')}
                  accessibilityLabel={t('habitForm.notesA11y')}
                  voiceAccessibilityLabel={t('habitForm.voiceNotesA11y')}
                  multiline
                  maxLength={HABIT_NOTES_MAX_LENGTH}
                  style={styles.notesInput}
                />
                <Text style={styles.counter}>
                  {notes.length}/{HABIT_NOTES_MAX_LENGTH}
                </Text>
              </View>
            </Stack>
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>
              {t('habitForm.scheduleGoal')}
            </Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>
                    {t('habitForm.frequency')}
                  </Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <FrequencySegmentControl
                  value={frequency}
                  onChange={onSelectFrequency}
                />
              </View>

              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>{t('habitForm.dailyGoal')}</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <Text style={styles.switchHint}>{t('habitForm.countHint')}</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>{t('habitForm.enableTarget')}</Text>
                  <Switch
                    accessibilityLabel={t('habitForm.trackCountA11y')}
                    value={trackAsCount}
                    onValueChange={onChangeTrackAsCount}
                    trackColor={{
                      false: theme.colors.border.default,
                      true: theme.colors.primary.main,
                    }}
                    thumbColor={theme.colors.background.surface}
                  />
                </View>
              </View>

              {trackAsCount ? (
                <View>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldLabel}>
                      {t('habitForm.targetPerDay')}
                    </Text>
                    <FieldRequirementBadge kind="required" />
                  </View>
                  <TextField
                    value={targetStr}
                    onChangeText={onChangeTargetStr}
                    placeholder={t('habitForm.targetPlaceholder')}
                    accessibilityLabel={t('habitForm.targetA11y')}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                    maxLength={4}
                  />
                </View>
              ) : null}
            </Stack>
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>{t('habitForm.reminders')}</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>
                    {t('habitForm.pushNotifications')}
                  </Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <Text style={styles.switchHint}>{t('habitForm.remindersHint')}</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>
                    {t('habitForm.enableReminders')}
                  </Text>
                  <Switch
                    accessibilityLabel={t('habitForm.enableRemindersA11y')}
                    value={reminderEnabled}
                    onValueChange={onChangeReminderEnabled}
                    trackColor={{
                      false: theme.colors.border.default,
                      true: theme.colors.primary.main,
                    }}
                    thumbColor={theme.colors.background.surface}
                  />
                </View>
              </View>

              {reminderEnabled ? (
                <View>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldLabel}>
                      {t('habitForm.reminderTimes')}
                    </Text>
                    <FieldRequirementBadge kind="required" />
                  </View>
                  <Text style={styles.switchHint}>
                    {t('habitForm.reminderTimesHint', {
                      max: MAX_REMINDER_TIMES_PER_HABIT,
                    })}
                  </Text>
                  {reminderFields.map((slot, index) => (
                    <View key={`reminder-time-${index}`} style={styles.reminderTimeRow}>
                      <View style={styles.reminderTimeFields}>
                        <View style={styles.reminderTimeField}>
                          <TextField
                            value={slot.hourStr}
                            onChangeText={(t) =>
                              onChangeReminderHourStr(index, t)
                            }
                            onBlur={() => onBlurReminderHour(index)}
                            placeholder="09"
                            accessibilityLabel={t('habitForm.reminderHourA11y', {
                              n: index + 1,
                            })}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={2}
                          />
                        </View>
                        <Text style={styles.reminderColon}>:</Text>
                        <View style={styles.reminderTimeField}>
                          <TextField
                            value={slot.minuteStr}
                            onChangeText={(t) =>
                              onChangeReminderMinuteStr(index, t)
                            }
                            onBlur={() => onBlurReminderMinute(index)}
                            placeholder="00"
                            accessibilityLabel={t('habitForm.reminderMinuteA11y', {
                              n: index + 1,
                            })}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={2}
                          />
                        </View>
                      </View>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t('habitForm.removeReminderA11y', {
                          n: index + 1,
                        })}
                        onPress={() => onRemoveReminderTime(index)}
                        disabled={reminderFields.length <= 1}
                        style={styles.reminderRemoveHit}
                        hitSlop={8}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={22}
                          color={
                            reminderFields.length <= 1
                              ? theme.colors.text.faint
                              : theme.colors.semantic.dangerDark
                          }
                        />
                      </Pressable>
                    </View>
                  ))}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t('habitForm.addAnotherTimeA11y')}
                    onPress={onAddReminderTime}
                    disabled={!canAddMoreReminderTimes}
                    style={styles.reminderAddTime}
                  >
                    <Text
                      style={[
                        styles.reminderAddTimeLabel,
                        !canAddMoreReminderTimes && styles.reminderAddTimeDisabled,
                      ]}
                    >
                      {t('habitForm.addAnotherTime')}
                    </Text>
                  </Pressable>

                  {frequency === 'weekly' ? (
                    <View>
                      <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabelText}>
                          {t('habitForm.reminderDays')}
                        </Text>
                        <FieldRequirementBadge kind="required" />
                      </View>
                      <Text style={styles.switchHint}>
                        {t('habitForm.reminderDaysHint')}
                      </Text>
                      <View style={styles.chipScrollContent}>
                        {REMINDER_WEEKDAY_OPTIONS.map(({ value }) => {
                          const selected = reminderWeekdays.includes(value);
                          return (
                            <Pressable
                              key={value}
                              accessibilityRole="button"
                              accessibilityState={{ selected }}
                              onPress={() => onToggleReminderWeekday(value)}
                              style={[
                                styles.categoryChip,
                                selected && styles.categoryChipSelected,
                              ]}
                            >
                              <Text style={styles.categoryChipLabel}>
                                {t(`habitForm.weekdays.${String(value)}`)}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </Stack>
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>{t('habitForm.saveSection')}</Text>
            <Stack spacing={space.lg} padding={0}>
              {!canSave && title.length === 0 ? (
                <Text style={styles.inlineHint}>
                  {isEdit
                    ? t('habitForm.hintNeedNameEdit')
                    : t('habitForm.hintNeedNameNew')}
                </Text>
              ) : null}

              <PrimaryButton
                title={
                  isEdit ? t('habitForm.saveChanges') : t('habitForm.createHabit')
                }
                onPress={handleSave}
                disabled={!canSave || !targetOk}
              />
            </Stack>
          </Card>
        </View>
      </FadeSlideIn>

      {!isEdit ? (
        <FadeSlideIn index={1} playKey={entrancePlayKey}>
          <Card variant="muted">
            <Text style={styles.tipsTitle}>{t('habitForm.tipsTitle')}</Text>
            <Text style={styles.tipLine}>
              {t('habitForm.tip1', { days: HABIT_DETAILS_TIMELINE_DAYS })}
            </Text>
            <Text style={styles.tipLine}>{t('habitForm.tip2')}</Text>
            <Text style={[styles.tipLine, styles.tipLineLast]}>
              {t('habitForm.tip3')}
            </Text>
          </Card>
        </FadeSlideIn>
      ) : null}
    </View>
  );
};
