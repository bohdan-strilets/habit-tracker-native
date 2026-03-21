import { APP_LOCALE } from '@constants/locale';
import { PRESS_SPRING } from '@constants/pressSpring';
import { parseLocalDateKey } from '@utils/heatmapCalendarDates';
import { heatmapIntensityColor } from '@utils/heatmapIntensityColor';
import { hapticHeatmapDayPress } from '@utils/safeHaptics';
import { memo, useCallback } from 'react';
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
};

export type HeatmapCellProps = PadProps | DayProps;

const displayDayFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  month: 'short',
  day: 'numeric',
});

type HeatmapDayCellProps = {
  dateKey: string;
  completed: number;
  total: number;
  isToday: boolean;
  onDayPress: (dateKey: string) => void;
  todayRingColor: string;
};

const HeatmapDayCell = memo(function HeatmapDayCell({
  dateKey,
  completed,
  total,
  isToday,
  onDayPress,
  todayRingColor,
}: HeatmapDayCellProps) {
  const bg = heatmapIntensityColor(completed, total);
  const when = displayDayFormatter.format(parseLocalDateKey(dateKey));
  const ratioLabel =
    total > 0 ? `${Math.round((completed / total) * 100)}%` : 'no habits';

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
      accessibilityLabel={`${when}, ${completed} of ${total} habits completed, ${ratioLabel}`}
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
    a.onDayPress === b.onDayPress
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
      a.onDayPress === b.onDayPress
    );
  }
  return false;
}

export const HeatmapCell = memo(HeatmapCellInner, propsEqual);
