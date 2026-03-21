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
              {isEdit ? 'Edit habit' : 'New habit'}
            </Text>
            {!isEdit ? (
              <Text style={styles.lead}>
                Only habit name is required. Icon, color, category, notes,
                frequency, and number goal all have defaults or are optional —
                badges show which is which.
              </Text>
            ) : (
              <Text style={styles.lead}>
                Update name, appearance, or schedule. Your history and check-ins
                stay as they are.
              </Text>
            )}
          </Card>

          <Card>
            <Text style={shared.sectionHeading}>Appearance</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>Icon</Text>
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
                        accessibilityLabel={`Icon ${emoji}`}
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
                  <Text style={styles.sectionLabelText}>Accent color</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalScroll}
                  contentContainerStyle={styles.horizontalContent}
                >
                  {HABIT_ACCENT_PRESETS.map(({ hex, label }) => {
                    const selected = selectedAccentHex === hex;
                    return (
                      <Pressable
                        key={hex}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={`Color ${label}`}
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
            <Text style={shared.sectionHeading}>Basics</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Habit name</Text>
                  <FieldRequirementBadge kind="required" />
                </View>
                <TextFieldWithVoice
                  value={title}
                  onChangeText={onChangeTitle}
                  placeholder="e.g. Morning stretch, Read 10 minutes"
                  accessibilityLabel="Habit name"
                  voiceAccessibilityLabel="Hold to dictate habit name"
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
            <Text style={shared.sectionHeading}>Details</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>Category</Text>
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
                          {cat.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Notes</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <TextFieldWithVoice
                  value={notes}
                  onChangeText={onChangeNotes}
                  placeholder="Why it matters, triggers, tips…"
                  accessibilityLabel="Habit notes"
                  voiceAccessibilityLabel="Hold to dictate notes"
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
            <Text style={shared.sectionHeading}>Schedule & goal</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>Frequency</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <FrequencySegmentControl
                  value={frequency}
                  onChange={onSelectFrequency}
                />
              </View>

              <View>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Daily number goal</Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <Text style={styles.switchHint}>
                  Turn on for a count target (e.g. glasses of water, steps).
                </Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Enable target</Text>
                  <Switch
                    accessibilityLabel="Track as count toward a daily goal"
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
                    <Text style={styles.fieldLabel}>Target per day</Text>
                    <FieldRequirementBadge kind="required" />
                  </View>
                  <TextField
                    value={targetStr}
                    onChangeText={onChangeTargetStr}
                    placeholder="e.g. 8"
                    accessibilityLabel="Daily target number"
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
            <Text style={shared.sectionHeading}>Reminders</Text>
            <Stack spacing={space.lg} padding={0}>
              <View>
                <View style={styles.sectionLabelRow}>
                  <Text style={styles.sectionLabelText}>
                    Push notifications
                  </Text>
                  <FieldRequirementBadge kind="optional" />
                </View>
                <Text style={styles.switchHint}>
                  Local notifications at the times you set below. For weekly
                  habits you can also pick which days apply.
                </Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Enable reminders</Text>
                  <Switch
                    accessibilityLabel="Enable habit reminder notifications"
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
                    <Text style={styles.fieldLabel}>Reminder times</Text>
                    <FieldRequirementBadge kind="required" />
                  </View>
                  <Text style={styles.switchHint}>
                    Up to {MAX_REMINDER_TIMES_PER_HABIT} times per day, 24-hour
                    clock (device local time). Digits only — you can clear a
                    field to retype; when you leave it empty, hour defaults to 09
                    and minute to 00.
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
                            accessibilityLabel={`Reminder ${index + 1} hour`}
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
                            accessibilityLabel={`Reminder ${index + 1} minute`}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={2}
                          />
                        </View>
                      </View>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove reminder time ${index + 1}`}
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
                    accessibilityLabel="Add another reminder time"
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
                      + Add another time
                    </Text>
                  </Pressable>

                  {frequency === 'weekly' ? (
                    <View>
                      <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabelText}>
                          Reminder days
                        </Text>
                        <FieldRequirementBadge kind="required" />
                      </View>
                      <Text style={styles.switchHint}>
                        Weekly habit: pick which days you want a nudge (at least
                        one).
                      </Text>
                      <View style={styles.chipScrollContent}>
                        {REMINDER_WEEKDAY_OPTIONS.map(({ value, label }) => {
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
                                {label}
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
            <Text style={shared.sectionHeading}>Save</Text>
            <Stack spacing={space.lg} padding={0}>
              {!canSave && title.length === 0 ? (
                <Text style={styles.inlineHint}>
                  {isEdit
                    ? 'Enter a name in Basics, then save your changes.'
                    : 'Enter a name in Basics, then tap Create habit.'}
                </Text>
              ) : null}

              <PrimaryButton
                title={isEdit ? 'Save changes' : 'Create habit'}
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
            <Text style={styles.tipsTitle}>Quick tips</Text>
            <Text style={styles.tipLine}>
              • Tap a habit on the home list to toggle today, or open details
              for the {HABIT_DETAILS_TIMELINE_DAYS}-day timeline.
            </Text>
            <Text style={styles.tipLine}>
              • On the details screen, use &quot;Mark as completed&quot; for
              today. After you&apos;ve marked today, the button stays disabled
              until tomorrow.
            </Text>
            <Text style={[styles.tipLine, styles.tipLineLast]}>
              • Frequency is saved on the habit (daily vs weekly) so you can
              filter or remind yourself later; marking today works the same
              either way.
            </Text>
          </Card>
        </FadeSlideIn>
      ) : null}
    </View>
  );
};
