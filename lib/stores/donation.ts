import { create } from "zustand";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";

// 도네 투표 진행 상태 store — lib/stores/vote.ts와 동일 패턴 (+ doneConfig).
// persist하지 않으며, /donation/live는 state가 "ready"면 /donation으로 리다이렉트한다.

export interface DoneConfigType {
  price: number;
  plural: boolean;
}

export type DonationProgressState = "ready" | "running" | "completed";

const initialVote: VoteType[] = [
  { id: 0, name: "", viewers: [] },
  { id: 1, name: "", viewers: [] },
];

interface DonationStoreState {
  state: DonationProgressState;
  doneConfig: DoneConfigType;
  vote: VoteType[];
  drawn: ViewerType[];
  time: TimeType;
  timer: Date | null;
}

interface DonationStoreActions {
  setVote: (vote: VoteType[] | ((prev: VoteType[]) => VoteType[])) => void;
  setDoneConfig: (
    config: DoneConfigType | ((prev: DoneConfigType) => DoneConfigType)
  ) => void;
  addDrawn: (viewer: ViewerType) => void;
  start: (timerSeconds: number | null) => void;
  stop: () => void;
  reset: () => void;
}

export const useDonationStore = create<
  DonationStoreState & DonationStoreActions
>()((set) => ({
  state: "ready",
  doneConfig: { price: 1000, plural: false },
  vote: initialVote.map((item) => ({ ...item, viewers: [] })),
  drawn: [],
  time: { start: null, end: null },
  timer: null,

  setVote: (vote) =>
    set((prev) => ({
      vote: typeof vote === "function" ? vote(prev.vote) : vote,
    })),
  setDoneConfig: (config) =>
    set((prev) => ({
      doneConfig:
        typeof config === "function" ? config(prev.doneConfig) : config,
    })),
  addDrawn: (viewer) =>
    set((prev) => {
      const find = prev.drawn.find(
        (item) => item.userIdHash === viewer.userIdHash
      );
      if (find) return prev;
      return { drawn: [...prev.drawn, viewer] };
    }),
  start: (timerSeconds) =>
    set(() => {
      let timer: Date | null = null;
      if (timerSeconds !== null) {
        timer = new Date();
        timer.setSeconds(timer.getSeconds() + timerSeconds);
      }
      return {
        state: "running",
        time: { start: new Date(), end: null },
        timer,
      };
    }),
  stop: () =>
    set((prev) => ({
      state: "completed",
      time: { start: prev.time.start, end: new Date() },
    })),
  reset: () =>
    set((prev) => ({
      state: "ready",
      vote: prev.vote.map((item) => ({ ...item, viewers: [] })),
      drawn: [],
      time: { start: null, end: null },
      timer: null,
    })),
}));
