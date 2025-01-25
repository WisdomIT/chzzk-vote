"use client";

import { useState } from "react";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faCheckToSlot } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import Running from "./_views/Running";
import Completed from "./_views/Completed";
import { useGlobalOptionStore } from "@/lib/zustand";

export default function Page() {
  const [state, setState] = useState<"ready" | "running" | "completed">(
    "ready"
  );
  const [vote, setVote] = useState<VoteType[]>([
    { id: 0, name: "", viewers: [] },
    { id: 1, name: "", viewers: [] },
  ]);
  const [drawn, setDrawn] = useState<ViewerType[]>([]);
  const [time, setTime] = useState<TimeType>({
    start: null,
    end: null,
  });
  const [timer, setTimer] = useState<Date | null>(null);
  const { zoom } = useGlobalOptionStore();

  function handleSetDrawn(viewer: ViewerType) {
    setDrawn((prev) => {
      const find = prev.find((item) => item.userIdHash === viewer.userIdHash);
      if (find) return prev;
      return [...prev, viewer];
    });
  }

  function handleReset() {
    const newVote = [...vote].map((item) => ({ ...item, viewers: [] }));

    setState("ready");
    setVote(newVote);
    setDrawn([]);
    setTime((prev) => ({
      start: null,
      end: null,
    }));
  }

  return (
    <>
      <Breadcrumbs icon={faCheckToSlot} text="숫자 투표" />
      {state === "ready" ? (
        <Ready
          zoom={zoom}
          vote={vote}
          setVote={setVote}
          onStart={(timer) => {
            setState("running");
            setTime({
              start: new Date(),
              end: null,
            });
            if (timer !== null) {
              const endTime = new Date();
              endTime.setSeconds(endTime.getSeconds() + timer);
              setTimer(endTime);
            }
          }}
        />
      ) : null}
      {state === "running" ? (
        <Running
          zoom={zoom}
          vote={vote}
          setVote={setVote}
          drawn={drawn}
          setDrawn={handleSetDrawn}
          time={time}
          timer={timer}
          onStop={() => {
            setState("completed");
            setTime((prev) => ({
              start: prev.start,
              end: new Date(),
            }));
          }}
        />
      ) : null}
      {state === "completed" ? (
        <Completed
          zoom={zoom}
          vote={vote}
          drawn={drawn}
          setDrawn={handleSetDrawn}
          time={time}
          onReset={handleReset}
        />
      ) : null}
    </>
  );
}
