"use client";

import { useState } from "react";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import TimeElapsed from "@/app/_components/Vote/TimeElapsed";
import ListItem from "@/app/_components/Vote/ListItem";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import {
  Container,
  Top,
  Total,
  Bottom,
  List,
  ContainerCenter,
} from "./index.styled";
import { BottomBtns } from "./Completed.styled";
import voteToRoulette from "@/lib/voteToRoulette";
import { useRouter } from "next/navigation";

export default function Completed({
  vote,
  drawn,
  time,
  setDrawn,
  onReset,
}: {
  vote: VoteType[];
  drawn: ViewerType[];
  time: TimeType;
  setDrawn: (viewer: ViewerType) => void;
  onReset: () => void;
}) {
  const [sortLength, setSortLength] = useState<boolean>(false);

  const router = useRouter();

  const handleToRoulette = () => {
    const encoded = voteToRoulette(vote);
    if (!encoded) {
      return;
    }
    router.push(encoded);
  };

  const total = vote.reduce((sum, item) => sum + item.viewers.length, 0);

  return (
    <Container>
      <ContainerCenter>
        <Top>
          <Total>총 {total}표</Total>
          <TimeElapsed {...time} />
        </Top>
        <List>
          {vote
            .slice() // 원본 배열을 변경하지 않기 위해 복사
            .sort((a, b) => {
              if (sortLength) {
                // viewers.length가 큰 순서대로 정렬
                return b.viewers.length - a.viewers.length;
              } else {
                // id가 작은 순서대로 정렬
                return a.id - b.id;
              }
            })
            .map((item) => (
              <ListItem
                index={item.id}
                name={item.name}
                total={total}
                viewers={item.viewers}
                drawn={drawn}
                setDrawn={setDrawn}
                hidden={false}
              />
            ))}
        </List>
        <Bottom>
          <MainCheckbox
            title="투표수가 높은 순으로 표시하기"
            value={sortLength}
            onClick={() => {
              setSortLength((prev) => !prev);
            }}
          />
          <BottomBtns>
            <MainButton onClick={onReset}>다시 시작하기</MainButton>
            <MainButton fillType="outlined" onClick={handleToRoulette}>
              투표결과로 룰렛 돌리기
            </MainButton>
          </BottomBtns>
        </Bottom>
      </ContainerCenter>
    </Container>
  );
}
