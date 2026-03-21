import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditHabitScreen, HabitDetailsScreen, HomeScreen } from '@screens';
import { fontWeight, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const screenOptions = useMemo(
    () => ({
      headerBackTitle: t('stack.back'),
      headerTintColor: theme.colors.primary.headerTint,
      headerTitleStyle: { fontWeight: fontWeight.semibold },
      contentStyle: { backgroundColor: theme.colors.background.screen },
    }),
    [theme.colors, t],
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
      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
