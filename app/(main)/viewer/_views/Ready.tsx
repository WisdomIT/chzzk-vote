"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container } from "./index.styled";
import Config from "../_components/Config";

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
      <Config config={config} setConfig={setConfig} />
    </Container>
  );
}
