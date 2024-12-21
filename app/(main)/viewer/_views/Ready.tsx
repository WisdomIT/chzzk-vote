"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Container } from "./index.styled";
import Config from "../../../_components/Viewer/Config";
import { ViewersConfigType } from "@/lib/types";

export default function Ready({
  config,
  setConfig,
  onStart,
}: {
  config: ViewersConfigType;
  setConfig: (type: keyof ViewersConfigType) => void;
  onStart: () => void;
}) {
  return (
    <Container>
      <MainButton onClick={onStart}>참여자 모집 시작</MainButton>
      <Config config={config} setConfig={setConfig} />
    </Container>
  );
}
