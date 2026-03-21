import { Card } from '@components/Card';
import { FadeSlideIn } from '@components/FadeSlideIn';
import { PrimaryButton } from '@components/PrimaryButton';
import { Stack } from '@components/Stack';
import { space, useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Text } from 'react-native';

import { createHabitDetailsMissingStyles } from './HabitDetailsMissing.styles';
import type { HabitDetailsMissingProps } from './HabitDetailsMissing.types';

export const HabitDetailsMissing = ({ onGoBack }: HabitDetailsMissingProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHabitDetailsMissingStyles(theme.colors),
    [theme.colors],
  );

  return (
    <FadeSlideIn index={0}>
      <Card>
        <Stack spacing={space.xl} padding={0}>
          <Text style={styles.missing}>Habit not found</Text>
          <PrimaryButton title="Go back" onPress={onGoBack} />
        </Stack>
      </Card>
    </FadeSlideIn>
  );
};
