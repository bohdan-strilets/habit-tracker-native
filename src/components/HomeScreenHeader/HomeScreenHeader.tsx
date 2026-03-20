import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { StreakBadge } from '../StreakBadge/StreakBadge';
import { useAppTheme } from '../../theme';
import type { HomeScreenHeaderProps } from './HomeScreenHeader.types';
import { createHomeScreenHeaderStyles } from './HomeScreenHeader.styles';

export const HomeScreenHeader = ({
  greeting,
  userName,
  dateLine,
  globalStreak,
}: HomeScreenHeaderProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeScreenHeaderStyles(theme),
    [theme],
  );

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>
            {greeting}, {userName}
          </Text>
          <Text style={styles.date}>{dateLine}</Text>
        </View>
        <View style={styles.headerActions}>
          <StreakBadge days={globalStreak} />
        </View>
      </View>
    </View>
  );
};
