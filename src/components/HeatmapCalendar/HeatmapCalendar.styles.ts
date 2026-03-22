import { HEATMAP_CELL_SIZE } from '@components/HeatmapCell';
import type { AppTheme } from '@theme';
import { fontSize, fontWeight, letterSpacing, lineHeight, space } from '@theme';
import { heatmapIntensityColor } from '@utils/heatmapIntensityColor';
import { StyleSheet } from 'react-native';

export const HEATMAP_GAP = 4;
export const HEATMAP_MONTH_ROW_HEIGHT = 20;
export const HEATMAP_FADE_WIDTH = 14;

export type HeatmapLayoutMetrics = {
  cellSize: number;
  gap: number;
  /** Typically `cellSize + gap` (column track width). */
  columnWidth: number;
  monthRowHeight: number;
};

export function heatmapWeekColumnWidth(cellSize: number, gap: number): number {
  return cellSize + gap;
}

export const defaultHeatmapLayoutMetrics = (): HeatmapLayoutMetrics => ({
  cellSize: HEATMAP_CELL_SIZE,
  gap: HEATMAP_GAP,
  columnWidth: heatmapWeekColumnWidth(HEATMAP_CELL_SIZE, HEATMAP_GAP),
  monthRowHeight: HEATMAP_MONTH_ROW_HEIGHT,
});

export const createHeatmapCalendarStyles = (
  theme: AppTheme,
  metrics: HeatmapLayoutMetrics,
) =>
  StyleSheet.create({
    title: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.tertiary,
      letterSpacing: letterSpacing.section,
      textTransform: 'uppercase',
      marginBottom: space.xs,
    },
    subtitle: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.tight,
      color: theme.colors.text.muted,
      marginBottom: space.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      minWidth: 0,
    },
    dayLabelColumn: {
      width: 26,
      paddingRight: space.xs,
      paddingTop: metrics.monthRowHeight + metrics.gap,
    },
    dayLabelCell: {
      height: metrics.cellSize,
      justifyContent: 'center',
    },
    dayLabelText: {
      fontSize: fontSize.tiny,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.subtle,
    },
    scrollClip: {
      flex: 1,
      minWidth: 0,
      position: 'relative',
    },
    scrollInner: {
      flexDirection: 'column',
    },
    weekColumn: {
      flexDirection: 'column',
      alignItems: 'center',
      width: metrics.columnWidth,
      marginRight: metrics.gap,
    },
    monthShell: {
      width: metrics.columnWidth,
      height: metrics.monthRowHeight,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 2,
    },
    monthText: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.muted,
    },
    cellsStack: {
      gap: metrics.gap,
      alignItems: 'center',
    },
    gridRow: {
      flexDirection: 'row',
    },
    fade: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: HEATMAP_FADE_WIDTH,
    },
    fadeLeft: {
      left: 0,
    },
    fadeRight: {
      right: 0,
    },
    legendBlock: {
      marginTop: space.sm,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: space.xs,
    },
    legendLabel: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.subtle,
    },
    legendArrow: {
      fontSize: fontSize.xs,
      color: theme.colors.text.hint,
    },
    legendSwatches: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    legendSwatch: {
      width: HEATMAP_CELL_SIZE,
      height: HEATMAP_CELL_SIZE,
      borderRadius: 2,
    },
    legendSwatch0: {
      backgroundColor: heatmapIntensityColor(0, 5),
    },
    legendSwatch1: {
      backgroundColor: heatmapIntensityColor(1, 5),
    },
    legendSwatch2: {
      backgroundColor: heatmapIntensityColor(2, 5),
    },
    legendSwatch3: {
      backgroundColor: heatmapIntensityColor(3, 5),
    },
    legendSwatch4: {
      backgroundColor: heatmapIntensityColor(5, 5),
    },
  });

export type HeatmapCalendarStyles = ReturnType<typeof createHeatmapCalendarStyles>;
