"use client";

import MainButton from "@/app/_components/Main/MainButton";
import { ChannelType } from "@/lib/types";
import { Container, Btns, ContainerCenter } from "./index.styled";
import {
  Text,
  ChannelContainer,
  ImageContainer,
  Image,
  Info,
  Name,
  Verified,
  Followers,
} from "./ChannelFind.styled";

export function formatNumber(number: number): string {
  if (number <= 10000) {
    return number.toString();
  } else {
    const tenThousands = number / 10000;
    return `${tenThousands.toFixed(1)}만`;
  }
}

export default function ChannelFind({
  channel,
  onReset,
  onNext,
}: {
  channel: ChannelType;
  onReset: () => void;
  onNext: () => void;
}) {
  return (
    <Container>
      <ContainerCenter>
        <Text>채널이 검색되었습니다!</Text>
        <ChannelContainer>
          <ImageContainer>
            <Image src={channel.channelImageUrl} />
          </ImageContainer>
          <Info>
            <Name>
              {channel.channelName}
              {channel.verifiedMark && <Verified src="/verified.png" />}
            </Name>
            <Followers>
              팔로워 {formatNumber(channel.followerCount)}명
            </Followers>
          </Info>
        </ChannelContainer>
        <Btns>
          <MainButton fillType="outlined" onClick={onReset}>
            다시 검색하기
          </MainButton>
          <MainButton onClick={onNext}>다음으로</MainButton>
        </Btns>
      </ContainerCenter>
    </Container>
  );
}
