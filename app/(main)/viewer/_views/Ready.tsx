"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Config, Container } from "./index.styled";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";

export default function Ready({
  config,
  setConfig,
  onStart,
}: {
  config: {
    subscribe: boolean;
    duplicate: boolean;
  };
  setConfig: (type: "subscribe" | "duplicate") => void;
  onStart: () => void;
}) {
  return (
    <Container>
      <MainButton onClick={onStart}>참여자 모집 시작</MainButton>
      <Config>
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
      </Config>
    </Container>
  );
}
