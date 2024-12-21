"use client";

import { ViewersConfigType } from "@/lib/types";
import { Container } from "./Config.styled";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";

export default function Config({
  config,
  setConfig,
}: {
  config: ViewersConfigType;
  setConfig: (type: keyof ViewersConfigType) => void;
}) {
  return (
    <Container>
      <MainCheckbox
        title="구독자만 추첨하기"
        value={config.subscribe}
        onClick={() => {
          setConfig("subscribe");
        }}
      />
      <MainCheckbox
        title="이미 뽑힌 참여자 제외하기"
        value={config.duplicate}
        onClick={() => {
          setConfig("duplicate");
        }}
      />
    </Container>
  );
}
