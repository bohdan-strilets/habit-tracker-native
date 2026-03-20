import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar';
import { useAppTheme } from '../../theme';
import type { HomeTodayProgressSectionProps } from './HomeTodayProgressSection.types';
import { createHomeTodayProgressSectionStyles } from './HomeTodayProgressSection.styles';

export const HomeTodayProgressSection = ({
  progress,
  completedCount,
  total,
}: HomeTodayProgressSectionProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeTodayProgressSectionStyles(theme),
    [theme],
  );

  return (
    <View style={styles.progressSection}>
      <Text style={styles.progressTitle}>Today's progress</Text>
      <ProgressBar
        progress={progress}
        accessibilityLabel={`${completedCount} of ${total} habits completed`}
      />
      <Text style={styles.progressSummary}>
        {completedCount} of {total} habits completed
      </Text>
    </View>
  );
};
