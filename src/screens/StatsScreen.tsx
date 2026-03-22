import { DayDetailsSheet } from '@components/DayDetailsSheet';
import { HeatmapCalendar } from '@components/HeatmapCalendar';
import { ScreenBackground } from '@components/ScreenBackground';
import { StatsCard } from '@components/StatsCard';
import { StatsChart } from '@components/StatsChart';
import { MOCK_STATS_HEATMAP_DAYS } from '@constants/mockStatsData';
import { useHabit } from '@hooks/useHabit';
import { fontSize, space, useAppTheme } from '@theme';
import { buildHeatmapDaysFromHabits } from '@utils/buildHeatmapDaysFromHabits';
import {
  computeBestStreak,
  computeCompletionRate,
  computeTotalCompleted,
  lastNDays,
} from '@utils/statsCalculations';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { createStatsScreenStyles } from './StatsScreen.styles';

export const StatsScreen = () => {
  const { t } = useTranslation();
  const { habits } = useHabit();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStatsScreenStyles(), []);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const heatmapEndDate = useMemo(() => new Date(), []);

  const heatmapDays = useMemo(() => {
    if (habits.length > 0) {
      return buildHeatmapDaysFromHabits(habits, heatmapEndDate, 90);
    }
    return MOCK_STATS_HEATMAP_DAYS;
  }, [habits, heatmapEndDate]);

  const { bestStreak, completionPct, totalDone } = useMemo(() => {
    const best = computeBestStreak(heatmapDays);
    const rate = computeCompletionRate(heatmapDays);
    const total = computeTotalCompleted(heatmapDays);
    return {
      bestStreak: best,
      completionPct: Math.round(rate * 100),
      totalDone: total,
    };
  }, [heatmapDays]);

  const chartDays = useMemo(() => lastNDays(heatmapDays, 30), [heatmapDays]);

  const showDemoHint = habits.length === 0;

  return (
    <ScreenBackground style={styles.scroll}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {showDemoHint ? (
          <Text
            style={{
              fontSize: fontSize.sm,
              color: theme.colors.text.hint,
            }}
          >
            {t('stats.demoDataHint')}
          </Text>
        ) : null}

        <View style={{ gap: space.sm }}>
          <View style={styles.kpiRow}>
            <StatsCard
              style={styles.kpiItem}
              icon="🔥"
              value={String(bestStreak)}
              label={t('stats.kpiBestStreak')}
            />
            <StatsCard
              style={styles.kpiItem}
              icon="📈"
              value={`${completionPct}%`}
              label={t('stats.kpiCompletionRate')}
            />
            <StatsCard
              style={styles.kpiItem}
              icon="📅"
              value={String(totalDone)}
              label={t('stats.kpiTotalCompleted')}
            />
          </View>
          <Text
            style={{
              fontSize: fontSize.xs,
              lineHeight: fontSize.xs * 1.45,
              color: theme.colors.text.hint,
            }}
          >
            {t('stats.kpiPeriodHint')}
          </Text>
        </View>

        <HeatmapCalendar
          data={heatmapDays}
          endDate={heatmapEndDate}
          onDayPress={setSelectedDate}
        />

        <StatsChart days={chartDays} />
      </ScrollView>
      {selectedDate != null ? (
        <DayDetailsSheet
          key={selectedDate}
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      ) : null}
    </ScreenBackground>
  );
};
