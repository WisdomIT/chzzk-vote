"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";
import MainButton from "@/app/_components/Main/MainButton";
import { Container, ContainerCenter } from "./index.styled";
import { List, ListScroll, ListScrollEnd } from "./Ready.styled";
import AddListItem from "@/app/_components/Vote/AddListItem";
import { RouletteType } from "../page";
import SetListRouletteItem from "../_components/SetListRouletteItem";
import { useSearchParams } from "next/navigation";

export default function Ready({
  roulette,
  setRoulette,
  onStart,
}: {
  roulette: RouletteType[];
  setRoulette: Dispatch<SetStateAction<RouletteType[]>>;
  onStart: () => void;
}) {
  function handleChangeName(index: number, value: string) {
    const current = [...roulette];
    current[index].name = value;

    setRoulette(current);
  }

  function handleChangeSize(index: number, value: number) {
    const current = [...roulette];
    if (value < 1) {
      current[index].size = 1;
    } else {
      current[index].size = value;
    }

    setRoulette(current);
  }

  function handleDelete(index: number) {
    const newArr = [
      ...roulette.slice(0, index),
      ...roulette
        .slice(index + 1)
        .map((item) => ({ ...item, id: item.id - 1 })),
    ];

    setRoulette(newArr);
  }

  function handleAdd() {
    setRoulette((prev) => [
      ...prev,
      {
        id: prev.length,
        name: "",
        size: 1,
      },
    ]);

    setTimeout(() => {
      document.getElementById("scrollEnd")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }

  function handleOnStart() {
    if (!roulette.every((item) => !isNaN(item.size))) {
      alert("모든 항목의 확률을 확인해주세요");
      return;
    }
    onStart();
  }

  function validateData(query: string): boolean {
    if (typeof query !== "string") return false;
    try {
      const data = JSON.parse(decodeURIComponent(query));

      if (!Array.isArray(data)) return false;
      if (data.length === 0) return false;

      return data.every(
        (item) =>
          typeof item === "object" &&
          "name" in item &&
          "size" in item &&
          typeof item.name === "string" &&
          typeof item.size === "number"
      );
    } catch {
      return false;
    }
  }

  const searchParams = useSearchParams();
  const getData = searchParams.get("data");

  useEffect(() => {
    if (!getData || !validateData(getData)) return;

    try {
      const parsed = JSON.parse(getData) as {
        name: string;
        size: number;
      }[];
      const roulette = parsed.map((item, index) => ({ id: index, ...item }));
      setRoulette(roulette);
    } catch {
      return;
    }
  }, [getData]);

  const total = roulette.reduce((sum, item) => sum + item.size, 0);

  return (
    <Container>
      <ContainerCenter>
        <List>
          <ListScroll>
            {roulette.map((item, index) => (
              <SetListRouletteItem
                key={`roulette_${item.id}`}
                index={item.id}
                name={item.name}
                setName={(value) => {
                  handleChangeName(index, value);
                }}
                size={item.size}
                setSize={(value) => {
                  handleChangeSize(index, value);
                }}
                percentage={
                  !isNaN(item.size / total)
                    ? ((item.size / total) * 100).toFixed(2)
                    : "0.00"
                }
                onDelete={() => {
                  handleDelete(index);
                }}
              />
            ))}
            <ListScrollEnd id="scrollEnd" />
          </ListScroll>
          <AddListItem onAdd={handleAdd} />
        </List>
        <MainButton onClick={handleOnStart}>룰렛 시작</MainButton>
      </ContainerCenter>
    </Container>
  );
}
