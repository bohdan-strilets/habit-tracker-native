import type { AppTheme } from '@theme';
import { fontSize, fontWeight, layout, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createHabitCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    wrap: {},
    card: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderRadius: radii.md,
      backgroundColor: theme.colors.background.surface,
      ...theme.shadows.cardShadow,
      overflow: 'hidden',
    },
    cardMain: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: space.base,
      minWidth: 0,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: radii.sm,
      backgroundColor: theme.colors.background.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: space.base,
    },
    icon: {
      fontSize: fontSize['3xl'],
    },
    body: {
      flex: 1,
      minWidth: 0,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space.sm,
      marginBottom: space.sm,
    },
    title: {
      flex: 1,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.primary,
    },
    categoryMeta: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.hint,
      marginBottom: space.xs,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    notesMeta: {
      fontSize: fontSize.sm,
      color: theme.colors.text.subtle,
      marginBottom: space.sm,
    },
    statusDone: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: theme.colors.primary.dark,
    },
    statusTodo: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.hint,
    },
    countLabel: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.hint,
      marginBottom: space.xs,
    },
    doneColumn: {
      alignSelf: 'stretch',
      width: layout.habitCardDoneColumnWidth,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: theme.colors.border.hairline,
    },
    doneButton: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: radii.md,
      borderBottomRightRadius: radii.md,
      backgroundColor: theme.colors.primary.main,
    },
    doneButtonMuted: {
      backgroundColor: theme.colors.background.surfaceMuted,
    },
    doneButtonPressed: {
      opacity: 0.88,
    },
  });
