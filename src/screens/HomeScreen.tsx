import { FlatList, View } from 'react-native';
import { Title } from '../components/Title';
import { Btn } from '../components/Btn';
import { HabitCard } from '../components/HabitCard';

const habits = [
  { id: '1', title: 'Drink water' },
  { id: '2', title: 'Play game' },
  { id: '3', title: 'Write clean code' },
];

export const HomeScreen = () => {
  return (
    <>
      <View>
        <Title title="My Habits" />
        <Btn title="+ Add Habit" />
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
