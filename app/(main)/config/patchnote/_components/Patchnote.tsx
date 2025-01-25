"use client";

import { Container, Item, Title, List } from "./Patchnote.styled";
import { useGlobalOptionStore } from "@/lib/zustand";

export interface PatchnoteType {
  date: Date;
  body: string[];
}

function formatKoreanDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export default function Patchnote({ data }: { data: PatchnoteType[] }) {
  const { zoom } = useGlobalOptionStore();

  // 최신 날짜가 먼저 오도록 내림차순 정렬
  const dataSorted = data.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Container $zoom={zoom}>
      {dataSorted.map((item, index) => (
        <Item key={`patchnote_${index.toString()}`}>
          <Title>{formatKoreanDate(item.date)}</Title>
          <List>
            {item.body.map((bodyItem, bodyIndex) => (
              <li key={`patchnote_${index.toString()}_${bodyIndex.toString()}`}>
                {bodyItem}
              </li>
            ))}
          </List>
        </Item>
      ))}
    </Container>
  );
}
