"use client";

import {
  Container,
  ContainerCenter,
  Btns,
} from "../../_components/index.styled";
import MainButton from "@/app/_components/Main/MainButton";
import { ChannelType } from "@/lib/types";
import {
  Text,
  ChannelContainer,
  ImageContainer,
  Image,
  Info,
  Name,
  Verified,
  Followers,
} from "@/app/(sign)/sign/_views/ChannelFind.styled";
import { formatNumber } from "@/app/(sign)/sign/_views/ChannelFind";

export default function New({
  channel,
  setChannel,
  onReset,
}: {
  channel: ChannelType;
  setChannel: (channel: ChannelType) => void;
  onReset: () => void;
}) {
  function handleSubmit() {
    setChannel(channel);
    alert("채널이 등록되었습니다.");
    location.reload();
  }

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
          <MainButton onClick={handleSubmit}>등록하기</MainButton>
        </Btns>
      </ContainerCenter>
    </Container>
  );
}
