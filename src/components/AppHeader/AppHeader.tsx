import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  type NavigationProp,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { APP_DISPLAY_NAME } from '../../constants/branding';
import { useHabit } from '../../hooks/useHabit';
import type { MainTabParamList } from '../../navigation/types';
import { useAppTheme } from '../../theme';
import { ThemeToggle } from '../ThemeToggle';
import { createAppHeaderStyles } from './AppHeader.styles';
import type { AppHeaderProps } from './AppHeader.types';

const LOGO = require('../../assets/logo.png');

const DETAILS_CHROME_MS = 280;
const BACK_SLOT_WIDTH = 40;

export const AppHeader = ({ subtitle }: AppHeaderProps) => {
  const { theme } = useAppTheme();
  const { habits } = useHabit();
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();
  const styles = useMemo(
    () => createAppHeaderStyles(theme.colors),
    [theme.colors],
  );

  const { isHabitDetails, habitId } = useNavigationState((state) => {
    if (!state?.routes || typeof state.index !== 'number') {
      return { isHabitDetails: false, habitId: null as string | null };
    }
    const tab = state.routes[state.index];
    if (tab.name !== 'HomeTab') {
      return { isHabitDetails: false, habitId: null as string | null };
    }
    const stack = tab.state;
    if (!stack?.routes || typeof stack.index !== 'number') {
      return { isHabitDetails: false, habitId: null as string | null };
    }
    const r = stack.routes[stack.index];
    if (r.name !== 'HabitDetails') {
      return { isHabitDetails: false, habitId: null as string | null };
    }
    const id = (r.params as { habitId?: string } | undefined)?.habitId;
    return {
      isHabitDetails: true,
      habitId: id != null ? String(id) : null,
    };
  });

  const [detailsSubtitle, setDetailsSubtitle] = useState<string | null>(null);
  const detailsChrome = useSharedValue(0);

  useEffect(() => {
    detailsChrome.value = withTiming(isHabitDetails ? 1 : 0, {
      duration: DETAILS_CHROME_MS,
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
  }, [detailsChrome, isHabitDetails]);

  useEffect(() => {
    if (!isHabitDetails || habitId == null) return;
    const h = habits.find((x) => String(x.id) === habitId);
    setDetailsSubtitle(h?.title?.trim() || 'Habit');
  }, [habits, habitId, isHabitDetails]);

  useEffect(() => {
    if (isHabitDetails || detailsSubtitle == null) return;
    const id = setTimeout(() => setDetailsSubtitle(null), DETAILS_CHROME_MS);
    return () => clearTimeout(id);
  }, [detailsSubtitle, isHabitDetails]);

  const backSlotStyle = useAnimatedStyle(() => {
    const p = detailsChrome.value;
    return {
      width: interpolate(p, [0, 1], [0, BACK_SLOT_WIDTH]),
      opacity: p,
      transform: [{ translateX: interpolate(p, [0, 1], [-12, 0]) }],
    };
  });

  const detailsSubtitleStyle = useAnimatedStyle(() => {
    const p = detailsChrome.value;
    return {
      opacity: p,
      transform: [{ translateY: interpolate(p, [0, 1], [6, 0]) }],
    };
  });

  const onBackFromDetails = () => {
    navigation.navigate('HomeTab', { screen: 'Home' });
  };

  const showDetailsSubtitle = !subtitle && detailsSubtitle != null;

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
            <Animated.View style={[styles.backSlot, backSlotStyle]}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                disabled={!isHabitDetails}
                onPress={onBackFromDetails}
                style={({ pressed }) => [
                  styles.backHit,
                  pressed && styles.backPressed,
                ]}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </Pressable>
            </Animated.View>
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
              ) : showDetailsSubtitle ? (
                <Animated.Text
                  style={[styles.subtitle, detailsSubtitleStyle]}
                  numberOfLines={2}
                >
                  {detailsSubtitle}
                </Animated.Text>
              ) : null}
            </View>
            <ThemeToggle />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
