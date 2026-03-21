import { useHomeSwipeStore } from '@store/useHomeSwipeStore';
import { useShallow } from 'zustand/react/shallow';

export function useHomeSwipe() {
  return useHomeSwipeStore(
    useShallow((s) => ({
      activeRowId: s.activeRowId,
      setActiveRowId: s.setActiveRowId,
      dismissOpenSwipe: s.dismissOpenSwipe,
    })),
  );
}
