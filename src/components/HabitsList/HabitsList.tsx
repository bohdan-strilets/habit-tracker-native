import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Card } from '../Card';
import { HabitCard } from '../HabitCard';
import { HabitsListEmptyState } from '../HabitsListEmptyState';
import { useHabit } from '../../hooks/useHabit';
import type { HabitsListNavigation } from './HabitsList.types';
import { styles } from './HabitsList.styles';

export const HabitsList = () => {
  const { habits } = useHabit();
  const navigation = useNavigation<HabitsListNavigation>();
  const [focusEpoch, setFocusEpoch] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocusEpoch((n) => n + 1);
    }, []),
  );

  const listExtraData = useMemo(
    () => ({ habits, focusEpoch }),
    [habits, focusEpoch],
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      scrollEnabled={false}
      data={habits}
      extraData={listExtraData}
      keyExtractor={(item) => `${item.id}-${item.logs.length}`}
      ListEmptyComponent={HabitsListEmptyState}
      renderItem={({ item }) => (
        <Card>
          <HabitCard
            variant="plain"
            title={item.title}
            logs={item.logs}
            onPress={() =>
              navigation.navigate('HabitDetails', { habitId: item.id })
            }
          />
        </Card>
      )}
    />
  );
};
