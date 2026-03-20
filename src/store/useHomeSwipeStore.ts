import { create } from 'zustand';
import type { SetStateAction } from 'react';

type ActiveRowId = string | null;

type HomeSwipeStore = {
  activeRowId: ActiveRowId;
  setActiveRowId: (value: SetStateAction<ActiveRowId>) => void;
  dismissOpenSwipe: () => void;
};

export const useHomeSwipeStore = create<HomeSwipeStore>((set) => ({
  activeRowId: null,
  setActiveRowId: (value) =>
    set((state) => ({
      activeRowId:
        typeof value === 'function'
          ? (value as (prev: ActiveRowId) => ActiveRowId)(state.activeRowId)
          : value,
    })),
  dismissOpenSwipe: () => set({ activeRowId: null }),
}));
