import { create } from 'zustand'

import { PrizeType } from '~/app/(rewards)/rewards/taptap/_constants'

type GameResultState = {
  touchCount?: number
  prizeType?: PrizeType
  setTouchCount: (count: number) => void
  setPrizeType: (type: PrizeType) => void
  reset: () => void
}

export const useGameResultStore = create<GameResultState>((set) => ({
  touchCount: undefined,
  prizeType: undefined,
  setTouchCount: (count) => set({ touchCount: count }),
  setPrizeType: (type) => set({ prizeType: type }),
  reset: () => set({ touchCount: undefined, prizeType: undefined }),
}))
