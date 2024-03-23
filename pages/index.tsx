import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
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

  animation: appearUp .3s;

  @media ${device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`

const Btn = styled(Link)`
  display: flex;
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

  &:hover i, &:hover p {

    .dark & {
      color: var(--color-brand);
    }

    .light & {
      color: var(--color-brand-light);
    }

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

`

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
`

const BtnText = styled.p`
  font: 800 20px/1 var(--font-default);

  .dark & {
    color: var(--color-white);
  }
`

export default function Home() {
  return (
    <>
      <Head>
        <title>CHZZK VOTE</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>
        <Btn href="/viewer">
          <BtnIcon className="fa-sharp fa-light fa-users" />
          <BtnText>시청자 추첨</BtnText>
        </Btn>
        <Btn href="/vote">
          <BtnIcon className="fa-sharp fa-light fa-check-to-slot" />
          <BtnText>숫자 투표</BtnText>
        </Btn>
        <Btn href="/roulette">
          <BtnIcon className="fa-sharp fa-light fa-slot-machine" />
          <BtnText>룰렛</BtnText>
        </Btn>
      </Frame>
    </>
  )
}
