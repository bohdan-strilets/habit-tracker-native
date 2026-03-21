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
import { normalizeLogsAfterKindChange } from '@domain/habitLogsKindTransition';
import type { HomeStackParamList } from '@navigation/types';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  buildHabitReminderForSave,
  defaultReminderFields,
  normalizeReminderFieldsForCommit,
  normalizeReminderHourStrOnBlur,
  normalizeReminderMinuteStrOnBlur,
  normalizeReminderWeekdays,
  parseReminderTimesFromStored,
  parseReminderWeekdaysFromStored,
  reminderFieldsToTimes,
  sanitizeReminderTimeDigitInput,
  timesToReminderFields,
} from '@utils/habitReminderTimes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

import type {
  HabitCategoryId,
  HabitFrequency,
  HabitReminderSettings,
} from '@/types/Habit';

import { useHabit } from './useHabit';

function isPresetIcon(icon: string) {
  return (HABIT_ICON_PRESETS as readonly string[]).includes(icon);
}

function isPresetAccent(hex: string) {
  return HABIT_ACCENT_PRESETS.some((p) => p.hex === hex);
}

type EditRoute = RouteProp<HomeStackParamList, 'EditHabit'>;
type EditNav = NativeStackNavigationProp<HomeStackParamList, 'EditHabit'>;

function habitToFormState(h: {
  title: string;
  icon?: string;
  accentColor?: string;
  category?: HabitCategoryId;
  notes?: string;
  frequency?: HabitFrequency;
  kind?: 'boolean' | 'count';
  target?: number;
  reminder?: HabitReminderSettings;
}) {
  const isCount = (h.kind ?? 'boolean') === 'count';
  const freq = h.frequency ?? 'daily';
  const parsedTimes = parseReminderTimesFromStored(h.reminder);
  const reminderFields =
    parsedTimes.length > 0
      ? timesToReminderFields(parsedTimes)
      : defaultReminderFields();
  return {
    title: h.title,
    selectedIcon: isPresetIcon(h.icon ?? '')
      ? (h.icon ?? DEFAULT_HABIT_ICON)
      : DEFAULT_HABIT_ICON,
    selectedAccentHex: isPresetAccent(h.accentColor ?? '')
      ? (h.accentColor ?? DEFAULT_HABIT_ACCENT_HEX)
      : DEFAULT_HABIT_ACCENT_HEX,
    categoryId: h.category ?? DEFAULT_HABIT_CATEGORY,
    notes: h.notes ?? '',
    frequency: freq,
    trackAsCount: isCount,
    targetStr: String(Math.max(1, h.target ?? 8)),
    reminderEnabled: h.reminder?.enabled ?? false,
    reminderFields,
    reminderWeekdays: parseReminderWeekdaysFromStored(h.reminder, freq),
  };
}

export const useEditHabitScreen = () => {
  const { habitId } = useRoute<EditRoute>().params;
  const navigation = useNavigation<EditNav>();
  const { habits, updateHabit } = useHabit();

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

  const hydratedForIdRef = useRef<string | null>(null);

  useEffect(() => {
    const h = habits.find((x) => String(x.id) === String(habitId));
    if (!h) {
      navigation.goBack();
      return;
    }
    if (hydratedForIdRef.current === habitId) return;
    hydratedForIdRef.current = habitId;
    const s = habitToFormState(h);
    setTitle(s.title);
    setSelectedIcon(s.selectedIcon);
    setSelectedAccentHex(s.selectedAccentHex);
    setCategoryId(s.categoryId);
    setNotes(s.notes);
    setFrequency(s.frequency);
    setTrackAsCount(s.trackAsCount);
    setTargetStr(s.targetStr);
    setReminderEnabled(s.reminderEnabled);
    setReminderFields(s.reminderFields);
    setReminderWeekdays(s.reminderWeekdays);
  }, [habitId, habits, navigation]);

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

  const submitUpdate = useCallback(() => {
    const name = title.trim();
    if (!name) return;

    const original = habits.find((x) => String(x.id) === String(habitId));
    if (!original) return;

    const parsedTarget = parseInt(targetStr.replace(/\s/g, ''), 10);
    const target = Number.isFinite(parsedTarget)
      ? Math.max(1, Math.min(9999, parsedTarget))
      : 1;

    const notesTrim = notes.trim();
    const newKind = trackAsCount ? 'count' : 'boolean';
    const oldKind = original.kind ?? 'boolean';

    const reminder = buildHabitReminderForSave({
      enabled: reminderEnabled,
      times: reminderFieldsToTimes(
        normalizeReminderFieldsForCommit(reminderFields),
      ),
      frequency,
      weekdays: reminderWeekdays,
    });

    const patch = {
      title: name,
      icon: isPresetIcon(selectedIcon) ? selectedIcon : DEFAULT_HABIT_ICON,
      accentColor: isPresetAccent(selectedAccentHex)
        ? selectedAccentHex
        : DEFAULT_HABIT_ACCENT_HEX,
      category: categoryId,
      notes: notesTrim.length > 0 ? notesTrim : undefined,
      frequency,
      kind: newKind,
      target: trackAsCount ? target : undefined,
      reminder,
    } as const;

    const finish = (logs?: (typeof original.logs)[number][]) => {
      if (logs !== undefined) {
        updateHabit(habitId, { ...patch, logs });
      } else {
        updateHabit(habitId, patch);
      }
      navigation.goBack();
    };

    if (oldKind !== newKind) {
      const normalized = normalizeLogsAfterKindChange(
        original,
        newKind,
        trackAsCount ? target : Math.max(1, original.target ?? 1),
      );
      Alert.alert(
        'Change habit type?',
        'Days you already completed will be converted for the new style (simple check-off vs daily count). This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => finish(normalized),
          },
        ],
      );
      return;
    }

    finish();
  }, [
    categoryId,
    frequency,
    habitId,
    habits,
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
    updateHabit,
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
    entranceKey: habitId,
    submitUpdate,
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
