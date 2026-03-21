import type { AppTheme } from '@theme';
import { fontSize, fontWeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

export const createDayDetailsSheetStyles = (theme: AppTheme) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: space.base,
      paddingBottom: space.lg,
    },
    scrollContentFade: {
      flexGrow: 1,
    },
    header: {
      paddingTop: space.sm,
      paddingBottom: space.lg,
    },
    headerDate: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.muted,
      letterSpacing: 0.2,
    },
    headerCompletionBlock: {
      marginTop: space.sm,
    },
    headerCompletionBig: {
      fontSize: fontSize.hero,
      fontWeight: fontWeight.bold,
      color: theme.colors.text.primary,
      letterSpacing: -0.5,
    },
    headerCompletedLabel: {
      marginTop: 2,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.hint,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    headerSubtitle: {
      marginTop: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.muted,
    },
    list: {
      gap: space.sm,
    },
    habitRowPressable: {
      borderRadius: radii.md,
    },
    habitRow: {
      borderRadius: radii.md,
      backgroundColor: theme.colors.background.surface,
      ...theme.shadows.cardShadow,
      overflow: 'hidden',
    },
    habitRowCompleted: {
      opacity: 0.68,
    },
    habitRowInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: space.sm,
      paddingHorizontal: space.base,
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
    iconEmoji: {
      fontSize: fontSize['3xl'],
    },
    habitBody: {
      flex: 1,
      minWidth: 0,
    },
    habitTitle: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: space.xs,
    },
    habitTitleCompleted: {
      textDecorationLine: 'line-through',
      color: theme.colors.text.muted,
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
    trailingIconSlot: {
      marginLeft: space.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyWrap: {
      paddingVertical: space['7xl'],
      paddingHorizontal: space.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyTitle: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    emptySubtitle: {
      marginTop: space.sm,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      color: theme.colors.text.muted,
      textAlign: 'center',
      lineHeight: 22,
    },
    sheetBackground: {
      borderTopLeftRadius: radii.xl,
      borderTopRightRadius: radii.xl,
      backgroundColor: theme.colors.background.surface,
    },
  });
