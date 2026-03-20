import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar';
import { useAppTheme } from '../../theme';
import type { HomeTodayProgressSectionProps } from './HomeTodayProgressSection.types';
import { createHomeTodayProgressSectionStyles } from './HomeTodayProgressSection.styles';

export const HomeTodayProgressSection = ({
  progress,
  completedCount,
  total,
  onOutsidePress,
}: HomeTodayProgressSectionProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeTodayProgressSectionStyles(theme),
    [theme],
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.progressSection,
        onOutsidePress && pressed && { opacity: 0.96 },
      ]}
      onPress={onOutsidePress}
      disabled={!onOutsidePress}
    >
      <Text style={styles.progressTitle}>Today's progress</Text>
      <ProgressBar
        progress={progress}
        accessibilityLabel={`${completedCount} of ${total} habits completed`}
      />
      <Text style={styles.progressSummary}>
        {completedCount} of {total} habits completed
      </Text>
    </Pressable>
  );
};
