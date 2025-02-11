"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import type { VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import { Container, ContainerCenter } from "./index.styled";
import SetListItem from "@/app/_components/Vote/SetListItem";
import deepCopy from "@/lib/deepcopy";
import {
  List,
  ListScroll,
  ListScrollEnd,
  Seconds,
  Timers,
} from "./Ready.styled";
import AddListItem from "@/app/_components/Vote/AddListItem";
import { DoneConfigType } from "../page";
import SetListItemCustom from "@/app/_components/Vote/SetListItemCustom";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import MainInput from "@/app/_components/Main/MainInput";

export default function Ready({
  zoom,
  vote,
  setVote,
  doneConfig,
  setDoneConfig,
  onStart,
}: {
  zoom: number;
  vote: VoteType[];
  setVote: Dispatch<SetStateAction<VoteType[]>>;
  doneConfig: DoneConfigType;
  setDoneConfig: Dispatch<SetStateAction<DoneConfigType>>;
  onStart: (timer: number | null) => void;
}) {
  const [timer, setTimer] = useState<number | null>(null);

  function handleChange(index: number, value: string) {
    const current = deepCopy(vote);
    current[index].name = value;

    setVote(current);
  }

  function handleDelete(index: number) {
    const newArr = [
      ...vote.slice(0, index),
      ...vote.slice(index + 1).map((item) => ({ ...item, id: item.id - 1 })),
    ];

    setVote(newArr);
  }

  function handleAdd() {
    setVote((prev) => [
      ...prev,
      {
        id: prev.length,
        name: "",
        viewers: [],
      },
    ]);

    setTimeout(() => {
      document.getElementById("scrollEnd")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  }

  return (
    <Container>
      <ContainerCenter $zoom={zoom}>
        <List>
          <SetListItemCustom
            type="number"
            title="금액"
            value={doneConfig.price.toString()}
            step={1}
            min={1}
            onChange={(event) => {
              setDoneConfig((prev) => ({
                ...prev,
                price: parseInt(event.target.value),
              }));
            }}
          />
          <MainCheckbox
            title="복수투표 허용 (금액만큼 배수 투표됩니다)"
            value={doneConfig.plural}
            onClick={() => {
              setDoneConfig((prev) => ({
                ...prev,
                plural: !prev.plural,
              }));
            }}
            style={{ alignSelf: "center" }}
          />
        </List>
        <List>
          <ListScroll $zoom={zoom}>
            {vote.map((item, index) => (
              <SetListItem
                key={`vote_${item.id}`}
                index={item.id}
                value={item.name}
                setValue={(value) => {
                  handleChange(index, value);
                }}
                onDelete={() => {
                  handleDelete(index);
                }}
              />
            ))}
            <ListScrollEnd id="scrollEnd" />
          </ListScroll>
          <AddListItem onAdd={handleAdd} />
        </List>
        <Timers>
          <MainCheckbox
            title="타이머 사용하기"
            value={timer !== null}
            onClick={() => {
              if (timer === null) setTimer(0);
              else setTimer(null);
            }}
          />
          {timer !== null ? (
            <>
              <MainInput
                type="number"
                value={timer}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  if (value < 0) return;
                  setTimer(value);
                }}
                style={{ width: 100 }}
                min={1}
                step={1}
              />
              <Seconds>초</Seconds>
            </>
          ) : null}
          <MainButton
            onClick={() => {
              onStart(timer);
            }}
          >
            투표 시작
          </MainButton>
        </Timers>
      </ContainerCenter>
    </Container>
  );
}
