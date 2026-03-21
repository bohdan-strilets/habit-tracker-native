import {
  DEFAULT_COUNT_TARGET,
  DEFAULT_HABIT_ACCENT_HEX,
  DEFAULT_HABIT_CATEGORY,
  DEFAULT_HABIT_ICON,
  HABIT_ACCENT_PRESETS,
  HABIT_ICON_PRESETS,
} from '@constants/habitFormOptions';
import type { MainTabParamList } from '@navigation/types';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { generateId } from '@utils/generateId';
import { getCurrentLocalDateString } from '@utils/getCurrentLocalDateString';
import { useCallback, useRef, useState } from 'react';

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
  const [entranceKey, setEntranceKey] = useState(0);
  const skipEntranceBump = useRef(true);

  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { addHabit } = useHabit();

  useFocusEffect(
    useCallback(() => {
      if (skipEntranceBump.current) {
        skipEntranceBump.current = false;
        return;
      }
      setEntranceKey((k) => k + 1);
    }, []),
  );

  const submitNewHabit = useCallback(() => {
    const name = title.trim();
    if (!name) return;

    const parsedTarget = parseInt(targetStr.replace(/\s/g, ''), 10);
    const target = Number.isFinite(parsedTarget)
      ? Math.max(1, Math.min(9999, parsedTarget))
      : 1;

    const notesTrim = notes.trim();

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
    navigation.navigate('HomeTab', { screen: 'Home' });
  }, [
    addHabit,
    categoryId,
    frequency,
    navigation,
    notes,
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
    entranceKey,
    submitNewHabit,
  };
};
