"use client";

import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faCheeseSwiss } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import { useDonationStore } from "@/lib/stores/donation";

export default function Page() {
  const router = useRouter();
  const { vote, setVote, doneConfig, setDoneConfig, start } =
    useDonationStore();

  return (
    <>
      <Breadcrumbs icon={faCheeseSwiss} text="도네 투표" />
      <Ready
        zoom={100}
        vote={vote}
        setVote={setVote}
        doneConfig={doneConfig}
        setDoneConfig={setDoneConfig}
        onStart={(timer) => {
          start(timer);
          router.push("/donation/live");
        }}
      />
    </>
  );
}
