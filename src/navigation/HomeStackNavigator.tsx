import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: '#1b5e20',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: '#f2f3f5' },
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
