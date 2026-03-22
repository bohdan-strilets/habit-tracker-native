import {
  DEFAULT_COUNT_TARGET,
  DEFAULT_HABIT_ACCENT_HEX,
  DEFAULT_HABIT_CATEGORY,
  DEFAULT_HABIT_ICON,
  HABIT_ACCENT_PRESETS,
  HABIT_ICON_PRESETS,
} from '@constants/habitFormOptions';
import {
  ALL_REMINDER_WEEKDAYS,
  DEFAULT_REMINDER_HOUR,
  MAX_REMINDER_TIMES_PER_HABIT,
} from '@constants/habitReminders';
import type { MainTabParamList } from '@navigation/types';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { generateId } from '@utils/generateId';
import { getCurrentLocalDateString } from '@utils/getCurrentLocalDateString';
import {
  buildHabitReminderForSave,
  defaultReminderFields,
  normalizeReminderFieldsForCommit,
  normalizeReminderHourStrOnBlur,
  normalizeReminderMinuteStrOnBlur,
  normalizeReminderWeekdays,
  reminderFieldsToTimes,
  sanitizeReminderTimeDigitInput,
} from '@utils/habitReminderTimes';
import { useCallback, useState } from 'react';

import type { Habit, HabitCategoryId, HabitFrequency } from '@/types/Habit';

import { useHabit } from './useHabit';

function isPresetIcon(icon: string) {
  return (HABIT_ICON_PRESETS as readonly string[]).includes(icon);
}

function isPresetAccent(hex: string) {
  return HABIT_ACCENT_PRESETS.some((p) => p.hex === hex);
}

