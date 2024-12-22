"use client";

import { useState } from "react";
import type { ViewersConfigType, ViewerType } from "@/lib/types";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faUsers } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import Running from "./_views/Running";
import Completed from "./_views/Completed";

export default function Page() {
  const [state, setState] = useState<"ready" | "running" | "completed">(
    "ready"
  );
  const [config, setConfig] = useState<ViewersConfigType>({
    subscribe: false,
    duplicate: false,
  });
  const [viewers, setViewers] = useState<ViewerType[]>([]);
  const [drawn, setDrawn] = useState<ViewerType[]>([]);

  function handleReset() {
    setState("ready");
    setViewers([]);
    setDrawn([]);
  }

  function handleConfig(type: keyof typeof config) {
    setConfig((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <>
      <Breadcrumbs icon={faUsers} text="시청자 추첨" />
      {state === "ready" ? (
        <Ready
          config={config}
          setConfig={handleConfig}
          onStart={() => {
            setState("running");
          }}
        />
      ) : null}
      {state === "running" ? (
        <Running
          config={config}
          setConfig={handleConfig}
          viewers={viewers}
          setViewers={setViewers}
          onStop={() => {
            setState("completed");
          }}
        />
      ) : null}
      {state === "completed" ? (
        <Completed
          config={config}
          setConfig={handleConfig}
          viewers={viewers}
          drawn={drawn}
          setDrawn={setDrawn}
          onReset={handleReset}
        />
      ) : null}
    </>
  );
}
