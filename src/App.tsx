import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HabitStorageGate } from './components/HabitStorageGate';
import { MainTabNavigator } from './navigation/MainTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitStorageGate>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </HabitStorageGate>
    </SafeAreaProvider>
  );
}
