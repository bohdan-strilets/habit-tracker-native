import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsList } from '../components/HabitsList';
import { HomeHabitsHeader } from '../components/HomeHabitsHeader';
import { RootStackParamList } from '../navigation/StackNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const toAddHabitScreen = () => navigation.navigate('AddHabit');

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HomeHabitsHeader onAddHabit={toAddHabitScreen} />

      <HabitsList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  scrollContent: {
    gap: 28,

    padding: 12,
    paddingBottom: 32,
  },
});
