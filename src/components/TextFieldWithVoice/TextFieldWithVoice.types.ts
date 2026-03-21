import type { TextFieldProps } from '@components/TextField';

export type TextFieldWithVoiceProps = Omit<TextFieldProps, 'value' | 'onChangeText'> & {
  value: string;
  onChangeText: (text: string) => void;
  voiceAccessibilityLabel?: string;
};
