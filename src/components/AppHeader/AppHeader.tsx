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
import logoSource from '../../assets/logo.png';
import { APP_DISPLAY_NAME } from '../../constants/branding';
import { useHabit } from '../../hooks/useHabit';
import type { MainTabParamList } from '../../navigation/types';
import { useAppTheme } from '../../theme';
import { ThemeToggle } from '../ThemeToggle';
import { createAppHeaderStyles } from './AppHeader.styles';
import type { AppHeaderProps, HomeStackOverlay } from './AppHeader.types';

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

  const { homeStackOverlay, homeStackHabitId } = useNavigationState(
    (state): { homeStackOverlay: HomeStackOverlay; homeStackHabitId: string | null } => {
      if (!state?.routes || typeof state.index !== 'number') {
        return { homeStackOverlay: 'none', homeStackHabitId: null };
      }
      const tab = state.routes[state.index];
      if (tab.name !== 'HomeTab') {
        return { homeStackOverlay: 'none', homeStackHabitId: null };
      }
      const stack = tab.state;
      if (!stack?.routes || typeof stack.index !== 'number') {
        return { homeStackOverlay: 'none', homeStackHabitId: null };
      }
      const r = stack.routes[stack.index];
      if (r.name === 'HabitDetails') {
        const id = (r.params as { habitId?: string } | undefined)?.habitId;
        return {
          homeStackOverlay: 'details',
          homeStackHabitId: id != null ? String(id) : null,
        };
      }
      if (r.name === 'EditHabit') {
        const id = (r.params as { habitId?: string } | undefined)?.habitId;
        return {
          homeStackOverlay: 'edit',
          homeStackHabitId: id != null ? String(id) : null,
        };
      }
      return { homeStackOverlay: 'none', homeStackHabitId: null };
    },
  );

  const showStackChrome = homeStackOverlay !== 'none';

  const [stackPrimary, setStackPrimary] = useState<string | null>(null);
  const [stackSecondary, setStackSecondary] = useState<string | null>(null);
  const detailsChrome = useSharedValue(0);

  useEffect(() => {
    detailsChrome.value = withTiming(showStackChrome ? 1 : 0, {
      duration: DETAILS_CHROME_MS,
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
  }, [detailsChrome, showStackChrome]);

  useEffect(() => {
    if (homeStackOverlay === 'details' && homeStackHabitId != null) {
      const h = habits.find((x) => String(x.id) === homeStackHabitId);
      setStackPrimary(h?.title?.trim() || 'Habit');
      setStackSecondary(null);
      return;
    }
    if (homeStackOverlay === 'edit' && homeStackHabitId != null) {
      const h = habits.find((x) => String(x.id) === homeStackHabitId);
      setStackPrimary('Edit habit');
      setStackSecondary(h?.title?.trim() || '');
      return;
    }
  }, [habits, homeStackHabitId, homeStackOverlay]);

  useEffect(() => {
    if (showStackChrome || stackPrimary == null) return;
    const id = setTimeout(() => {
      setStackPrimary(null);
      setStackSecondary(null);
    }, DETAILS_CHROME_MS);
    return () => clearTimeout(id);
  }, [showStackChrome, stackPrimary]);

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

  const onBackFromStackOverlay = () => {
    if (homeStackOverlay === 'edit') {
      navigation.goBack();
      return;
    }
    if (homeStackOverlay === 'details') {
      navigation.navigate('HomeTab', { screen: 'Home' });
    }
  };

  const showStackSubtitleText = !subtitle && stackPrimary != null;

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
                disabled={!showStackChrome}
                onPress={onBackFromStackOverlay}
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
              source={logoSource}
              style={styles.logo}
              accessible={false}
              importantForAccessibility="no"
              resizeMode="contain"
            />
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{APP_DISPLAY_NAME}</Text>
              {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
              ) : showStackSubtitleText ? (
                <Animated.View style={detailsSubtitleStyle}>
                  <Text style={styles.subtitle}>{stackPrimary}</Text>
                  {stackSecondary ? (
                    <Text
                      style={styles.subtitleSecondary}
                      numberOfLines={2}
                      accessibilityLabel={`Habit name ${stackSecondary}`}
                    >
                      {stackSecondary}
                    </Text>
                  ) : null}
                </Animated.View>
              ) : null}
            </View>
            <ThemeToggle />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
