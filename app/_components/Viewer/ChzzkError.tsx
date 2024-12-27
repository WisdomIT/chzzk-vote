import { faExclamationTriangle } from "@awesome.me/kit-8710ef4103/icons/sharp/regular";
import { Container, Title, Description, Icon } from "./ChzzkError.styled";
import { useEffect, useState } from "react";

export default function ChzzkError() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  return (
    <Container>
      <Title>
        <Icon icon={faExclamationTriangle} />
        에러가 발생했습니다!
        <Icon icon={faExclamationTriangle} />
      </Title>
      <Description>
        방송이 연령 제한 모드이거나, 일부 지역에서만 접속할 수 있도록 비공개
        설정되어있는지 확인해주세요.
        <br />
        봇은 모든 시청자가 참여할 수 있는 환경에서만 채팅을 읽을 수 있습니다.
        <br />
        투표 및 추첨은 {count.toString()}초 후 자동 종료됩니다.
      </Description>
    </Container>
  );
}
