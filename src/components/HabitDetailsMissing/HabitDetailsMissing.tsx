import { useMemo } from 'react';
import { Text } from 'react-native';
import { Card } from '../Card';
import { FadeSlideIn } from '../FadeSlideIn';
import { PrimaryButton } from '../PrimaryButton';
import { Stack } from '../Stack';
import { space, useAppTheme } from '../../theme';
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
