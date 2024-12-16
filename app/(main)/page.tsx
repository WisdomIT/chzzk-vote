import Head from "next/head";
import { Container, Btn, BtnIcon, BtnText, BtnTooltip } from "./page.styled";
import {
  faCheckToSlot,
  faCheeseSwiss,
  faSlotMachine,
  faUsers,
} from "@awesome.me/kit-8710ef4103/icons/sharp/light";

export default function Page() {
  return (
    <>
      <Head>
        <title>CHZZK VOTE - 치지직 투표 추첨기</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Btn href="/viewer">
          <BtnIcon icon={faUsers} />
          <BtnText>시청자 추첨</BtnText>
          <BtnTooltip>
            랜덤한 시청자를
            <br />
            추첨을 통해 뽑습니다
          </BtnTooltip>
        </Btn>
        <Btn href="/vote">
          <BtnIcon icon={faCheckToSlot} />
          <BtnText>숫자 투표</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />
            시청자들이 채팅으로 투표합니다
          </BtnTooltip>
        </Btn>
        <Btn href="/donation">
          <BtnIcon icon={faCheeseSwiss} />
          <BtnText>도네 투표</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />
            시청자들이 도네로 투표합니다
          </BtnTooltip>
        </Btn>
        <Btn href="/roulette">
          <BtnIcon icon={faSlotMachine} />
          <BtnText>룰렛</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />그 중 하나를 룰렛으로 뽑습니다
          </BtnTooltip>
        </Btn>
      </Container>
    </>
  );
}
