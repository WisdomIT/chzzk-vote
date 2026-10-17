"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faCheckToSlot } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Running from "./_views/Running";
import Completed from "./_views/Completed";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useVoteStore } from "@/lib/stores/vote";

export default function Page() {
  const router = useRouter();
  const { zoom } = useGlobalOptionStore();
  const { state, vote, setVote, drawn, addDrawn, time, timer, stop, reset } =
    useVoteStore();

  // 진행 데이터 없이 직접 진입(새로고침 포함)하면 설정 화면으로 돌려보낸다
  useEffect(() => {
    if (state === "ready") {
      router.replace("/vote");
    }
  }, [state, router]);

  if (state === "ready") return null;

  return (
    <>
      <Breadcrumbs icon={faCheckToSlot} text="숫자 투표" />
      {state === "running" ? (
        <Running
          zoom={zoom}
          vote={vote}
          setVote={setVote}
          drawn={drawn}
          setDrawn={addDrawn}
          time={time}
          timer={timer}
          onStop={stop}
        />
      ) : null}
      {state === "completed" ? (
        <Completed
          zoom={zoom}
          vote={vote}
          drawn={drawn}
          setDrawn={addDrawn}
          time={time}
          onReset={() => {
            reset();
            router.replace("/vote");
          }}
        />
      ) : null}
    </>
  );
}
