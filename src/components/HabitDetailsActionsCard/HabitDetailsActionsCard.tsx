import { useMemo } from 'react';
import { Text } from 'react-native';
import { Card } from '../Card';
import { PrimaryButton } from '../PrimaryButton';
import { Stack } from '../Stack';
import { createHabitDetailsSharedStyles } from '../HabitDetailsShared';
import { space, useAppTheme } from '../../theme';
import { habitDetailsActionsCardStyles } from './HabitDetailsActionsCard.styles';
import type { HabitDetailsActionsCardProps } from './HabitDetailsActionsCard.types';

export const HabitDetailsActionsCard = ({
  isDoneToday,
  onEdit,
  onMarkCompleted,
  onDelete,
}: HabitDetailsActionsCardProps) => {
  const { theme } = useAppTheme();
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );

  const primaryTitle = isDoneToday ? 'Undo today' : 'Mark done';

  return (
    <Card>
      <Text style={shared.sectionHeading}>Actions</Text>
      <Stack
        spacing={space.lg}
        padding={0}
        style={habitDetailsActionsCardStyles.stack}
      >
        <PrimaryButton title="Edit habit" onPress={onEdit} />

        <PrimaryButton title={primaryTitle} onPress={onMarkCompleted} />

        <PrimaryButton variant="danger" title="Delete habit" onPress={onDelete} />
      </Stack>
    </Card>
  );
};
