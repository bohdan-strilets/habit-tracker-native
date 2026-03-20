import { Card } from '../Card';
import { HabitProgressSection } from '../HabitProgressSection';
import { habitDetailsProgressCardStyles } from './HabitDetailsProgressCard.styles';
import type { HabitDetailsProgressCardProps } from './HabitDetailsProgressCard.types';

export const HabitDetailsProgressCard = ({
  logs,
}: HabitDetailsProgressCardProps) => (
  <Card style={habitDetailsProgressCardStyles.card}>
    <HabitProgressSection logs={logs} />
  </Card>
);
