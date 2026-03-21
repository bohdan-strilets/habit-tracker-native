import { Card } from '@components/Card';
import { HeatmapCalendarGrid } from '@components/HeatmapCalendarGrid';
import { radii, space, useAppTheme } from '@theme';
import { buildHeatmapColumns } from '@utils/buildHeatmapColumns';
import {
  addLocalDays,
  startOfLocalDay,
  toLocalDateKey,
} from '@utils/heatmapCalendarDates';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';

import {
  createHeatmapCalendarStyles,
  defaultHeatmapLayoutMetrics,
} from './HeatmapCalendar.styles';
import type { HeatmapCalendarProps } from './HeatmapCalendar.types';

const LAYOUT_METRICS = defaultHeatmapLayoutMetrics();

const LEGEND_SWATCH_KEYS = [
  'legendSwatch0',
  'legendSwatch1',
  'legendSwatch2',
  'legendSwatch3',
  'legendSwatch4',
] as const;

const defaultHeatmapOnDayPress = (dateKey: string) => {
  if (__DEV__) {
    console.log(dateKey);
  }
};

export const HeatmapCalendar = ({
  data,
  endDate,
  windowDays = 90,
  onDayPress: onDayPressProp,
}: HeatmapCalendarProps) => {
  const { theme } = useAppTheme();
  const gridStyles = useMemo(
    () => createHeatmapCalendarStyles(theme, LAYOUT_METRICS),
    [theme],
  );

  const rangeEnd = useMemo(
    () => startOfLocalDay(endDate ?? new Date()),
    [endDate],
  );

  const rangeStart = useMemo(
    () => addLocalDays(rangeEnd, -(windowDays - 1)),
    [rangeEnd, windowDays],
  );

  const dataByDate = useMemo(() => {
    const m = new Map<string, (typeof data)[number]>();
    for (let i = 0; i < data.length; i += 1) {
      const row = data[i];
      m.set(row.date, row);
    }
    return m;
  }, [data]);

  const columns = useMemo(
    () => buildHeatmapColumns(dataByDate, rangeStart, rangeEnd),
    [dataByDate, rangeEnd, rangeStart],
  );

  const todayKey = toLocalDateKey(startOfLocalDay(new Date()));

  const todayRingColor = theme.colors.primary.main;

  const handleDayPress = useCallback(
    (dateKey: string) => {
      (onDayPressProp ?? defaultHeatmapOnDayPress)(dateKey);
    },
    [onDayPressProp],
  );

  const fadeSurfaceColor = theme.colors.background.surface;

  return (
    <View style={gridStyles.outer}>
      <Card padding={space.base} radius={radii.md}>
        <Text style={gridStyles.title}>Last 90 days</Text>
        <Text style={gridStyles.subtitle}>
          Rows are weekdays (Mon–Sun), columns are weeks. Greener means you
          completed a larger share of your habits that day. Tap a square for
          exact numbers.
        </Text>
        <HeatmapCalendarGrid
          columns={columns}
          gridStyles={gridStyles}
          todayKey={todayKey}
          todayRingColor={todayRingColor}
          onDayPress={handleDayPress}
          fadeSurfaceColor={fadeSurfaceColor}
          scrollDependency={data}
          columnsLength={columns.length}
        />

        <View style={gridStyles.legendBlock}>
          <View style={gridStyles.legendRow}>
            <Text style={gridStyles.legendLabel}>Less</Text>
            <Text style={gridStyles.legendArrow} accessibilityElementsHidden>
              →
            </Text>
            <View style={gridStyles.legendSwatches}>
              {LEGEND_SWATCH_KEYS.map((k) => (
                <View
                  key={k}
                  style={[gridStyles.legendSwatch, gridStyles[k]]}
                />
              ))}
            </View>
            <Text style={gridStyles.legendArrow} accessibilityElementsHidden>
              →
            </Text>
            <Text style={gridStyles.legendLabel}>More</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
