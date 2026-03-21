import { requireOptionalNativeModule } from 'expo';

/**
 * expo-speech-recognition's package entry calls requireNativeModule eagerly and crashes in Expo Go.
 * Load the native binding only when present (development / production builds with the plugin).
 */
export type ExpoSpeechRecognitionResultEvent = {
  isFinal: boolean;
  results: { transcript: string }[];
};

type NativeModuleShape = {
  abort(): void;
  stop(): void;
  start(options: Record<string, unknown>): void;
  requestPermissionsAsync(): Promise<{ granted: boolean }>;
  addListener(
    eventName: string,
    listener: (event: unknown) => void,
  ): { remove(): void };
};

let cached: NativeModuleShape | null | undefined;

export function getExpoSpeechRecognitionNativeModule(): NativeModuleShape | null {
  if (cached !== undefined) {
    return cached;
  }
  cached = requireOptionalNativeModule<NativeModuleShape>('ExpoSpeechRecognition');
  return cached;
}
