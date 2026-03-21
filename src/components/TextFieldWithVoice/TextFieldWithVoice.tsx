import Ionicons from '@expo/vector-icons/Ionicons';
import { fontSize, layout, space,useAppTheme  } from '@theme';
import {
  type ExpoSpeechRecognitionResultEvent,
  getExpoSpeechRecognitionNativeModule,
} from '@utils/expoSpeechRecognitionNative';
import { getSpeechRecognitionLocaleTag } from '@utils/speechRecognitionLocale';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  type TextStyle,
  View,
} from 'react-native';

import { createTextFieldWithVoiceStyles } from './TextFieldWithVoice.styles';
import type { TextFieldWithVoiceProps } from './TextFieldWithVoice.types';

const NO_SHADOW: TextStyle = {
  shadowOpacity: 0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 0 },
  elevation: 0,
};

function mergeDictatedIntoBase(
  base: string,
  finals: string[],
  live: string,
  maxLength?: number,
): string {
  const parts = [...finals];
  const liveTrim = live.trim();
  if (liveTrim) {
    parts.push(liveTrim);
  }
  const dictated = parts.join(' ').trim();
  const baseTrimEnd = base.replace(/\s+$/, '');
  let next =
    dictated.length === 0
      ? base
      : baseTrimEnd.length === 0
        ? dictated
        : `${baseTrimEnd} ${dictated}`;
  if (maxLength != null && next.length > maxLength) {
    next = next.slice(0, maxLength);
  }
  return next;
}

