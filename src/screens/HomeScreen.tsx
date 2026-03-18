import { FlatList, View } from 'react-native';
import { Title } from '../components/Title';
import { Btn } from '../components/Btn';
import { HabitCard } from '../components/HabitCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

const habits = [
  { id: '1', title: 'Drink water' },
  { id: '2', title: 'Play game' },
  { id: '3', title: 'Write clean code' },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const toAddHabitScreen = () => navigation.navigate('AddHabit');

  return (
    <>
      <View>
        <Title title="My Habits" />
        <Btn title="+ Add Habit" onPress={toAddHabitScreen} />
      </View>

      <View>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HabitCard title={item.title} onToggle={() => {}} />
          )}
        />
      </View>
    </>
  );
};
