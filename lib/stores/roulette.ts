import { create } from "zustand";

// 룰렛 진행 상태 store — lib/stores/vote.ts와 동일 패턴 (completed 없음).
// persist하지 않으며, /roulette/live는 state가 "ready"면 /roulette로 리다이렉트한다.

export interface RouletteType {
  id: number;
  name: string;
  size: number;
}

export type RouletteProgressState = "ready" | "running";

const initialRoulette: RouletteType[] = [
  { id: 0, name: "", size: 1 },
  { id: 1, name: "", size: 1 },
];

interface RouletteStoreState {
  state: RouletteProgressState;
  roulette: RouletteType[];
}

interface RouletteStoreActions {
  setRoulette: (
    roulette: RouletteType[] | ((prev: RouletteType[]) => RouletteType[])
  ) => void;
  start: () => void;
  reset: () => void;
}

export const useRouletteStore = create<
  RouletteStoreState & RouletteStoreActions
>()((set) => ({
  state: "ready",
  roulette: initialRoulette.map((item) => ({ ...item })),

  setRoulette: (roulette) =>
    set((prev) => ({
      roulette:
        typeof roulette === "function" ? roulette(prev.roulette) : roulette,
    })),
  start: () => set(() => ({ state: "running" })),
  reset: () => set(() => ({ state: "ready" })),
}));
