"use client";

import { TimeType } from "@/lib/types";
import { memo, useEffect, useState } from "react";
import {
  Container,
  DigitContainer,
  DigitOverlay,
  OldDigit,
  NewDigit,
  Separator,
} from "./TimeElapsed.styled";

function convertSecondsToHMS(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 시, 분, 초를 두 자리 숫자 형식으로 변환
  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const TimeElapsed = memo(({ start, end }: TimeType) => {
  const [time, setTime] = useState("00:00:00");
  const [prevTime, setPrevTime] = useState("00:00:00");
  const [changingIndices, setChangingIndices] = useState<boolean[]>([]);

  useEffect(() => {
    const updateTime = (newTime: string) => {
      if (newTime !== time) {
        setPrevTime(time);
        setTime(newTime);

        // 어떤 숫자가 변경되었는지 체크
        const newChangingIndices = time
          .split("")
          .map(
            (char, i) =>
              char !== newTime[i] && char !== ":" && newTime[i] !== ":"
          );
        setChangingIndices(newChangingIndices);

        // 애니메이션이 끝난 후 changingIndices 초기화
        setTimeout(() => {
          setChangingIndices(new Array(newTime.length).fill(false));
        }, 300); // 애니메이션 duration과 동일하게 설정
      }
    };

    if (start && end) {
      const startTime = start.getTime();
      const endTime = end.getTime();
      const timeSeconds = Math.floor((endTime - startTime) / 1000);
      updateTime(convertSecondsToHMS(timeSeconds));
      return;
    }

    if (!start) return;

    function timeInterval(start: Date) {
      const startTime = start.getTime();
      const endTime = new Date().getTime();
      const timeSeconds = Math.floor((endTime - startTime) / 1000);
      updateTime(convertSecondsToHMS(timeSeconds));
    }

    const interval = setInterval(() => {
      timeInterval(start);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [start, end, time]);

  return (
    <Container>
      {time.split("").map((digit, index) =>
        digit === ":" ? (
          <Separator key={`separator_${index}`}>:</Separator>
        ) : (
          <DigitContainer key={`digit_container_${index}`}>
            <DigitOverlay>
              <OldDigit isChanging={changingIndices[index]}>
                {prevTime[index]}
              </OldDigit>
              <NewDigit isChanging={changingIndices[index]}>{digit}</NewDigit>
            </DigitOverlay>
          </DigitContainer>
        )
      )}
    </Container>
  );
});

TimeElapsed.displayName = "TimeElapsed";

export default TimeElapsed;
