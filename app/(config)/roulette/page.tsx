"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faSlotMachine } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import { useRouletteStore } from "@/lib/stores/roulette";

export default function Page() {
  const router = useRouter();
  const { roulette, setRoulette, start } = useRouletteStore();

  return (
    <>
      <Breadcrumbs icon={faSlotMachine} text="룰렛" />
      <Suspense>
        <Ready
          zoom={100}
          roulette={roulette}
          setRoulette={setRoulette}
          onStart={() => {
            start();
            router.push("/roulette/live");
          }}
        />
      </Suspense>
    </>
  );
}
