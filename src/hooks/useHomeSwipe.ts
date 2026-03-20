import { useShallow } from 'zustand/react/shallow';
import { useHomeSwipeStore } from '../store/useHomeSwipeStore';

export function useHomeSwipe() {
  return useHomeSwipeStore(
    useShallow((s) => ({
      activeRowId: s.activeRowId,
      setActiveRowId: s.setActiveRowId,
      dismissOpenSwipe: s.dismissOpenSwipe,
    })),
  );
}
