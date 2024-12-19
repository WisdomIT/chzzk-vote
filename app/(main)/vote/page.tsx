"use client";

import { useState } from "react";
import type { ViewerType, VoteType } from "@/lib/types";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faCheckToSlot } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";

export default function Page() {
  const [state, setState] = useState<"ready" | "running" | "completed">(
    "ready"
  );
  const [vote, setVote] = useState<VoteType[]>([
    { id: 0, name: "", viewers: [] },
    { id: 1, name: "", viewers: [] },
  ]);
  const [config, setConfig] = useState({
    sortViewers: false,
  });
  const [viewItem, setViewItem] = useState<number | null>(null);
  const [drawn, setDrawn] = useState<ViewerType[]>([]);

  return (
    <>
      <Breadcrumbs icon={faCheckToSlot} text="숫자 투표" href="/viewer" />
      {state === "ready" ? (
        <Ready
          vote={vote}
          setVote={setVote}
          onStart={() => {
            setState("running");
          }}
        />
      ) : null}
    </>
  );
}
