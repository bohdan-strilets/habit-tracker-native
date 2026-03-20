import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { normalizeLogsAfterKindChange } from '../domain/habitLogsKindTransition';
import {
  DEFAULT_COUNT_TARGET,
  DEFAULT_HABIT_ACCENT_HEX,
  DEFAULT_HABIT_CATEGORY,
  DEFAULT_HABIT_ICON,
  HABIT_ACCENT_PRESETS,
  HABIT_ICON_PRESETS,
} from '../constants/habitFormOptions';
import type { HomeStackParamList } from '../navigation/types';
import type { HabitCategoryId, HabitFrequency } from '../types/Habit';
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
}) {
  const isCount = (h.kind ?? 'boolean') === 'count';
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
    frequency: h.frequency ?? 'daily',
    trackAsCount: isCount,
    targetStr: String(Math.max(1, h.target ?? 8)),
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
  }, [habitId, habits, navigation]);

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
  };
};
