import { useCallback, useRef, useState } from 'react';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList, MainTabParamList } from '../navigation/types';

type HomeScreenNav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export const useHomeScreen = () => {
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

  const onAddHabit = useCallback(() => {
    navigation.navigate('AddHabit');
  }, [navigation]);

  return { entranceKey, onAddHabit };
};
