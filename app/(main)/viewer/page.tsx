"use client";

import { useState } from "react";
import type { ViewerType } from "@/lib/types";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faUsers } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import Running from "./_views/Running";

export default function Page() {
  const [state, setState] = useState<"ready" | "running" | "completed">(
    "ready"
  );
  const [config, setConfig] = useState({
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
    console.log(type);
    setConfig((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <>
      <Breadcrumbs icon={faUsers} text="시청자 추첨" href="/viewer" />
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
    </>
  );
}
