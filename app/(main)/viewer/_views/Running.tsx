"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Btns, Container } from "./index.styled";
import { ViewersConfigType, ViewerType } from "@/lib/types";
import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
import Config from "../../../_components/Viewer/Config";
import Viewers from "../../../_components/Viewer/Viewers";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import Chat from "@/app/_components/Slot/Chat";
import { webhook } from "../../_api/webhook";
import ChzzkError from "@/app/_components/Viewer/ChzzkError";
import SlotChat, { handleSlotStart } from "@/app/_components/Slot/SlotChat";
import Timer from "@/app/_components/Vote/Timer";

export default function Running({
  config,
  setConfig,
  viewers,
  setViewers,
  drawn,
  setDrawn,
  timer,
  onStop,
}: {
  config: ViewersConfigType;
  setConfig: (type: keyof ViewersConfigType) => void;
  viewers: ViewerType[];
  setViewers: Dispatch<SetStateAction<ViewerType[]>>;
  drawn: ViewerType[];
  setDrawn: Dispatch<SetStateAction<ViewerType[]>>;
  timer: Date | null;
  onStop: () => void;
}) {
  const { channel } = useGlobalOptionStore();
  const [chzzkError, setChzzkError] = useState(false);

  // 데이터를 버퍼링하기 위한 ref
  const viewerSet = useRef(new Set<string>());
  const viewerBuffer = useRef<ViewerType[]>([]);
  const bufferTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  function handleOnChat(viewer: ViewerType) {
    if (!viewerSet.current || !viewerBuffer.current) return;

    if (!viewerSet.current.has(viewer.userIdHash)) {
      viewerSet.current.add(viewer.userIdHash);
      viewerBuffer.current.push(viewer);

      // 버퍼링된 데이터를 일정 주기로 한번에 업데이트
      if (!bufferTimeout.current) {
        setViewers([...viewerBuffer.current]);

        bufferTimeout.current = setTimeout(() => {
          bufferTimeout.current = undefined;
        }, 500); // 500ms마다 업데이트
      }
    }
  }

  useEffect(() => {
    void webhook("😁 시청자 추첨", channel);

    if (channel.channelId === "") {
      alert("채널ID가 정상적으로 인식되지 않습니다. 다시 시도해주세요.");
      location.reload();
      return;
    }

    const client = useChzzkChat({
      channelId: channel.channelId,
      onChat: (viewer) => {
        handleOnChat(viewer);
      },
      onError: (error) => {
        setChzzkError(true);
        setInterval(onStop, 10000);
      },
    });

    return () => {
      if (client) client.disconnect();
    };
  }, []);

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
        <MainButton
          fillType="outlined"
          onClick={() => {
            handleSlotStart(viewers, drawn, config, setSlot, setSlotList);
          }}
        >
          추첨하기
        </MainButton>
        <MainButton onClick={onStop}>참여자 모집 종료</MainButton>
      </Btns>
      <Config config={config} setConfig={setConfig} />
      {chzzkError ? <ChzzkError /> : null}
      <Viewers
        viewers={viewers}
        drawn={drawn}
        config={config}
        onSelect={(viewer) => {
          setChat(viewer);
        }}
        message="채팅창에 아무 말이나 입력하시면 참여됩니다!"
        animation
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
      {timer ? <Timer end={timer} onStop={onStop} /> : null}
    </Container>
  );
}
