"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container } from "./index.styled";
import { ViewerType } from "@/lib/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import Config from "../_components/Config";
import Viewers from "../_components/Viewers";
import Chat from "@/app/_components/Slot/Chat";
import { Btns } from "./Completed.styled";
import Slot from "@/app/_components/Slot/Slot";

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
  const [slotTarget, setSlotTarget] = useState<ViewerType | null>(null);

  const sample = [
    {
      userIdHash: "0fea99e763c3a771e0beba1a818e316e",
      badges: [],
      nickname: "깰꼼",
      subscribe: false,
    },
    {
      userIdHash: "ea9face4b1cfbcdf07e98d2664e984be",
      badges: [],
      nickname: "하루살이 파괴왕 12361702955045297",
      subscribe: false,
    },
    {
      userIdHash: "666965397d17ceeb36190e7f41b382ff",
      badges: [],
      nickname: "냥젤리복복복",
      subscribe: false,
    },
    {
      userIdHash: "29a057ad4b3a1535a986842e5c47deb6",
      badges: [],
      nickname: "Telliprisk",
      subscribe: false,
    },
    {
      userIdHash: "54ca76c3dee7fb9a6182fea078b39c29",
      badges: [],
      nickname: "밀리아노르",
      subscribe: false,
    },
    {
      userIdHash: "7a87048175b7e62f5f5d179456e21a0c",
      badges: [
        "https://nng-phinf.pstatic.net/glive/subscription/badge/2eee29ce69664154d8bc478825941259/2/24_1710190745292.png",
      ],
      nickname: "plop",
      subscribe: true,
    },
    {
      userIdHash: "1ff99e558a7317b341a43f73a2f8c8be",
      badges: [],
      nickname: "푸른마스",
      subscribe: false,
    },
  ] as ViewerType[];

  const slotList = viewers.filter(
    (item) =>
      (config.subscribe ? item.subscribe : true) &&
      (config.duplicate
        ? !drawn.find((drawnItem) => item.userIdHash === drawnItem.userIdHash)
        : true)
  );

  return (
    <Container>
      <Btns>
        <MainButton fillType="outlined" onClick={onReset}>
          참여자 다시 모집하기
        </MainButton>
        <MainButton
          onClick={() => {
            setSlot((prev) => !prev);
            setSlotTarget(null);
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
        <Slot
          data={slotList}
          duration={3000}
          onEnd={(item, trarget) => {
            setSlotTarget(item);
            setDrawn((prev) => [...prev, item]);
          }}
          initialTarget={slotTarget}
        />
      ) : null}
    </Container>
  );
}
