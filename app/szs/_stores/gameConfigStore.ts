import { create } from "zustand";

type GameConfigState = {
  id?: number;
  touchWidth: number;
  successCount?: number;
  setGameInfo: (info: {
    id?: number;
    successCount?: number;
    touchWidth?: number;
  }) => void;
  reset: () => void;
};

const DEFAULT_TOUCH_WIDTH = 158;

export const useGameConfigStore = create<GameConfigState>((set) => ({
  id: undefined,
  successCount: undefined,
  touchWidth: DEFAULT_TOUCH_WIDTH,
  setGameInfo: (info) => set((state) => ({ ...state, ...info })),
  reset: () =>
    set({
      id: undefined,
      successCount: undefined,
      touchWidth: DEFAULT_TOUCH_WIDTH,
    }),
}));
