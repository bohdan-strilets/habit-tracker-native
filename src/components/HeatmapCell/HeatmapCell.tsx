import { localeTagForAppLanguage } from '@i18n/localeTag';
import { PRESS_SPRING } from '@constants/pressSpring';
import { parseLocalDateKey } from '@utils/heatmapCalendarDates';
import { heatmapIntensityColor } from '@utils/heatmapIntensityColor';
import { hapticHeatmapDayPress } from '@utils/safeHaptics';
import type { AppLanguage } from '@/types/Language';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const HEATMAP_CELL_SIZE = 12;
export const HEATMAP_CELL_RADIUS = 3;

const PAD_SLOT = Object.freeze({
  width: HEATMAP_CELL_SIZE,
  height: HEATMAP_CELL_SIZE,
});

const DAY_CELL_BASE = Object.freeze({
  width: HEATMAP_CELL_SIZE,
  height: HEATMAP_CELL_SIZE,
  borderRadius: HEATMAP_CELL_RADIUS,
});

type PadProps = {
  variant: 'pad';
  size: number;
};

type DayProps = {
  variant: 'day';
  size: number;
  dateKey: string;
  completed: number;
  total: number;
  isToday: boolean;
  onDayPress: (dateKey: string) => void;
  todayRingColor: string;
  localeKey: string;
};

export type HeatmapCellProps = PadProps | DayProps;

type HeatmapDayCellProps = {
  dateKey: string;
  completed: number;
  total: number;
  isToday: boolean;
  onDayPress: (dateKey: string) => void;
  todayRingColor: string;
  localeKey: string;
};

const HeatmapDayCell = memo(function HeatmapDayCell({
  dateKey,
  completed,
  total,
  isToday,
  onDayPress,
  todayRingColor,
  localeKey,
}: HeatmapDayCellProps) {
  const { t } = useTranslation();
  const bg = heatmapIntensityColor(completed, total);
  const when = useMemo(() => {
    const locale = localeTagForAppLanguage(localeKey as AppLanguage);
    const displayDayFormatter = new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    });
    return displayDayFormatter.format(parseLocalDateKey(dateKey));
  }, [dateKey, localeKey]);
  const ratioLabel =
    total > 0
      ? `${Math.round((completed / total) * 100)}%`
      : t('heatmap.cellNoHabits');

  const a11yLabel = t('heatmap.dayCellA11y', {
    date: when,
    completed,
    total,
    ratio: ratioLabel,
  });

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.95, PRESS_SPRING);
  }, [scale]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, PRESS_SPRING);
  }, [scale]);

  const onPress = useCallback(() => {
    hapticHeatmapDayPress();
    onDayPress(dateKey);
  }, [dateKey, onDayPress]);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      style={styles.pressableSlot}
    >
      <Animated.View
        style={[
          DAY_CELL_BASE,
          styles.dayFill,
          { backgroundColor: bg },
          isToday && {
            borderWidth: 1.5 as const,
            borderColor: todayRingColor,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
}, areDayCellPropsEqual);

function areDayCellPropsEqual(
  a: HeatmapDayCellProps,
  b: HeatmapDayCellProps,
): boolean {
  return (
    a.dateKey === b.dateKey &&
    a.completed === b.completed &&
    a.total === b.total &&
    a.isToday === b.isToday &&
    a.todayRingColor === b.todayRingColor &&
    a.onDayPress === b.onDayPress &&
    a.localeKey === b.localeKey
  );
}

const styles = StyleSheet.create({
  pressableSlot: {
    width: HEATMAP_CELL_SIZE,
    height: HEATMAP_CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayFill: {
    overflow: 'hidden',
  },
});

function HeatmapCellInner(props: HeatmapCellProps) {
  if (props.variant === 'pad') {
    const padLayout =
      props.size === HEATMAP_CELL_SIZE
        ? PAD_SLOT
        : { width: props.size, height: props.size };
    return (
      <View
        style={padLayout}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    );
  }

  return (
    <HeatmapDayCell
      dateKey={props.dateKey}
      completed={props.completed}
      total={props.total}
      isToday={props.isToday}
      onDayPress={props.onDayPress}
      todayRingColor={props.todayRingColor}
      localeKey={props.localeKey}
    />
  );
}

function propsEqual(a: HeatmapCellProps, b: HeatmapCellProps): boolean {
  if (a.variant !== b.variant) return false;
  if (a.variant === 'pad' && b.variant === 'pad') {
    return a.size === b.size;
  }
  if (a.variant === 'day' && b.variant === 'day') {
    return (
      a.size === b.size &&
      a.dateKey === b.dateKey &&
      a.completed === b.completed &&
      a.total === b.total &&
      a.isToday === b.isToday &&
      a.todayRingColor === b.todayRingColor &&
      a.onDayPress === b.onDayPress &&
      a.localeKey === b.localeKey
    );
  }
  return false;
}

export const HeatmapCell = memo(HeatmapCellInner, propsEqual);
