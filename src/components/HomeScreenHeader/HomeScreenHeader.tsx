import { StreakBadge } from '@components/StreakBadge/StreakBadge';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createHomeScreenHeaderStyles } from './HomeScreenHeader.styles';
import type { HomeScreenHeaderProps } from './HomeScreenHeader.types';

export const HomeScreenHeader = ({
  greeting,
  userName,
  focusLine,
  dateLine,
  globalStreak,
  showStreak = true,
  onOutsidePress,
}: HomeScreenHeaderProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createHomeScreenHeaderStyles(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.header,
        onOutsidePress && pressed && { opacity: 0.96 },
      ]}
      onPress={onOutsidePress}
      disabled={!onOutsidePress}
    >
      <View style={styles.headerTop}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>
            {greeting}, {userName}
          </Text>
          {focusLine ? (
            <Text style={styles.focusLine} numberOfLines={2}>
              {focusLine}
            </Text>
          ) : null}
          <Text style={styles.date}>{dateLine}</Text>
        </View>
        {showStreak ? (
          <View style={styles.headerActions}>
            <StreakBadge days={globalStreak} />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};
