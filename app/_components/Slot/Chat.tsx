"use client";

import { useEffect, useState } from "react";
import { ViewerType } from "@/lib/types";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import useVoice from "@/lib/useVoice";
import MainButton from "../Main/MainButton";
import {
  Container,
  Viewer,
  ViewerBadge,
  ViewerName,
  ChatBox,
  Balloon,
  ChatBottom,
} from "./Chat.styled";

type ChatType = {
  viewer: ViewerType;
  onClose: () => void;
};

export default function Chat({ viewer, onClose }: ChatType) {
  const { channel, voice } = useGlobalOptionStore();
  const [chat, setChat] = useState<JSX.Element[]>([]);
  const [state, setState] = useState(false);

  function handleOnChat(
    getViewer: ViewerType,
    message: JSX.Element,
    messageString: string
  ) {
    if (viewer.userIdHash !== getViewer.userIdHash) return;
    setChat((prev) => [...prev, message]);
    useVoice(voice, messageString);
  }

  useEffect(() => {
    if (!state) return;

    const client = useChzzkChat({
      channelId: channel.channelId,
      onChat: handleOnChat,
    });

    return () => {
      if (client) client.disconnect();
    };
  }, [state]);

  useEffect(() => {
    //chat 업데이트 시 가장 아래 채팅으로 스크롤
    document.querySelector("#chatBottom")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [chat]);

  useEffect(() => {
    //최초 애니메이션 재생 중에는 채팅 파싱하지 않음
    const timeout = setTimeout(() => {
      setState(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <Viewer>
        {viewer.badges.map((e, i) => (
          <ViewerBadge key={`chat_badge_${i}`} src={e} />
        ))}
        <ViewerName>{viewer.nickname}</ViewerName>
      </Viewer>
      <ChatBox>
        {chat.map((e, i) => (
          <Balloon key={`chat_balloon_${i}`}>{e}</Balloon>
        ))}
        <ChatBottom id="chatBottom" />
      </ChatBox>
      <MainButton fill="primary" fillType="outlined" onClick={onClose}>
        닫기
      </MainButton>
    </Container>
  );
}
