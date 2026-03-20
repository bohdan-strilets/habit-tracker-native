import type { SetStateAction } from 'react';

export type ActiveRowId = string | null;

export type HomeSwipeStore = {
  activeRowId: ActiveRowId;
  setActiveRowId: (value: SetStateAction<ActiveRowId>) => void;
  dismissOpenSwipe: () => void;
};
