import { useMemo } from 'react';
import { Text } from 'react-native';
import { useAppTheme } from '../../theme';
import { Card } from '../Card';
import { createHabitsListEmptyStateStyles } from './HabitsListEmptyState.styles';

export const HabitsListEmptyState = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHabitsListEmptyStateStyles(theme.colors),
    [theme.colors],
  );

  return (
    <Card>
      <Text style={styles.title}>No habits yet</Text>
      <Text style={styles.hint}>
        Use the button above to add your first habit.
      </Text>
    </Card>
  );
};
