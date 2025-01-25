"use client";

import { ViewersConfigType, ViewerType } from "@/lib/types";
import {
  type Dispatch,
  memo,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { useGlobalOptionStore } from "@/lib/zustand";
import Slot from "./Slot";
import { Container, ChatBox, Balloon, ChatBottom } from "./Chat.styled";
import useVoice from "@/lib/useVoice";
import useChzzkChat from "@/lib/useChzzkChat";
import MainButton from "../Main/MainButton";

interface SlotChatProps {
  list: ViewerType[];
  duration: number;
  onEnd?: (viewer: ViewerType, index: number) => void;
  onClose: () => void;
}

export function handleSlotStart(
  viewers: ViewerType[],
  drawn: ViewerType[],
  config: ViewersConfigType,
  setSlot: Dispatch<SetStateAction<boolean>>,
  setSlotList: Dispatch<SetStateAction<ViewerType[]>>
) {
  const slotList = viewers.filter(
    (item) =>
      (config.subscribe ? item.subscribe : true) &&
      (config.duplicate
        ? !drawn.find((drawnItem) => item.userIdHash === drawnItem.userIdHash)
        : true)
  );

  if (slotList.length === 0) {
    alert("추첨 가능한 인원이 없습니다");
    return;
  }

  setSlotList(slotList);
  setSlot(true);
}

const SlotChat = memo(({ list, duration, onEnd, onClose }: SlotChatProps) => {
  const { channel, voice } = useGlobalOptionStore();
  const [viewer, setViewer] = useState<null | ViewerType>(null);
  const [chat, setChat] = useState<JSX.Element[]>([]);

  const handleSlotEnd = (viewer: ViewerType, index: number) => {
    setViewer(viewer);
    if (onEnd) {
      onEnd(viewer, index);
    }
  };

  function handleOnChat(
    getViewer: ViewerType,
    message: JSX.Element,
    messageString: string
  ) {
    if (!viewer) return;

    if (viewer.userIdHash !== getViewer.userIdHash) return;
    setChat((prev) => [...prev, message]);
    useVoice(voice, messageString);
  }

  useEffect(() => {
    if (!viewer) return;

    const client = useChzzkChat({
      channelId: channel.channelId,
      onChat: handleOnChat,
    });

    return () => {
      if (client) client.disconnect();
    };
  }, [viewer]);

  useEffect(() => {
    //chat 업데이트 시 가장 아래 채팅으로 스크롤
    document.querySelector("#chatBottom")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [chat]);

  return (
    <Container>
      <Slot
        list={list}
        duration={duration}
        onEnd={handleSlotEnd}
        initialTarget={viewer}
      />
      {viewer ? (
        <>
          <ChatBox>
            {chat.map((e, i) => (
              <Balloon key={`chat_balloon_${i}`}>{e}</Balloon>
            ))}
            <ChatBottom id="chatBottom" />
          </ChatBox>
          <MainButton fill="primary" fillType="outlined" onClick={onClose}>
            닫기
          </MainButton>
        </>
      ) : null}
    </Container>
  );
});

SlotChat.displayName = "SlotChat";

export default SlotChat;
