import { Surface } from '@components/Surface';
import { localeTagForAppLanguage } from '@i18n/localeTag';
import { radii, space, useAppTheme } from '@theme';
import { hexToRgb } from '@utils/hexToRgba';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import type { AppLanguage } from '@/types/Language';

import { createStatsChartStyles } from './StatsChart.styles';
import type { StatsChartProps } from './StatsChart.types';

function formatAxisDay(
  yyyyMmDd: string,
  locale: string,
): { day: string; month: string } {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  if (!y || !m || !d) {
    return { day: '', month: '' };
  }
  const date = new Date(y, m - 1, d);
  const day = date.toLocaleDateString(locale, { day: 'numeric' });
  const month = date.toLocaleDateString(locale, { month: 'short' });
  return { day, month };
}

function buildSparseLabels(
  dates: readonly string[],
  locale: string,
): string[] {
  const n = dates.length;
  if (n === 0) return [];

  const indices = new Set<number>();
  indices.add(0);
  indices.add(n - 1);
  if (n > 4) {
    indices.add(Math.floor(n * 0.25));
    indices.add(Math.floor(n * 0.5));
    indices.add(Math.floor(n * 0.75));
  } else if (n > 2) {
    indices.add(Math.floor(n / 2));
  }

  return dates.map((date, i) => {
    if (!indices.has(i)) return '';
    const { day, month } = formatAxisDay(date, locale);
    if (!day) return '';
    return `${day} ${month}`;
  });
}

export const StatsChart = ({ days }: StatsChartProps) => {
  const { t, i18n } = useTranslation();
  const { width: windowWidth } = useWindowDimensions();
  const { theme, scheme } = useAppTheme();
  const styles = useMemo(
    () => createStatsChartStyles(theme.colors),
    [theme.colors],
  );

  const locale = localeTagForAppLanguage(i18n.language as AppLanguage);

  const { chartWidth, data, labels, summary } = useMemo(() => {
    const w = Math.max(280, windowWidth - space.xl * 4 - 8);
    const pts = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const values = pts.map((p) => p.completed);
    const dates = pts.map((p) => p.date);
    const lbl = buildSparseLabels(dates, locale);

    let summaryBlock: {
      avg: number;
      max: number;
      active: number;
      totalDays: number;
    } | null = null;
    if (values.length > 0) {
      const sum = values.reduce((a, b) => a + b, 0);
      summaryBlock = {
        avg: sum / values.length,
        max: Math.max(...values),
        active: values.filter((v) => v > 0).length,
        totalDays: values.length,
      };
    }

    return {
      chartWidth: w,
      data: values,
      labels: lbl,
      summary: summaryBlock,
    };
  }, [days, locale, windowWidth]);

  const chartConfig = useMemo(() => {
    const { r, g, b } = hexToRgb(theme.colors.primary.main);
    const from = theme.colors.background.surfaceMuted;
    const to = theme.colors.background.surface;
    const gridRgb = hexToRgb(theme.colors.border.light);
    /** Solid fills so Y/X labels stay readable on light gradients (library passes opacity=0.8). */
    const axisLabelFill =
      scheme === 'light'
        ? theme.colors.text.secondary
        : theme.colors.text.tertiary;

    return {
      backgroundColor: to,
      backgroundGradientFrom: from,
      backgroundGradientTo: to,
      decimalPlaces: 0,
      strokeWidth: 2.5,
      color: (opacity = 1) => `rgba(${r}, ${g}, ${b}, ${opacity})`,
      labelColor: (_opacity = 1) => axisLabelFill,
      fillShadowGradientFrom: `rgba(${r}, ${g}, ${b}, ${scheme === 'dark' ? 0.45 : 0.28})`,
      fillShadowGradientTo: `rgba(${r}, ${g}, ${b}, 0.02)`,
      propsForBackgroundLines: {
        stroke: `rgba(${gridRgb.r}, ${gridRgb.g}, ${gridRgb.b}, ${scheme === 'dark' ? 0.28 : 0.4})`,
        strokeDasharray: '0',
        strokeWidth: 1,
      },
      propsForVerticalLabels: {
        fontSize: 10,
        fill: axisLabelFill,
      },
      propsForHorizontalLabels: {
        fontSize: 11,
        fill: axisLabelFill,
      },
    };
  }, [scheme, theme.colors]);

  const chartDescriptionText = t('stats.chartDescription', {
    defaultValue:
      'Number of habits you marked done each day (out of those scheduled that day).',
  });

  if (data.length === 0) {
    return (
      <Surface elevation={2} radius={radii.lg} padding={space.xl}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>{t('stats.chartTitle')}</Text>
          <Text style={styles.subtitle}>{chartDescriptionText}</Text>
        </View>
        <Text style={styles.emptyText}>{t('stats.chartEmpty')}</Text>
      </Surface>
    );
  }

  const avgStr = summary != null ? summary.avg.toFixed(1) : '—';
  const maxStr = summary != null ? String(summary.max) : '—';
  const activeStr =
    summary != null
      ? t('stats.chartMetricActiveValue', {
        active: summary.active,
        total: summary.totalDays,
      })
      : '—';

  return (
    <Surface elevation={2} radius={radii.lg} padding={space.xl}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>{t('stats.chartTitle')}</Text>
        <Text style={styles.subtitle}>{chartDescriptionText}</Text>
      </View>

      {summary != null ? (
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>{t('stats.chartMetricAvg')}</Text>
            <Text style={styles.metricValue} numberOfLines={1}>
              {avgStr}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>{t('stats.chartMetricMax')}</Text>
            <Text style={styles.metricValue} numberOfLines={1}>
              {maxStr}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>
              {t('stats.chartMetricActive')}
            </Text>
            <Text style={styles.metricValue} numberOfLines={1}>
              {activeStr}
            </Text>
          </View>
        </View>
      ) : null}

      <View style={styles.chartBlock}>
        <LineChart
          data={{
            labels,
            datasets: [{ data: data.length > 0 ? data : [0] }],
          }}
          width={chartWidth}
          height={236}
          withDots={false}
          withShadow
          bezier
          fromZero
          segments={4}
          withInnerLines
          withVerticalLines={false}
          withHorizontalLines
          withVerticalLabels
          verticalLabelRotation={data.length > 14 ? -35 : 0}
          chartConfig={chartConfig}
          formatYLabel={(y) => String(Math.round(Number(y)))}
          yLabelsOffset={4}
          xLabelsOffset={0}
          style={{
            marginVertical: space.sm,
            borderRadius: radii.md,
          }}
        />
      </View>

      <Text style={styles.footnote}>{t('stats.chartFootnote')}</Text>
    </Surface>
  );
};
