import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  HabitDetails: { habitId: string };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddHabit" component={AddHabitScreen} />
      <Stack.Screen name="HabitDetails" component={HabitDetailsScreen} />
    </Stack.Navigator>
  );
};
