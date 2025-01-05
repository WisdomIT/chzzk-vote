import { memo, useEffect, useState } from "react";
import { Background, Container, Progress, ProgressBar } from "./Timer.styled";

function convertSecondsToHMS(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 시, 분, 초를 두 자리 숫자 형식으로 변환
  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = remainingSeconds.toString().padStart(2, "0");

  if (hours === 0) return `${formattedMinutes}:${formattedSeconds}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const Timer = memo(({ end, onStop }: { end: Date; onStop: () => void }) => {
  const [timeFull, setTimeFull] = useState(0);
  const [timeCurrent, setTimeCurrent] = useState(0);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    function calculateTime(time: Date) {
      const currentTime = new Date().getTime();
      const endTime = time.getTime();
      const timeSeconds = Math.floor((endTime - currentTime) / 1000);

      if (timeSeconds < 0) return 0;
      return timeSeconds;
    }

    const timeFull = calculateTime(end);
    setTimeCurrent(timeFull);
    setTimeFull(timeFull);

    const interval = setInterval(() => {
      const time = calculateTime(end);
      setTimeCurrent(time);
      if (time <= 10 && time !== 0) {
        setBackground(true);
        setTimeout(() => {
          setBackground(false);
        }, 800);
      }
      if (time === 0) onStop();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  const timeToString = convertSecondsToHMS(timeCurrent);
  const timePercentage = (100 - ((timeCurrent - 1) / timeFull) * 100).toFixed(
    6
  );

  return (
    <Container>
      {background ? <Background>{timeCurrent.toString()}</Background> : null}
      <Progress>
        <ProgressBar style={{ width: `${timePercentage}%` }}>
          {timeToString}
        </ProgressBar>
      </Progress>
    </Container>
  );
});

Timer.displayName = "Timer";

export default Timer;
