import { Text } from 'react-native';
import { HABIT_DETAILS_TIMELINE_DAYS } from '../../constants/habits';
import { Card } from '../Card';
import { PrimaryButton } from '../PrimaryButton';
import type { HomeHabitsHeaderProps } from './HomeHabitsHeader.types';
import { styles } from './HomeHabitsHeader.styles';

export const HomeHabitsHeader = ({ onAddHabit }: HomeHabitsHeaderProps) => {
  return (
    <Card>
      <Text style={styles.headline}>My habits</Text>
      <Text style={styles.lead}>
        Tap a habit to see details, your {HABIT_DETAILS_TIMELINE_DAYS}-day
        timeline, and mark today
        complete. Use the button below to add another.
      </Text>

      <PrimaryButton title="+ Add habit" onPress={onAddHabit} />
    </Card>
  );
};
