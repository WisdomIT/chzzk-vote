"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import TimeElapsed from "@/app/_components/Vote/TimeElapsed";
import ListItem from "@/app/_components/Vote/ListItem";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import { Container } from "./index.styled";
import { Bottom, List, Top, Total } from "./Running.styled";
import { extractVoteNumber } from "@/lib/vote";

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
