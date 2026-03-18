import { View, Text } from 'react-native';
import { Btn } from '../Btn';

export type Props = {
  title: string;
  onToggle: () => void;
};

export const HabitCard = ({ title, onToggle }: Props) => {
  return (
    <View>
      <Text>{title}</Text>
      <Btn title="Done" onPress={onToggle} />
    </View>
  );
};
