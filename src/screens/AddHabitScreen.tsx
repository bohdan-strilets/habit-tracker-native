import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { MainTabParamList } from '../navigation/types';
import { AddHabitForm } from '../components/AddHabitForm';
import { useHabit } from '../hooks/useHabit';
import { Habit } from '../types/Habit';
import { generateId } from '../utils/generateId';
import { getCurrentLocalDateString } from '../utils/getCurrentLocalDateString';

export const AddHabitScreen = () => {
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

  const createHabit = () => {
    const name = title.trim();
    if (!name) return;

    const newHabit: Habit = {
      id: generateId(),
      title: name,
      logs: [],
      createdAt: getCurrentLocalDateString(),
    };

    addHabit(newHabit);
    navigation.navigate('HomeTab', { screen: 'Home' });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AddHabitForm
          title={title}
          onChangeTitle={setTitle}
          onSave={createHabit}
          entrancePlayKey={entranceKey}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    padding: 12,

    backgroundColor: '#f2f3f5',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,

    paddingBottom: 32,
  },
});
