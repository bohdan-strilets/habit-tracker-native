import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
