"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { Btns, Container, Seconds } from "./index.styled";
import Config from "../../../_components/Viewer/Config";
import { ViewersConfigType } from "@/lib/types";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import { useState } from "react";
import MainInput from "@/app/_components/Main/MainInput";

export default function Ready({
  config,
  setConfig,
  onStart,
}: {
  config: ViewersConfigType;
  setConfig: (type: keyof ViewersConfigType) => void;
  onStart: (timer: number | null) => void;
}) {
  const [timer, setTimer] = useState<number | null>(null);

  return (
    <Container>
      <MainButton
        onClick={() => {
          onStart(timer);
        }}
      >
        참여자 모집 시작
      </MainButton>
      <Config config={config} setConfig={setConfig} />
      <Btns>
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
      </Btns>
    </Container>
  );
}
