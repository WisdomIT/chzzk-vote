"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container, Btns } from "./index.styled";
import { ViewersConfigType, ViewerType } from "@/lib/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import Config from "../../../_components/Viewer/Config";
import Viewers from "../../../_components/Viewer/Viewers";
import Chat from "@/app/_components/Slot/Chat";
import SlotChat, { handleSlotStart } from "@/app/_components/Slot/SlotChat";

export default function Completed({
  config,
  setConfig,
  viewers,
  drawn,
  setDrawn,
  onReset,
}: {
  config: ViewersConfigType;
  setConfig: (type: keyof ViewersConfigType) => void;
  viewers: ViewerType[];
  drawn: ViewerType[];
  setDrawn: Dispatch<SetStateAction<ViewerType[]>>;
  onReset: () => void;
}) {
  const [chat, setChat] = useState<ViewerType | null>(null);
  const [slot, setSlot] = useState(false);
  const [slotList, setSlotList] = useState<ViewerType[]>([]);

  function handleSetDrawn(viewer: ViewerType) {
    setDrawn((prev) => {
      const find = prev.find((item) => item.userIdHash === viewer.userIdHash);
      if (find) return prev;
      return [...prev, viewer];
    });
  }

  return (
    <Container>
      <Btns>
        <MainButton fillType="outlined" onClick={onReset}>
          참여자 다시 모집하기
        </MainButton>
        <MainButton
          onClick={() => {
            handleSlotStart(viewers, drawn, config, setSlot, setSlotList);
          }}
        >
          추첨하기
        </MainButton>
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
            handleSetDrawn(item);
          }}
          onClose={() => {
            setSlot(false);
          }}
        />
      ) : null}
    </Container>
  );
}
