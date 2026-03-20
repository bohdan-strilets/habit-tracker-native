import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_DISPLAY_NAME } from '../../constants/branding';
import { useAppTheme } from '../../theme';
import { ThemeToggle } from '../ThemeToggle';
import { createAppHeaderStyles } from './AppHeader.styles';
import type { AppHeaderProps } from './AppHeader.types';

const LOGO = require('../../assets/logo.png');

export const AppHeader = ({ subtitle }: AppHeaderProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createAppHeaderStyles(theme.colors),
    [theme.colors],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <LinearGradient
        colors={[...theme.gradients.header]}
        locations={[...theme.gradients.headerLocations]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerFill}
      >
        <View style={styles.inner}>
          <View style={styles.titleRow}>
            <Image
              source={LOGO}
              style={styles.logo}
              accessible={false}
              importantForAccessibility="no"
              resizeMode="contain"
            />
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{APP_DISPLAY_NAME}</Text>
              {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
              ) : null}
            </View>
            <ThemeToggle />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
