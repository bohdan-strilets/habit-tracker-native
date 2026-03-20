import { useMemo } from 'react';
import { Text } from 'react-native';
import { useAppTheme } from '../../theme';
import { Card } from '../Card';
import { createHabitDetailsSharedStyles } from '../HabitDetailsShared';
import { HabitProgressSection } from '../HabitProgressSection';
import { habitDetailsProgressCardStyles } from './HabitDetailsProgressCard.styles';
import type { HabitDetailsProgressCardProps } from './HabitDetailsProgressCard.types';

export const HabitDetailsProgressCard = ({
  habit,
}: HabitDetailsProgressCardProps) => {
  const { theme } = useAppTheme();
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );

  return (
    <Card style={habitDetailsProgressCardStyles.card}>
      <Text style={shared.sectionHeading}>History</Text>
      <HabitProgressSection habit={habit} />
    </Card>
  );
};
