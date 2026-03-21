import { Card } from '@components/Card';
import { HabitsListEmptyState } from '@components/HabitsListEmptyState';
import { HabitSummaryCard } from '@components/HabitSummaryCard';
import { useHabit } from '@hooks/useHabit';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';

import { styles } from './HabitsList.styles';
import type { HabitsListNavigation } from './HabitsList.types';

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
          <HabitSummaryCard
            variant="plain"
            habit={item}
            onPress={() =>
              navigation.navigate('HabitDetails', { habitId: item.id })
            }
          />
        </Card>
      )}
    />
  );
};
