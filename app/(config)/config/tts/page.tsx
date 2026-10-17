"use client";

import { faVolume } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";
import BreadcrumbsConfig from "../_components/BreadcrumbsConfig";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useState } from "react";
import Voice from "./_views/Voice";

export default function Page() {
  const { voice, setVoice } = useGlobalOptionStore();
  const [newVoice, setNewVoice] = useState(voice);

  function handleSubmit() {
    setVoice(newVoice);
  }

  return (
    <>
      <BreadcrumbsConfig icon={faVolume} text="TTS 설정" />
      <Voice voice={newVoice} setVoice={setNewVoice} onSubmit={handleSubmit} />
    </>
  );
}
