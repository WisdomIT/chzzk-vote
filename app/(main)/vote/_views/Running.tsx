"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import TimeElapsed from "@/app/_components/Vote/TimeElapsed";
import ListItem from "@/app/_components/Vote/ListItem";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import { extractVoteNumber } from "@/lib/vote";
import Description, {
  DescriptionType,
} from "@/app/_components/Vote/Description";
import { Container, Top, Total, Bottom, List } from "./index.styled";

const description: DescriptionType[] = [
  {
    body: [
      { bold: false, text: "채팅 시 " },
      { bold: true, text: "메시지 가장 앞" },
      { bold: false, text: "에 " },
      { bold: true, text: "'!투표1'" },
      { bold: false, text: " 혹은 " },
      { bold: true, text: "'!투표 1'" },
      { bold: false, text: "과 같이 입력해주세요" },
    ],
  },
  {
    body: [
      {
        bold: false,
        text: "투표율 바를 클릭하면 상세 정보를 확인할 수 있습니다",
      },
    ],
    list: [
      [{ bold: false, text: "투표자 리스트를 확인할 수 있습니다" }],
      [
        {
          bold: false,
          text: "해당 항목에 투표한 사람 중에서 추첨을 진행할 수 있습니다",
        },
      ],
      [
        {
          bold: false,
          text: "투표 진행 중에도 추첨이 가능합니다",
        },
      ],
    ],
  },
];

export default function Running({
  vote,
  setVote,
  onStop,
  drawn,
  time,
  setDrawn,
}: {
  vote: VoteType[];
  setVote: Dispatch<SetStateAction<VoteType[]>>;
  drawn: ViewerType[];
  setDrawn: (viewer: ViewerType) => void;
  time: TimeType;
  onStop: () => void;
}) {
  const { channel } = useGlobalOptionStore();
  const [hidden, setHidden] = useState<boolean>(false);

  function handleOnChat(viewer: ViewerType, message: string) {
    const onlyNumber = extractVoteNumber(message);
    if (!onlyNumber) return;
    const number = onlyNumber - 1;

    setVote((prev) => {
      const thisVote = prev[number];
      if (!thisVote) return prev;

      const newVote = [...prev].map((item) => ({
        ...item,
        viewers: item.viewers.filter(
          (viewersItem) => viewersItem.userIdHash !== viewer.userIdHash
        ),
      }));

      newVote[number].viewers.push(viewer);
      return newVote;
    });
  }

  useEffect(() => {
    if (channel.channelId === "") {
      alert("채널ID가 정상적으로 인식되지 않습니다. 다시 시도해주세요.");
      location.reload();
      return;
    }

    const client = useChzzkChat({
      channelId: channel.channelId,
      onChat: (viewer, message, messageString) => {
        handleOnChat(viewer, messageString);
      },
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const total = vote.reduce((sum, item) => sum + item.viewers.length, 0);

  return (
    <Container>
      <Top>
        <Total>총 {total}표</Total>
        <TimeElapsed {...time} />
      </Top>
      <Description title="채팅 투표가 진행중입니다" body={description} />
      <List>
        {vote.map((item) => (
          <ListItem
            index={item.id}
            name={item.name}
            total={total}
            viewers={item.viewers}
            drawn={drawn}
            setDrawn={setDrawn}
            hidden={hidden}
          />
        ))}
      </List>
      <Bottom>
        <MainCheckbox
          title="투표 내용 가리기"
          value={hidden}
          onClick={() => {
            setHidden((prev) => !prev);
          }}
        />
        <MainButton onClick={onStop}>투표 종료</MainButton>
      </Bottom>
    </Container>
  );
}
