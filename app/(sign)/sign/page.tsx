"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalOptionStore } from "@/lib/zustand";
import { ChannelType } from "@/lib/types";
import Channel from "./_views/Channel";
import ChannelFind from "./_views/ChannelFind";
import Voice from "./_views/Voice";

export default function Page() {
  const {
    hydrated,
    channel: getChannel,
    setChannel: setGlobalChannel,
    setVoice: setGlobalVoice,
  } = useGlobalOptionStore();
  const router = useRouter();

  useEffect(() => {
    // hydration이 완료되고, channelId가 없을 때만 리다이렉트
    if (hydrated && getChannel.channelId) {
      console.log("Redirecting to index"); // 디버깅용
      router.replace("/");
    }
  }, [hydrated, getChannel.channelId, router]);

  const [channel, setChannel] = useState<ChannelType>({
    channelId: "",
    channelImageUrl: "",
    channelName: "",
    verifiedMark: false,
    followerCount: 0,
  });
  const [voice, setVoice] = useState("");
  const [state, setState] = useState<"channel" | "voice">("channel");

  function handleReset() {
    setChannel({
      channelId: "",
      channelImageUrl: "",
      channelName: "",
      verifiedMark: false,
      followerCount: 0,
    });
  }

  function handleSubmit() {
    if (voice === "") {
      alert("TTS를 읽을 음성을 선택해주세요");
      return;
    }
    setGlobalChannel(channel);
    setGlobalVoice(voice);
  }

  if (state === "channel" && channel.channelId === "") {
    return <Channel setChannel={setChannel} />;
  }
  if (state === "channel") {
    return (
      <ChannelFind
        channel={channel}
        onReset={handleReset}
        onNext={() => {
          setState("voice");
        }}
      />
    );
  }
  if (state === "voice") {
    return (
      <Voice
        voice={voice}
        setVoice={setVoice}
        onBack={() => {
          setState("channel");
        }}
        onSubmit={handleSubmit}
      />
    );
  }
  return null;
}
