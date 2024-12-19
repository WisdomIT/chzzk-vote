"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container } from "./index.styled";
import { ViewerType } from "@/lib/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import Config from "../_components/Config";
import Viewers from "../_components/Viewers";
import Chat from "@/app/_components/Slot/Chat";
import { Btns } from "./Completed.styled";
import SlotChat from "@/app/_components/Slot/SlotChat";

export default function Completed({
  config,
  setConfig,
  viewers,
  drawn,
  setDrawn,
  onReset,
}: {
  config: {
    subscribe: boolean;
    duplicate: boolean;
  };
  setConfig: (type: "subscribe" | "duplicate") => void;
  viewers: ViewerType[];
  drawn: ViewerType[];
  setDrawn: Dispatch<SetStateAction<ViewerType[]>>;
  onReset: () => void;
}) {
  const [chat, setChat] = useState<ViewerType | null>(null);
  const [slot, setSlot] = useState(false);
  const [slotList, setSlotList] = useState<ViewerType[]>([]);

  function handleSlotStart() {
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
    setSlot((prev) => !prev);
  }

  return (
    <Container>
      <Btns>
        <MainButton fillType="outlined" onClick={onReset}>
          참여자 다시 모집하기
        </MainButton>
        <MainButton onClick={handleSlotStart}>추첨하기</MainButton>
      </Btns>
      <Config config={config} setConfig={setConfig} />
      <Viewers
        viewers={viewers}
        drawn={drawn}
        config={config}
        onSelect={(viewer) => {
          setChat(viewer);
        }}
      />
      {chat !== null ? (
        <Chat
          viewer={chat}
          onClose={() => {
            setChat(null);
          }}
        />
      ) : null}
      {slot ? (
        <SlotChat
          list={slotList}
          duration={3000}
          onEnd={(item, target) => {
            setDrawn((prev) => [...prev, item]);
          }}
          onClose={() => {
            setSlot(false);
          }}
        />
      ) : null}
    </Container>
  );
}
