"use client";

import { type Dispatch, type SetStateAction } from "react";
import type { VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import { Container, ContainerCenter } from "./index.styled";
import SetListItem from "@/app/_components/Vote/SetListItem";
import deepCopy from "@/lib/deepcopy";
import { List, ListScroll, ListScrollEnd } from "./Ready.styled";
import AddListItem from "@/app/_components/Vote/AddListItem";

export default function Ready({
  zoom,
  vote,
  setVote,
  onStart,
}: {
  zoom: number;
  vote: VoteType[];
  setVote: Dispatch<SetStateAction<VoteType[]>>;
  onStart: () => void;
}) {
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
        <MainButton onClick={onStart} style={{ flexShrink: 0 }}>
          투표 시작
        </MainButton>
      </ContainerCenter>
    </Container>
  );
}
