import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FadeSlideIn } from '../components/FadeSlideIn';
import { HabitsList } from '../components/HabitsList';
import { HomeHabitsHeader } from '../components/HomeHabitsHeader';
import { ScreenBackground } from '../components/ScreenBackground';
import type { HomeStackParamList, MainTabParamList } from '../navigation/types';
import { colors, space } from '../theme';

type HomeScreenNav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNav>();
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

  const toAddHabitScreen = () => {
    navigation.navigate('AddHabit');
  };

  return (
    <ScreenBackground>
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
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,

    backgroundColor: colors.background.transparent,
  },

  scrollContent: {
    gap: space['6xl'],

    padding: space.base,
    paddingBottom: space['7xl'],
  },
});
