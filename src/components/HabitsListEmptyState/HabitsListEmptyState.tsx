import { Text } from 'react-native';
import { Card } from '../Card';
import { styles } from './HabitsListEmptyState.styles';

export const HabitsListEmptyState = () => (
  <Card>
    <Text style={styles.title}>No habits yet</Text>
    <Text style={styles.hint}>
      Use the button above to add your first habit.
    </Text>
  </Card>
);
