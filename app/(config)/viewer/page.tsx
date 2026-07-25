"use client";

import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faUsers } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import { useViewerStore } from "@/lib/stores/viewer";

export default function Page() {
  const router = useRouter();
  const { config, toggleConfig, start } = useViewerStore();

  return (
    <>
      <Breadcrumbs icon={faUsers} text="시청자 추첨" />
      <Ready
        config={config}
        setConfig={toggleConfig}
        onStart={(timer) => {
          start(timer);
          router.push("/viewer/live");
        }}
      />
    </>
  );
}
