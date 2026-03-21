import { create } from 'zustand';

import type { ActiveRowId, HomeSwipeStore } from '@/types/HomeSwipeStore';

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
