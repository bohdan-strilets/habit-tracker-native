import type { HeatmapCalendarStyles } from '@components/HeatmapCalendar/HeatmapCalendar.styles';
import { HEATMAP_CELL_SIZE, HeatmapCell } from '@components/HeatmapCell';
import { APP_LOCALE } from '@constants/locale';
import {
  type HeatmapCellModel,
  type HeatmapColumnModel,
} from '@utils/buildHeatmapColumns';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

const WEEKDAY_SHORT_MON0: readonly string[] = (() => {
  const fmt = new Intl.DateTimeFormat(APP_LOCALE, { weekday: 'short' });
  const monday = new Date(2024, 0, 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return fmt.format(d);
  });
})();

const SPARSE_DAY_LABELS: readonly (string | null)[] = [
  WEEKDAY_SHORT_MON0[0],
  null,
  WEEKDAY_SHORT_MON0[2],
  null,
  WEEKDAY_SHORT_MON0[4],
  null,
  null,
];

type HeatmapWeekColumnProps = {
  column: HeatmapColumnModel;
  gridStyles: HeatmapCalendarStyles;
  onDayPress: (dateKey: string) => void;
  todayKey: string;
  todayRingColor: string;
};

function areWeekColumnPropsEqual(
  a: HeatmapWeekColumnProps,
  b: HeatmapWeekColumnProps,
): boolean {
  return (
    a.column === b.column &&
    a.gridStyles === b.gridStyles &&
    a.onDayPress === b.onDayPress &&
    a.todayKey === b.todayKey &&
    a.todayRingColor === b.todayRingColor
  );
}

const HeatmapWeekColumn = memo(function HeatmapWeekColumn({
  column,
  gridStyles,
  onDayPress,
  todayKey,
  todayRingColor,
}: HeatmapWeekColumnProps) {
  return (
    <View style={gridStyles.weekColumn}>
      <View style={gridStyles.monthShell}>
        {column.monthLabel ? (
          <Text style={gridStyles.monthText} numberOfLines={1}>
            {column.monthLabel}
          </Text>
        ) : null}
      </View>
      <View style={gridStyles.cellsStack}>
        {column.cells.map((cell: HeatmapCellModel, idx: number) => {
          const key =
            cell.kind === 'day'
              ? cell.dateKey
              : `${column.weekKey}-pad-${String(idx)}`;
          return cell.kind === 'pad' ? (
            <HeatmapCell key={key} variant="pad" size={HEATMAP_CELL_SIZE} />
          ) : (
            <HeatmapCell
              key={key}
              variant="day"
              size={HEATMAP_CELL_SIZE}
              dateKey={cell.dateKey}
              completed={cell.completed}
              total={cell.total}
              isToday={cell.dateKey === todayKey}
              onDayPress={onDayPress}
              todayRingColor={todayRingColor}
            />
          );
        })}
      </View>
    </View>
  );
}, areWeekColumnPropsEqual);

export type HeatmapCalendarGridProps = {
  columns: readonly HeatmapColumnModel[];
  gridStyles: HeatmapCalendarStyles;
  todayKey: string;
  todayRingColor: string;
  onDayPress: (dateKey: string) => void;
  fadeSurfaceColor: string;
  /** Mirrors prior scroll effect deps: data identity + column count. */
  scrollDependency: unknown;
  columnsLength: number;
};

export const HeatmapCalendarGrid = ({
  columns,
  gridStyles,
  todayKey,
  todayRingColor,
  onDayPress,
  fadeSurfaceColor,
  scrollDependency,
  columnsLength,
}: HeatmapCalendarGridProps) => {
  const scrollRef = useRef<ScrollView>(null);

  const scrollToEnd = useCallback(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(scrollToEnd);
    return () => cancelAnimationFrame(id);
  }, [scrollDependency, columnsLength, scrollToEnd]);

  const fadeTransparent = useMemo(
    () =>
      `${fadeSurfaceColor}${
        fadeSurfaceColor.length === 7 ? '00' : ''
      }`,
    [fadeSurfaceColor],
  );

  const dayLabelsStackStyle = gridStyles.cellsStack;

  return (
    <View style={gridStyles.row}>
      <View style={gridStyles.dayLabelColumn}>
        <View style={dayLabelsStackStyle}>
          {SPARSE_DAY_LABELS.map((label, idx) => (
            <View key={`dl-${String(idx)}`} style={gridStyles.dayLabelCell}>
              {label ? (
                <Text style={gridStyles.dayLabelText} numberOfLines={1}>
                  {label}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <View style={gridStyles.scrollClip}>
        <ScrollView
          ref={scrollRef}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={scrollToEnd}
          contentContainerStyle={gridStyles.scrollInner}
        >
          <View style={gridStyles.gridRow}>
            {columns.map((column) => (
              <HeatmapWeekColumn
                key={column.weekKey}
                column={column}
                gridStyles={gridStyles}
                onDayPress={onDayPress}
                todayKey={todayKey}
                todayRingColor={todayRingColor}
              />
            ))}
          </View>
        </ScrollView>

        <LinearGradient
          pointerEvents="none"
          colors={[fadeSurfaceColor, fadeTransparent]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gridStyles.fade, gridStyles.fadeLeft]}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[fadeTransparent, fadeSurfaceColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gridStyles.fade, gridStyles.fadeRight]}
        />
      </View>
    </View>
  );
};
