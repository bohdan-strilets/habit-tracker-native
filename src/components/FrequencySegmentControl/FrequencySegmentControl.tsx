import { PRESS_SPRING } from '@constants/pressSpring';
import { useAppTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  createFrequencySegmentStyles,
  TRACK_PADDING,
} from './FrequencySegmentControl.styles';
import type { FrequencySegmentControlProps } from './FrequencySegmentControl.types';

const SEGMENT_SPRING = {
  ...PRESS_SPRING,
  stiffness: 360,
  damping: 26,
} as const;

export const FrequencySegmentControl = ({
  value,
  onChange,
}: FrequencySegmentControlProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createFrequencySegmentStyles(theme.colors),
    [theme.colors],
  );

  const active = theme.colors.semantic.successDark;
  const muted = theme.colors.text.secondary;

  const [trackWidth, setTrackWidth] = useState(0);
  const segmentInnerW = useSharedValue(0);
  const progress = useSharedValue(value === 'daily' ? 0 : 1);
  const isFirstLayout = useRef(true);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (trackWidth === 0) return;
    const inner = Math.max(0, (trackWidth - TRACK_PADDING * 2) / 2);
    segmentInnerW.value = inner;
    const target = value === 'daily' ? 0 : 1;
    if (isFirstLayout.current) {
      isFirstLayout.current = false;
      progress.value = target;
      return;
    }
    progress.value = withSpring(target, SEGMENT_SPRING);
  }, [value, trackWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: TRACK_PADDING + progress.value * segmentInnerW.value,
    width: segmentInnerW.value,
  }));

  const dailyTextStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(progress.value, [0, 1], [active, muted]),
    }),
    [active, muted],
  );

  const weeklyTextStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(progress.value, [0, 1], [muted, active]),
    }),
    [active, muted],
  );

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={t('frequency.groupA11y')}
      style={styles.track}
      onLayout={onTrackLayout}
    >
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      <View style={styles.row}>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ selected: value === 'daily' }}
          accessibilityLabel={t('frequency.dailyA11y')}
          onPress={() => onChange('daily')}
          style={({ pressed }) => [
            styles.segment,
            pressed && { opacity: 0.78 },
          ]}
        >
          <Animated.Text style={[styles.label, dailyTextStyle]}>
            {t('frequency.daily')}
          </Animated.Text>
        </Pressable>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ selected: value === 'weekly' }}
          accessibilityLabel={t('frequency.weeklyA11y')}
          onPress={() => onChange('weekly')}
          style={({ pressed }) => [
            styles.segment,
            pressed && { opacity: 0.78 },
          ]}
        >
          <Animated.Text style={[styles.label, weeklyTextStyle]}>
            {t('frequency.weekly')}
          </Animated.Text>
        </Pressable>
      </View>
    </View>
  );
};
