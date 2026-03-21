import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const run = (action: () => Promise<void>) => {
  if (Platform.OS === 'web') return;
  void action().catch(() => {});
};

/** Subtle tick while user is holding for reorder. */
export const hapticReorderHoldTick = () => {
  run(() => Haptics.selectionAsync());
};

/**
 * Row just detached and is lifting — aligned with DraggableFlatList activation.
 * iOS: short rigid “pop”; Android: drag-start semantic haptic.
 */
export const hapticReorderLift = () => {
  if (Platform.OS === 'web') return;
  if (Platform.OS === 'android') {
    void Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Drag_Start);
    return;
  }
  run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid));
};

/** Light tap when the row is dropped after reorder. */
export const hapticReorderRelease = () => {
  run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
};

/** Swipe left: row snapped open to show Done. */
export const hapticSwipeSnapDone = () => {
  if (Platform.OS === 'web') return;
  if (Platform.OS === 'android') {
    void Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick);
    return;
  }
  run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
};

/** Swipe right: row snapped open to show Edit / Delete. */
export const hapticSwipeSnapActions = () => {
  if (Platform.OS === 'web') return;
  if (Platform.OS === 'android') {
    void Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick);
    return;
  }
  run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft));
};
