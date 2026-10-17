import { create } from "zustand";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";

// 숫자 투표 진행 상태 store.
// 설정(/vote, 웹 모드)과 진행(/vote/live, 앱 모드) 라우트가 상태를 공유한다.
// 의도적으로 persist하지 않는다 — 새로고침 시 진행 데이터가 사라지므로
// /vote/live는 state가 "ready"면 /vote로 리다이렉트한다.

export type VoteProgressState = "ready" | "running" | "completed";

const initialVote: VoteType[] = [
  { id: 0, name: "", viewers: [] },
  { id: 1, name: "", viewers: [] },
];

interface VoteStoreState {
  state: VoteProgressState;
  vote: VoteType[];
  drawn: ViewerType[];
  time: TimeType;
  timer: Date | null;
}

interface VoteStoreActions {
  setVote: (vote: VoteType[] | ((prev: VoteType[]) => VoteType[])) => void;
  addDrawn: (viewer: ViewerType) => void;
  start: (timerSeconds: number | null) => void;
  stop: () => void;
  reset: () => void;
}

export const useVoteStore = create<VoteStoreState & VoteStoreActions>()(
  (set) => ({
    state: "ready",
    vote: initialVote.map((item) => ({ ...item, viewers: [] })),
    drawn: [],
    time: { start: null, end: null },
    timer: null,

    setVote: (vote) =>
      set((prev) => ({
        vote: typeof vote === "function" ? vote(prev.vote) : vote,
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
      set((prev) => {
        let timer: Date | null = null;
        if (timerSeconds !== null) {
          timer = new Date();
          timer.setSeconds(timer.getSeconds() + timerSeconds);
        }
        // 진행 중 /vote로 돌아왔다가 다시 시작하는 경우를 대비해
        // 이전 투표자·추첨 기록은 항상 비우고 시작한다 (항목 이름은 유지).
        return {
          state: "running",
          vote: prev.vote.map((item) => ({ ...item, viewers: [] })),
          drawn: [],
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
  })
);
