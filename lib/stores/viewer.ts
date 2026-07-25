import { create } from "zustand";
import type { ViewersConfigType, ViewerType } from "@/lib/types";

// 시청자 추첨 진행 상태 store — lib/stores/vote.ts와 동일 패턴.
// persist하지 않으며, /viewer/live는 state가 "ready"면 /viewer로 리다이렉트한다.

export type ViewerProgressState = "ready" | "running" | "completed";

interface ViewerStoreState {
  state: ViewerProgressState;
  config: ViewersConfigType;
  viewers: ViewerType[];
  drawn: ViewerType[];
  timer: Date | null;
}

interface ViewerStoreActions {
  toggleConfig: (type: keyof ViewersConfigType) => void;
  setViewers: (
    viewers: ViewerType[] | ((prev: ViewerType[]) => ViewerType[])
  ) => void;
  setDrawn: (
    drawn: ViewerType[] | ((prev: ViewerType[]) => ViewerType[])
  ) => void;
  start: (timerSeconds: number | null) => void;
  stop: () => void;
  reset: (keepDrawn: boolean) => void;
}

export const useViewerStore = create<ViewerStoreState & ViewerStoreActions>()(
  (set) => ({
    state: "ready",
    config: { subscribe: false, duplicate: false },
    viewers: [],
    drawn: [],
    timer: null,

    toggleConfig: (type) =>
      set((prev) => ({
        config: { ...prev.config, [type]: !prev.config[type] },
      })),
    setViewers: (viewers) =>
      set((prev) => ({
        viewers:
          typeof viewers === "function" ? viewers(prev.viewers) : viewers,
      })),
    setDrawn: (drawn) =>
      set((prev) => ({
        drawn: typeof drawn === "function" ? drawn(prev.drawn) : drawn,
      })),
    start: (timerSeconds) =>
      set(() => {
        let timer: Date | null = null;
        if (timerSeconds !== null) {
          timer = new Date();
          timer.setSeconds(timer.getSeconds() + timerSeconds);
        }
        return { state: "running", timer };
      }),
    stop: () => set(() => ({ state: "completed" })),
    reset: (keepDrawn) =>
      set((prev) => ({
        state: "ready",
        viewers: [],
        drawn: keepDrawn ? prev.drawn : [],
        timer: null,
      })),
  })
);
