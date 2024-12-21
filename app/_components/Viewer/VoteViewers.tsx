import { ViewersConfigType, ViewerType } from "@/lib/types";
import {
  Container,
  ContainerCenter,
  Top,
  TopText,
  TopIndex,
  TopName,
  TopButtons,
} from "./VoteViewers.styled";
import Viewers from "./Viewers";
import { useState } from "react";
import Chat from "../Slot/Chat";
import Config from "./Config";
import MainButton from "../Main/MainButton";
import SlotChat, { handleSlotStart } from "../Slot/SlotChat";

export default function VoteViewers({
  index,
  name,
  total,
  viewers,
  drawn,
  setDrawn,
  onClose,
}: {
  index: number;
  name: string;
  total: number;
  viewers: ViewerType[];
  drawn: ViewerType[];
  setDrawn: (viewer: ViewerType) => void;
  onClose: () => void;
}) {
  const [config, setConfig] = useState<ViewersConfigType>({
    subscribe: false,
    duplicate: false,
  });
  const [chat, setChat] = useState<ViewerType | null>(null);
  const [slot, setSlot] = useState(false);
  const [slotList, setSlotList] = useState<ViewerType[]>([]);

  const percentage =
    total !== 0 ? ((viewers.length / total) * 100).toFixed(2) : "0";

  function handleConfig(type: keyof typeof config) {
    setConfig((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <>
      <Container>
        <ContainerCenter>
          <Top>
            <TopText>
              <TopIndex>!투표{index + 1}</TopIndex>
              <TopName>{name}</TopName>
            </TopText>
            <TopButtons>
              <MainButton fillType="outlined" onClick={onClose}>
                목록으로
              </MainButton>
              <MainButton
                onClick={() => {
                  handleSlotStart(viewers, drawn, config, setSlot, setSlotList);
                }}
              >
                추첨하기
              </MainButton>
            </TopButtons>
          </Top>
          <Config config={config} setConfig={handleConfig} />
          <Viewers
            viewers={viewers}
            drawn={drawn}
            config={config}
            message={`총 ${total}표 / ${viewers.length}표 (${percentage}%) `}
            onSelect={(viewer) => {
              setChat(viewer);
            }}
            animation
          />
        </ContainerCenter>
      </Container>
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
            setDrawn(item);
          }}
          onClose={() => {
            setSlot(false);
          }}
        />
      ) : null}
    </>
  );
}
