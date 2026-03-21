import { Card } from '@components/Card';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { PrimaryButton } from '@components/PrimaryButton';
import { Stack } from '@components/Stack';
import { space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { habitDetailsActionsCardStyles } from './HabitDetailsActionsCard.styles';
import type { HabitDetailsActionsCardProps } from './HabitDetailsActionsCard.types';

export const HabitDetailsActionsCard = ({
  isDoneToday,
  onEdit,
  onMarkCompleted,
  onDelete,
}: HabitDetailsActionsCardProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );

  const primaryTitle = isDoneToday
    ? t('habitDetails.undoToday')
    : t('habitDetails.markDone');

  return (
    <Card>
      <Text style={shared.sectionHeading}>{t('habitDetails.actions')}</Text>
      <Stack
        spacing={space.lg}
        padding={0}
        style={habitDetailsActionsCardStyles.stack}
      >
        <PrimaryButton title={t('habitDetails.edit')} onPress={onEdit} />

        <PrimaryButton title={primaryTitle} onPress={onMarkCompleted} />

        <PrimaryButton
          variant="danger"
          title={t('habitDetails.delete')}
          onPress={onDelete}
        />
      </Stack>
    </Card>
  );
};
