"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faUsers } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Running from "./_views/Running";
import Completed from "./_views/Completed";
import { useViewerStore } from "@/lib/stores/viewer";

export default function Page() {
  const router = useRouter();
  const {
    state,
    config,
    toggleConfig,
    viewers,
    setViewers,
    drawn,
    setDrawn,
    timer,
    stop,
    reset,
  } = useViewerStore();

  // 진행 데이터 없이 직접 진입(새로고침 포함)하면 설정 화면으로 돌려보낸다
  useEffect(() => {
    if (state === "ready") {
      router.replace("/viewer");
    }
  }, [state, router]);

  if (state === "ready") return null;

  function handleReset() {
    const keepDrawn = confirm(
      "추첨 완료된 시청자 목록을 유지하고 다시 추첨하시겠습니까?"
    );
    reset(keepDrawn);
    router.replace("/viewer");
  }

  return (
    <>
      <Breadcrumbs icon={faUsers} text="시청자 추첨" />
      {state === "running" ? (
        <Running
          config={config}
          setConfig={toggleConfig}
          viewers={viewers}
          setViewers={setViewers}
          drawn={drawn}
          setDrawn={setDrawn}
          timer={timer}
          onStop={stop}
        />
      ) : null}
      {state === "completed" ? (
        <Completed
          config={config}
          setConfig={toggleConfig}
          viewers={viewers}
          drawn={drawn}
          setDrawn={setDrawn}
          onReset={handleReset}
        />
      ) : null}
    </>
  );
}
