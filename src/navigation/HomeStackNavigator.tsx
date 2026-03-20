import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { colors, fontWeight } from '../theme';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: colors.primary.headerTint,
        headerTitleStyle: { fontWeight: fontWeight.semibold },
        contentStyle: { backgroundColor: colors.background.screen },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HabitDetails" component={HabitDetailsScreen} />
    </Stack.Navigator>
  );
};
