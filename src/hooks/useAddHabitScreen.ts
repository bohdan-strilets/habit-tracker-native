import { useCallback, useRef, useState } from 'react';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { MainTabParamList } from '../navigation/types';
import { useHabit } from './useHabit';
import type { Habit } from '../types/Habit';
import { generateId } from '../utils/generateId';
import { getCurrentLocalDateString } from '../utils/getCurrentLocalDateString';

export const useAddHabitScreen = () => {
  const [title, setTitle] = useState('');
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

    const newHabit: Habit = {
      id: generateId(),
      title: name,
      logs: [],
      createdAt: getCurrentLocalDateString(),
    };

    addHabit(newHabit);
    setTitle('');
    navigation.navigate('HomeTab', { screen: 'Home' });
  }, [addHabit, navigation, title]);

  return { title, setTitle, entranceKey, submitNewHabit };
};
