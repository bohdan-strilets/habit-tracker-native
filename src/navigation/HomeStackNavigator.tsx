import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { fontWeight, useAppTheme } from '../theme';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  const { theme } = useAppTheme();

  const screenOptions = useMemo(
    () => ({
      headerBackTitle: 'Back' as const,
      headerTintColor: theme.colors.primary.headerTint,
      headerTitleStyle: { fontWeight: fontWeight.semibold },
      contentStyle: { backgroundColor: theme.colors.background.screen },
    }),
    [theme.colors],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HabitDetails"
        component={HabitDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
