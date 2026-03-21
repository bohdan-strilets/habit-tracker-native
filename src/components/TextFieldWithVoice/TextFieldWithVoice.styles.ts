import type { AppTheme } from '@theme';
import { fontSize, layout, lineHeight, radii, space } from '@theme';
import { StyleSheet } from 'react-native';

const MIC_RAIL = 52;
const MIC_INNER = 44;

export const createTextFieldWithVoiceStyles = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
    },

    /** One surface: matches standalone TextField chrome. */
    shell: {
      width: '100%',
      minHeight: layout.buttonHeight,
      borderWidth: 1,
      borderRadius: radii.md,
      borderColor: theme.colors.border.default,
      backgroundColor: theme.colors.background.input,
      overflow: 'hidden',
      ...theme.shadows.inputShadow,
    },

    shellRecording: {
      borderColor: theme.colors.primary.main,
    },

    shellUnavailable: {
      opacity: 0.92,
    },

    innerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: layout.buttonHeight - 2,
    },

    innerRowMultiline: {
      alignItems: 'stretch',
    },

    fieldWrap: {
      flex: 1,
      minWidth: 0,
      justifyContent: 'center',
    },

    fieldWrapMultiline: {
      justifyContent: 'flex-start',
    },

    micRail: {
      width: MIC_RAIL,
      alignSelf: 'stretch',
      minHeight: layout.buttonHeight - 2,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: theme.colors.border.hairline,
      backgroundColor: theme.colors.background.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    micRailMultiline: {
      justifyContent: 'flex-start',
      paddingTop: space.mdPlus,
    },

    micButton: {
      width: MIC_INNER,
      height: MIC_INNER,
      borderRadius: MIC_INNER / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },

    micButtonRecording: {
      backgroundColor: theme.colors.semantic.successLight,
    },

    micButtonUnavailable: {
      opacity: 0.65,
    },

    micButtonDisabled: {
      opacity: 0.4,
    },

    hint: {
      marginTop: space.sm,
      marginHorizontal: space.xs,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.body,
      color: theme.colors.text.hint,
    },
  });
