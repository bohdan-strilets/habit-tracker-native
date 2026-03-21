import { Card } from '@components/Card';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { HabitProgressSection } from '@components/HabitProgressSection';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Text } from 'react-native';

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
