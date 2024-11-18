import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from "@/lib/style";
import Link from "next/link";

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  animation: appearUp 0.3s;

  @media ${device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

const Btn = styled(Link)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 300px;
  gap: 50px;
  border-radius: 8px;
  cursor: pointer;

  .dark & {
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
    border: 1px solid var(--color-stroke-light-01);
  }

  &:hover {
    .dark & {
      border: 3px solid var(--color-brand);
    }

    .light & {
      border: 5px solid var(--color-brand-light);
    }
  }

  &:hover i,
  &:hover p {
    .dark & {
      color: var(--color-brand);
    }

    .light & {
      color: var(--color-brand-light);
    }
  }

  &:hover span {
    animation: appearUp 0.3s forwards;
  }

  @media ${device.tablet} {
    width: 200px;
    height: 250px;
  }

  @media ${device.mobile} {
    width: 100%;
    height: 100px;
    flex-direction: row;
  }
`;

const BtnIcon = styled.i`
  font-size: 80px;

  .dark & {
    color: var(--color-white);
  }

  @media ${device.tablet} {
    font-size: 60px;
  }

  @media ${device.mobile} {
    font-size: 40px;
  }
`;

const BtnText = styled.p`
  font: 800 20px/1 var(--font-default);

  .dark & {
    color: var(--color-white);
  }
`;

const BtnTooltip = styled.span`
  display: block;
  position: absolute;
  bottom: -80px;
  left: -4px;
  right: -4px;
  background-color: var(--color-brand);
  color: var(--color-background-01);
  padding: 10px;
  text-align: center;
  font: 600 16px/1.3 var(--font-default);
  border-radius: 8px;
  opacity: 0;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>CHZZK VOTE - 치지직 투표 추첨기</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>
        <Btn href="/viewer">
          <BtnIcon className="fa-sharp fa-light fa-users" />
          <BtnText>시청자 추첨</BtnText>
          <BtnTooltip>
            랜덤한 시청자를
            <br />
            추첨을 통해 뽑습니다
          </BtnTooltip>
        </Btn>
        <Btn href="/vote">
          <BtnIcon className="fa-sharp fa-light fa-check-to-slot" />
          <BtnText>숫자 투표</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />
            시청자들이 채팅으로 투표합니다
          </BtnTooltip>
        </Btn>
        <Btn href="/donation">
          <BtnIcon className="fa-sharp fa-light fa-cheese-swiss" />
          <BtnText>도네 투표</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />
            시청자들이 도네로 투표합니다
          </BtnTooltip>
        </Btn>
        <Btn href="/roulette">
          <BtnIcon className="fa-sharp fa-light fa-slot-machine" />
          <BtnText>룰렛</BtnText>
          <BtnTooltip>
            항목을 정해두고
            <br />그 중 하나를 룰렛으로 뽑습니다
          </BtnTooltip>
        </Btn>
      </Frame>
    </>
  );
}