export const TextFieldWithVoice = ({
  value,
  onChangeText,
  maxLength,
  multiline,
  editable,
  style,
  voiceAccessibilityLabel = 'Hold to dictate',
  ...textFieldProps
}: TextFieldWithVoiceProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createTextFieldWithVoiceStyles(theme),
    [theme],
  );

  const [recording, setRecording] = useState(false);
  const onChangeTextRef = useRef(onChangeText);
  const valueRef = useRef(value);
  const baseRef = useRef('');
  const finalsRef = useRef<string[]>([]);
  const liveRef = useRef('');
  const subsRef = useRef<{ remove: () => void }[]>([]);
  const recordingRef = useRef(false);
  const fingerDownRef = useRef(false);
  const endFallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    onChangeTextRef.current = onChangeText;
    valueRef.current = value;
  }, [onChangeText, value]);

  const clearEndFallback = useCallback(() => {
    if (endFallbackTimerRef.current != null) {
      clearTimeout(endFallbackTimerRef.current);
      endFallbackTimerRef.current = null;
    }
  }, []);

  const removeListeners = useCallback(() => {
    subsRef.current.forEach((s) => s.remove());
    subsRef.current = [];
  }, []);

  const applyTranscript = useCallback(() => {
    const next = mergeDictatedIntoBase(
      baseRef.current,
      finalsRef.current,
      liveRef.current,
      maxLength,
    );
    onChangeTextRef.current(next);
  }, [maxLength]);

  const finishSession = useCallback(() => {
    clearEndFallback();
    removeListeners();
    recordingRef.current = false;
    setRecording(false);
    finalsRef.current = [];
    liveRef.current = '';
  }, [clearEndFallback, removeListeners]);

  const speechModule = useMemo(
    () => getExpoSpeechRecognitionNativeModule(),
    [],
  );

  const onResult = useCallback(
    (ev: ExpoSpeechRecognitionResultEvent) => {
      const raw = ev.results[0]?.transcript ?? '';
      const trimmed = raw.trim();
      if (ev.isFinal) {
        if (trimmed.length > 0) {
          finalsRef.current = [...finalsRef.current, trimmed];
        }
        liveRef.current = '';
      } else {
        liveRef.current = raw;
      }
      applyTranscript();
    },
    [applyTranscript],
  );

  const beginPressIn = useCallback(async () => {
    if (editable === false) {
      return;
    }

    if (!speechModule) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        'Voice input',
        'Speech recognition is not available in this build (for example Expo Go). Create a development build with native code — run npx expo run:ios or npx expo run:android after adding the expo-speech-recognition plugin.',
      );
      return;
    }

    fingerDownRef.current = true;

    try {
      speechModule.abort();
    } catch {
      /* ignore */
    }
    removeListeners();
    clearEndFallback();

    const perm = await speechModule.requestPermissionsAsync();
    if (!perm.granted) {
      fingerDownRef.current = false;
      Alert.alert(
        'Voice input',
        'Microphone and speech recognition permission is required to dictate text.',
      );
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    baseRef.current = valueRef.current;
    finalsRef.current = [];
    liveRef.current = '';

    subsRef.current = [
      speechModule.addListener('result', (ev) =>
        onResult(ev as ExpoSpeechRecognitionResultEvent),
      ),
      speechModule.addListener('error', (err) => {
        const e = err as { error?: string; message?: string };
        if (
          e.error === 'no-speech' ||
          e.error === 'aborted' ||
          e.error === 'speech-timeout'
        ) {
          finishSession();
          return;
        }
        finishSession();
        Alert.alert('Voice input', e.message || 'Speech recognition failed.');
      }),
      speechModule.addListener('end', () => {
        finishSession();
      }),
    ];

    recordingRef.current = true;
    setRecording(true);

    try {
      speechModule.start({
        lang: getSpeechRecognitionLocaleTag(),
        interimResults: true,
        continuous: true,
        maxAlternatives: 1,
        iosTaskHint: 'dictation',
        requiresOnDeviceRecognition: false,
      });
    } catch {
      finishSession();
      fingerDownRef.current = false;
      Alert.alert(
        'Voice input',
        'Could not start speech recognition on this device.',
      );
      return;
    }

    if (!fingerDownRef.current) {
      try {
        speechModule.stop();
      } catch {
        finishSession();
      }
    }
  }, [
    editable,
    speechModule,
    removeListeners,
    clearEndFallback,
    onResult,
    finishSession,
  ]);

  const endPress = useCallback(() => {
    fingerDownRef.current = false;
    if (!recordingRef.current) {
      return;
    }
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const mod = getExpoSpeechRecognitionNativeModule();
    if (!mod) {
      finishSession();
      return;
    }
    try {
      mod.stop();
    } catch {
      finishSession();
      return;
    }
    clearEndFallback();
    endFallbackTimerRef.current = setTimeout(() => {
      endFallbackTimerRef.current = null;
      if (recordingRef.current) {
        finishSession();
      }
    }, 2500);
  }, [clearEndFallback, finishSession]);

  useEffect(() => {
    return () => {
      clearEndFallback();
      const mod = getExpoSpeechRecognitionNativeModule();
      if (mod) {
        try {
          mod.abort();
        } catch {
          /* ignore */
        }
      }
      removeListeners();
    };
  }, [clearEndFallback, removeListeners]);

  const voiceReady = speechModule != null;

  const inputStyle = useMemo((): TextStyle[] => {
    const base: TextStyle = {
      flex: 1,
      minWidth: 0,
      width: '100%',
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: 'transparent',
      fontSize: fontSize.xl,
      color: theme.colors.text.secondary,
      paddingVertical: space.mdPlus,
      paddingLeft: space.lg,
      paddingRight: space.sm,
      ...NO_SHADOW,
    };

    if (multiline) {
      return [
        base,
        {
          minHeight: 72,
          paddingTop: space.md,
          textAlignVertical: 'top',
        },
        style as TextStyle,
      ];
    }

    return [
      base,
      {
        height: layout.buttonHeight - 2,
      },
      style as TextStyle,
    ];
  }, [multiline, style, theme.colors.text.secondary]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.shell,
          recording && voiceReady && styles.shellRecording,
          !voiceReady && editable !== false && styles.shellUnavailable,
        ]}
      >
        <View
          style={[
            styles.innerRow,
            multiline ? styles.innerRowMultiline : null,
          ]}
        >
          <View
            style={[
              styles.fieldWrap,
              multiline ? styles.fieldWrapMultiline : null,
            ]}
          >
            <TextInput
              placeholderTextColor={theme.colors.text.faint}
              value={value}
              onChangeText={onChangeText}
              maxLength={maxLength}
              multiline={multiline}
              editable={editable}
              style={inputStyle}
              {...textFieldProps}
            />
          </View>
          <View
            style={[
              styles.micRail,
              multiline ? styles.micRailMultiline : null,
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={voiceAccessibilityLabel}
              accessibilityHint={
                voiceReady
                  ? 'Hold to record speech. Release to stop.'
                  : 'Voice dictation needs a development build with native speech recognition.'
              }
              disabled={editable === false}
              onPressIn={beginPressIn}
              onPressOut={endPress}
              style={({ pressed }) => [
                styles.micButton,
                recording && voiceReady && styles.micButtonRecording,
                editable === false ? styles.micButtonDisabled : null,
                !voiceReady && editable !== false
                  ? styles.micButtonUnavailable
                  : null,
                pressed && editable !== false ? { opacity: 0.85 } : null,
              ]}
            >
              <Ionicons
                name={
                  recording && voiceReady
                    ? 'mic'
                    : voiceReady
                      ? 'mic-outline'
                      : 'mic-off-outline'
                }
                size={22}
                color={
                  recording && voiceReady
                    ? theme.colors.primary.main
                    : theme.colors.text.tertiary
                }
              />
            </Pressable>
          </View>
        </View>
      </View>
      {voiceReady && editable !== false && multiline ? (
        <Text style={styles.hint}>
          Hold the mic to speak, release to stop.
        </Text>
      ) : null}
    </View>
  );
};
