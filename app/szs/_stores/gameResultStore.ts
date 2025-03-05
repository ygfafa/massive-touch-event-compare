import { create } from "zustand";

type GameResultState = {
  touchCount?: number;
  setTouchCount: (count: number) => void;
  reset: () => void;
};

export const useGameResultStore = create<GameResultState>((set) => ({
  touchCount: undefined,
  setTouchCount: (count) => set({ touchCount: count }),
  reset: () => set({ touchCount: undefined }),
}));
