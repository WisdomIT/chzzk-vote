"use client";

import { useRouter } from "next/navigation";
import Breadcrumbs from "@/app/_components/Main/Breadcrumbs";
import { faCheckToSlot } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import Ready from "./_views/Ready";
import { useVoteStore } from "@/lib/stores/vote";

export default function Page() {
  const router = useRouter();
  const { vote, setVote, start } = useVoteStore();

  return (
    <>
      <Breadcrumbs icon={faCheckToSlot} text="숫자 투표" />
      <Ready
        zoom={100}
        vote={vote}
        setVote={setVote}
        onStart={(timer) => {
          start(timer);
          router.push("/vote/live");
        }}
      />
    </>
  );
}
