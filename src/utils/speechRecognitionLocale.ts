/**
 * BCP-47 tag for expo-speech-recognition, derived from the runtime locale when possible.
 */
export function getSpeechRecognitionLocaleTag(): string {
  try {
    const raw = Intl.DateTimeFormat().resolvedOptions().locale;
    if (raw && typeof raw === 'string') {
      return raw.replace(/_/g, '-');
    }
  } catch {
    /* ignore */
  }
  return 'en-US';
}
