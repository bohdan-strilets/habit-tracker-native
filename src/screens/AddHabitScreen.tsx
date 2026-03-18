import { TextInput, View } from 'react-native';
import { Btn } from '../components/Btn';
import { useState } from 'react';
import { generateId } from '../utils/generateId';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useHabit } from '../hooks/useHabit';
import { StyledTextInput } from '../components/StyledTextInput';

type AddHabitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddHabit'
>;

export const AddHabitScreen = () => {
  const [title, setTitle] = useState('');

  const navigate = useNavigation<AddHabitScreenNavigationProp>();
  const { addHabit } = useHabit();

  const createHabit = () => {
    navigate.navigate('Home');

    const newHabit = {
      id: generateId(),
      title: title,
    };

    return addHabit(newHabit);
  };

  return (
    <View>
      <StyledTextInput value={title} onChangeText={setTitle} />
      <Btn title="Save" onPress={createHabit} />
    </View>
  );
};
