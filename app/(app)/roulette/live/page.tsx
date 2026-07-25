"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faSlotMachine } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Running from "./_views/Running";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useRouletteStore } from "@/lib/stores/roulette";

export default function Page() {
  const router = useRouter();
  const { zoom } = useGlobalOptionStore();
  const { state, roulette, reset } = useRouletteStore();

  // 진행 데이터 없이 직접 진입(새로고침 포함)하면 설정 화면으로 돌려보낸다
  useEffect(() => {
    if (state === "ready") {
      router.replace("/roulette");
    }
  }, [state, router]);

  if (state === "ready") return null;

  return (
    <>
      <Breadcrumbs icon={faSlotMachine} text="룰렛" />
      <Running
        zoom={zoom}
        roulette={roulette}
        onReset={() => {
          reset();
          router.replace("/roulette");
        }}
      />
    </>
  );
}
