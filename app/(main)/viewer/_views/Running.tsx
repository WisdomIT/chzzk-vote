"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container } from "./index.styled";
import { ViewerType } from "@/lib/types";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import Config from "../_components/Config";
import Viewers from "../_components/Viewers";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import Chat from "@/app/_components/Slot/Chat";

export default function Running({
  config,
  setConfig,
  viewers,
  setViewers,
  onStop,
}: {
  config: {
    subscribe: boolean;
    duplicate: boolean;
  };
  setConfig: (type: "subscribe" | "duplicate") => void;
  viewers: ViewerType[];
  setViewers: Dispatch<SetStateAction<ViewerType[]>>;
  onStop: () => void;
}) {
  const { channel } = useGlobalOptionStore();

  function handleOnChat(viewer: ViewerType) {
    const find = viewers.find((item) => item.userIdHash === viewer.userIdHash);
    if (find) return;

    setViewers((prev) => [...prev, viewer]);
  }

  useEffect(() => {
    if (channel.channelId === "") {
      alert("채널ID가 정상적으로 인식되지 않습니다. 다시 시도해주세요.");
      location.reload();
      return;
    }

    useChzzkChat({
      channelId: channel.channelId,
      onChat: (viewer) => {
        handleOnChat(viewer);
      },
    });
  }, []);

  const [chat, setChat] = useState<ViewerType | null>(null);

  return (
    <Container>
      <MainButton onClick={onStop}>참여자 모집 종료</MainButton>
      <Config config={config} setConfig={setConfig} />
      <Viewers
        viewers={viewers}
        drawn={[]}
        config={config}
        onSelect={(viewer) => {
          setChat(viewer);
        }}
        active
      />
      {chat !== null ? (
        <Chat
          viewer={chat}
          onClose={() => {
            setChat(null);
          }}
        />
      ) : null}
    </Container>
  );
}