export const useAddHabitScreen = () => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(DEFAULT_HABIT_ICON);
  const [selectedAccentHex, setSelectedAccentHex] = useState(
    DEFAULT_HABIT_ACCENT_HEX,
  );
  const [categoryId, setCategoryId] = useState<HabitCategoryId>(
    DEFAULT_HABIT_CATEGORY,
  );
  const [notes, setNotes] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [trackAsCount, setTrackAsCount] = useState(false);
  const [targetStr, setTargetStr] = useState(DEFAULT_COUNT_TARGET);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderFields, setReminderFields] = useState(() =>
    defaultReminderFields(),
  );
  const [reminderWeekdays, setReminderWeekdays] = useState<number[]>([
    ...ALL_REMINDER_WEEKDAYS,
  ]);

  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { addHabit } = useHabit();

  const changeReminderEnabled = useCallback((value: boolean) => {
    setReminderEnabled(value);
    if (value) {
      setReminderFields((prev) =>
        prev.length > 0 ? prev : defaultReminderFields(),
      );
    }
  }, []);

  const addReminderTime = useCallback(() => {
    setReminderFields((prev) => {
      if (prev.length >= MAX_REMINDER_TIMES_PER_HABIT) {
        return prev;
      }
      return [
        ...prev,
        {
          hourStr: String(DEFAULT_REMINDER_HOUR).padStart(2, '0'),
          minuteStr: '00',
        },
      ];
    });
  }, []);

  const removeReminderTime = useCallback((index: number) => {
    setReminderFields((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const changeReminderHourStr = useCallback((index: number, raw: string) => {
    setReminderFields((prev) => {
      const next = [...prev];
      const row = next[index];
      if (!row) {
        return prev;
      }
      next[index] = { ...row, hourStr: sanitizeReminderTimeDigitInput(raw) };
      return next;
    });
  }, []);

  const changeReminderMinuteStr = useCallback((index: number, raw: string) => {
    setReminderFields((prev) => {
      const next = [...prev];
      const row = next[index];
      if (!row) {
        return prev;
      }
      next[index] = { ...row, minuteStr: sanitizeReminderTimeDigitInput(raw) };
      return next;
    });
  }, []);

  const blurReminderHour = useCallback((index: number) => {
    setReminderFields((prev) => {
      const next = [...prev];
      const row = next[index];
      if (!row) {
        return prev;
      }
      next[index] = {
        ...row,
        hourStr: normalizeReminderHourStrOnBlur(row.hourStr),
      };
      return next;
    });
  }, []);

  const blurReminderMinute = useCallback((index: number) => {
    setReminderFields((prev) => {
      const next = [...prev];
      const row = next[index];
      if (!row) {
        return prev;
      }
      next[index] = {
        ...row,
        minuteStr: normalizeReminderMinuteStrOnBlur(row.minuteStr),
      };
      return next;
    });
  }, []);

  const toggleReminderWeekday = useCallback(
    (weekday: number) => {
      setReminderWeekdays((prev) => {
        const set = new Set(normalizeReminderWeekdays(prev));
        if (set.has(weekday)) {
          if (set.size <= 1) {
            return [...set];
          }
          set.delete(weekday);
        } else {
          set.add(weekday);
        }
        return normalizeReminderWeekdays([...set]);
      });
    },
    [],
  );

  const submitNewHabit = useCallback(() => {
    const name = title.trim();
    if (!name) return;

    const parsedTarget = parseInt(targetStr.replace(/\s/g, ''), 10);
    const target = Number.isFinite(parsedTarget)
      ? Math.max(1, Math.min(9999, parsedTarget))
      : 1;

    const notesTrim = notes.trim();

    const reminder = buildHabitReminderForSave({
      enabled: reminderEnabled,
      times: reminderFieldsToTimes(
        normalizeReminderFieldsForCommit(reminderFields),
      ),
      frequency,
      weekdays: reminderWeekdays,
    });

    const newHabit: Habit = {
      id: generateId(),
      title: name,
      logs: [],
      createdAt: getCurrentLocalDateString(),
      icon: isPresetIcon(selectedIcon) ? selectedIcon : DEFAULT_HABIT_ICON,
      accentColor: isPresetAccent(selectedAccentHex)
        ? selectedAccentHex
        : DEFAULT_HABIT_ACCENT_HEX,
      category: categoryId,
      notes: notesTrim.length > 0 ? notesTrim : undefined,
      frequency,
      kind: trackAsCount ? 'count' : 'boolean',
      target: trackAsCount ? target : undefined,
      reminder,
    };

    addHabit(newHabit);
    setTitle('');
    setSelectedIcon(DEFAULT_HABIT_ICON);
    setSelectedAccentHex(DEFAULT_HABIT_ACCENT_HEX);
    setCategoryId(DEFAULT_HABIT_CATEGORY);
    setNotes('');
    setFrequency('daily');
    setTrackAsCount(false);
    setTargetStr(DEFAULT_COUNT_TARGET);
    setReminderEnabled(false);
    setReminderFields(defaultReminderFields());
    setReminderWeekdays([...ALL_REMINDER_WEEKDAYS]);
    navigation.navigate('HomeTab', { screen: 'Home' });
  }, [
    addHabit,
    categoryId,
    frequency,
    navigation,
    notes,
    reminderEnabled,
    reminderFields,
    reminderWeekdays,
    selectedAccentHex,
    selectedIcon,
    targetStr,
    title,
    trackAsCount,
  ]);

  return {
    title,
    setTitle,
    selectedIcon,
    setSelectedIcon,
    selectedAccentHex,
    setSelectedAccentHex,
    categoryId,
    setCategoryId,
    notes,
    setNotes,
    frequency,
    setFrequency,
    trackAsCount,
    setTrackAsCount,
    targetStr,
    setTargetStr,
    submitNewHabit,
    reminderEnabled,
    changeReminderEnabled,
    reminderFields,
    addReminderTime,
    removeReminderTime,
    changeReminderHourStr,
    changeReminderMinuteStr,
    blurReminderHour,
    blurReminderMinute,
    reminderWeekdays,
    toggleReminderWeekday,
  };
};
