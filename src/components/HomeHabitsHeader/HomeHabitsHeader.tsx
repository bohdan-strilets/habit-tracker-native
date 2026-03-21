import { Card } from '@components/Card';
import { PrimaryButton } from '@components/PrimaryButton';
import { HABIT_DETAILS_TIMELINE_DAYS } from '@constants/habits';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { createHomeHabitsHeaderStyles } from './HomeHabitsHeader.styles';
import type { HomeHabitsHeaderProps } from './HomeHabitsHeader.types';

export const HomeHabitsHeader = ({ onAddHabit }: HomeHabitsHeaderProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeHabitsHeaderStyles(theme.colors),
    [theme.colors],
  );

  return (
    <Card>
      <Text style={styles.headline}>{t('homeHabitsHeader.headline')}</Text>
      <Text style={styles.lead}>
        {t('homeHabitsHeader.lead', { days: HABIT_DETAILS_TIMELINE_DAYS })}
      </Text>

      <PrimaryButton title={t('homeHabitsHeader.addButton')} onPress={onAddHabit} />
    </Card>
  );
};
