import { View } from 'react-native';
import { Title } from '../components/Title';
import { Btn } from '../components/Btn';

export const HomeScreen = () => {
  return (
    <View>
      <Title title="My Habits" />
      <Btn title="+ Add Habit" />
    </View>
  );
};
