"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
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
import {
  Container,
  Top,
  Total,
  Bottom,
  List,
  ContainerCenter,
} from "./index.styled";
import { webhook } from "../../_api/webhook";
import ChzzkError from "@/app/_components/Viewer/ChzzkError";
import Timer from "@/app/_components/Vote/Timer";

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
      [
        {
          bold: false,
          text: "투표자 리스트를 확인하고, 그 중에서 추첨을 진행할 수 있습니다",
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
  drawn,
  setDrawn,
  time,
  timer,
  onStop,
}: {
  vote: VoteType[];
  setVote: Dispatch<SetStateAction<VoteType[]>>;
  drawn: ViewerType[];
  setDrawn: (viewer: ViewerType) => void;
  time: TimeType;
  timer: Date | null;
  onStop: () => void;
}) {
  const { channel } = useGlobalOptionStore();
  const [hidden, setHidden] = useState<boolean>(false);
  const [chzzkError, setChzzkError] = useState(false);

  // 데이터를 버퍼링하기 위한 ref
  const voteSet = useRef(new Set<string>());
  const voteBuffer = useRef<VoteType[]>([...vote]);
  const bufferTimeout = useRef<NodeJS.Timeout>();

  function handleOnChat(viewer: ViewerType, message: string) {
    if (!voteSet.current || !voteBuffer.current) return;

    const onlyNumber = extractVoteNumber(message);
    if (!onlyNumber || onlyNumber > vote.length) return;

    const number = onlyNumber - 1;

    //이미 투표한 적 있는 사용자라면
    if (voteSet.current.has(viewer.userIdHash)) {
      //해당 사용자의 전 투표 기록을 삭제
      voteBuffer.current = [...voteBuffer.current].map((item) => ({
        ...item,
        viewers: item.viewers.filter(
          (viewersItem) => viewersItem.userIdHash !== viewer.userIdHash
        ),
      }));
    } else voteSet.current.add(viewer.userIdHash);

    //버퍼에 데이터 넣기
    voteBuffer.current[number].viewers.push(viewer);

    // 버퍼링된 데이터를 일정 주기로 한번에 업데이트
    if (!bufferTimeout.current) {
      setVote([...voteBuffer.current]);

      bufferTimeout.current = setTimeout(() => {
        bufferTimeout.current = undefined;
      }, 500); // 500ms마다 업데이트
    }
  }

  useEffect(() => {
    void webhook("🔢 숫자 투표", channel);

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
      onError: (error) => {
        setChzzkError(true);
        setInterval(onStop, 10000);
      },
    });

    return () => {
      if (client) client.disconnect();
    };
  }, []);

  const total = vote.reduce((sum, item) => sum + item.viewers.length, 0);

  return (
    <Container>
      <ContainerCenter>
        <Top>
          <Total>총 {total}표</Total>
          <TimeElapsed {...time} />
        </Top>
        {chzzkError ? <ChzzkError /> : null}
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
      </ContainerCenter>
      {timer ? <Timer end={timer} onStop={onStop} /> : null}
    </Container>
  );
}
