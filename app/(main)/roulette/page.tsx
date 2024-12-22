"use client";

import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faSlotMachine } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import { Suspense, useState } from "react";
import Ready from "./_views/Ready";
import Running from "./_views/Running";

export interface RouletteType {
  id: number;
  name: string;
  size: number;
}

export default function Page() {
  const [state, setState] = useState<"ready" | "running">("ready");
  const [roulette, setRoulette] = useState<RouletteType[]>([
    { id: 0, name: "", size: 1 },
    { id: 1, name: "", size: 1 },
  ]);

  return (
    <>
      <Breadcrumbs icon={faSlotMachine} text="룰렛" />
      {state === "ready" ? (
        <Suspense>
          <Ready
            roulette={roulette}
            setRoulette={setRoulette}
            onStart={() => {
              setState("running");
            }}
          />
        </Suspense>
      ) : null}
      {state === "running" ? (
        <Running
          roulette={roulette}
          onReset={() => {
            setState("ready");
          }}
        />
      ) : null}
    </>
  );
}
