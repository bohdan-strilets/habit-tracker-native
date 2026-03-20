import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FadeSlideIn } from '../components/FadeSlideIn';
import { HabitsList } from '../components/HabitsList';
import { HomeHabitsHeader } from '../components/HomeHabitsHeader';
import { RootStackParamList } from '../navigation/StackNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [entranceKey, setEntranceKey] = useState(0);
  const skipEntranceBump = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (skipEntranceBump.current) {
        skipEntranceBump.current = false;
        return;
      }
      setEntranceKey((k) => k + 1);
    }, []),
  );

  const toAddHabitScreen = () => navigation.navigate('AddHabit');

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <FadeSlideIn index={0} playKey={entranceKey}>
        <HomeHabitsHeader onAddHabit={toAddHabitScreen} />
      </FadeSlideIn>

      <FadeSlideIn index={1} playKey={entranceKey}>
        <HabitsList />
      </FadeSlideIn>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  scrollContent: {
    gap: 28,

    padding: 12,
    paddingBottom: 32,
  },
});
