import { APP_LOCALE } from '@constants/locale';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useHabit } from '@hooks/useHabit';
import { layout, useAppTheme } from '@theme';
import { getDayDetailHabitRows } from '@utils/dayDetailHabitRows';
import { parseLocalDateKey } from '@utils/heatmapCalendarDates';
import { hexToRgba } from '@utils/hexToRgba';
import {
  type ElementRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createDayDetailsSheetStyles } from './DayDetailsSheet.styles';
import type { DayDetailsSheetProps } from './DayDetailsSheet.types';

const SNAP_POINTS: (string | number)[] = ['35%', '60%'];

const headerDateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  month: 'short',
  day: 'numeric',
});

type SheetStyles = ReturnType<typeof createDayDetailsSheetStyles>;

type HabitRowStyleSlice = Pick<
  SheetStyles,
  | 'habitRowPressable'
  | 'habitRow'
  | 'habitRowCompleted'
  | 'habitRowInner'
  | 'iconWrap'
  | 'iconEmoji'
  | 'habitBody'
  | 'habitTitle'
  | 'habitTitleCompleted'
  | 'statusDone'
  | 'statusTodo'
  | 'trailingIconSlot'
>;

type HabitRowProps = {
  title: string;
  completed: boolean;
  icon: string;
  accentColor?: string;
  rowStyles: HabitRowStyleSlice;
  iconTintDone: string;
  iconTintTodo: string;
};

function areHabitRowEqual(a: HabitRowProps, b: HabitRowProps): boolean {
  return (
    a.title === b.title &&
    a.completed === b.completed &&
    a.icon === b.icon &&
    a.accentColor === b.accentColor &&
    a.rowStyles === b.rowStyles &&
    a.iconTintDone === b.iconTintDone &&
    a.iconTintTodo === b.iconTintTodo
  );
}

const DayDetailsHabitRow = memo(function DayDetailsHabitRow({
  title,
  completed,
  icon,
  accentColor,
  rowStyles,
  iconTintDone,
  iconTintTodo,
}: HabitRowProps) {
  const accentShell = useMemo(() => {
    const hex = accentColor?.trim();
    if (!hex) {
      return { card: undefined, iconWrap: undefined };
    }
    return {
      card: { borderLeftWidth: 3 as const, borderLeftColor: hex },
      iconWrap: { backgroundColor: hexToRgba(hex, 0.2) },
    };
  }, [accentColor]);

  return (
    <Pressable
      accessible={false}
      onPress={() => {}}
      style={({ pressed }) => [
        rowStyles.habitRowPressable,
        {
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <View
        style={[
          rowStyles.habitRow,
          completed && rowStyles.habitRowCompleted,
          accentShell.card,
        ]}
      >
        <View style={rowStyles.habitRowInner}>
          <View style={[rowStyles.iconWrap, accentShell.iconWrap]}>
            <Text style={rowStyles.iconEmoji}>{icon}</Text>
          </View>
          <View style={rowStyles.habitBody}>
            <Text
              style={[
                rowStyles.habitTitle,
                completed && rowStyles.habitTitleCompleted,
              ]}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text style={completed ? rowStyles.statusDone : rowStyles.statusTodo}>
              {completed ? 'Done' : 'Not done'}
            </Text>
          </View>
          <View style={rowStyles.trailingIconSlot}>
            <Ionicons
              name={
                completed ? 'checkmark-circle' : 'checkmark-circle-outline'
              }
              size={layout.habitCardDoneIconSize}
              color={completed ? iconTintDone : iconTintTodo}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}, areHabitRowEqual);

export const DayDetailsSheet = ({ date, onClose }: DayDetailsSheetProps) => {
  const { theme } = useAppTheme();
  const { habits } = useHabit();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createDayDetailsSheetStyles(theme),
    [theme],
  );

  const rowStyles = useMemo<HabitRowStyleSlice>(
    () => ({
      habitRowPressable: styles.habitRowPressable,
      habitRow: styles.habitRow,
      habitRowCompleted: styles.habitRowCompleted,
      habitRowInner: styles.habitRowInner,
      iconWrap: styles.iconWrap,
      iconEmoji: styles.iconEmoji,
      habitBody: styles.habitBody,
      habitTitle: styles.habitTitle,
      habitTitleCompleted: styles.habitTitleCompleted,
      statusDone: styles.statusDone,
      statusTodo: styles.statusTodo,
      trailingIconSlot: styles.trailingIconSlot,
    }),
    [styles],
  );

  const iconTints = useMemo(
    () => ({
      done: theme.colors.primary.dark,
      todo: theme.colors.text.hint,
    }),
    [theme.colors.primary.dark, theme.colors.text.hint],
  );

  const bottomSheetRef = useRef<ElementRef<typeof BottomSheetModal>>(null);

  const { rows, completed, total, percent } = useMemo(
    () => getDayDetailHabitRows(habits, date),
    [habits, date],
  );

  const headerTitle = useMemo(
    () => headerDateFormatter.format(parseLocalDateKey(date)),
    [date],
  );

  const headerSubtitle = useMemo(() => {
    if (total === 0) return null;
    return `${String(percent)}% completion`;
  }, [percent, total]);

  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    contentOpacity.setValue(0);
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [contentOpacity, date]);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleIndicatorStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.border.subtle,
      width: 44,
      height: 5,
      borderRadius: 3,
    }),
    [theme.colors.border.subtle],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={SNAP_POINTS}
      enablePanDownToClose
      enableDynamicSizing={false}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={handleIndicatorStyle}
      topInset={insets.top}
    >
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 16 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[styles.scrollContentFade, { opacity: contentOpacity }]}
        >
          <View style={styles.header}>
            <Text style={styles.headerDate}>{headerTitle}</Text>
            {total > 0 ? (
              <View style={styles.headerCompletionBlock}>
                <Text style={styles.headerCompletionBig}>
                  {String(completed)} / {String(total)}
                </Text>
                <Text style={styles.headerCompletedLabel}>completed</Text>
                {headerSubtitle != null ? (
                  <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
                ) : null}
              </View>
            ) : null}
          </View>

          {total === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTitle}>No habits tracked</Text>
              <Text style={styles.emptySubtitle}>
                Start building your routine 💪
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {rows.map((row) => (
                <DayDetailsHabitRow
                  key={row.id}
                  title={row.title}
                  completed={row.completed}
                  icon={row.icon}
                  accentColor={row.accentColor}
                  rowStyles={rowStyles}
                  iconTintDone={iconTints.done}
                  iconTintTodo={iconTints.todo}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
