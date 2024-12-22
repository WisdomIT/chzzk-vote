"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { Container, ContainerCenter, Btns } from "./index.styled";
import MainButton from "@/app/_components/Main/MainButton";
import MainInput from "@/app/_components/Main/MainInput";
import { ChannelType } from "@/lib/types";
import chzzkFind from "@/lib/chzzkFind";
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

export default function Current({
  channel,
  setChannel,
}: {
  channel: ChannelType;
  setChannel: Dispatch<SetStateAction<ChannelType>>;
}) {
  const [url, setUrl] = useState("");

  async function handleSubmit() {
    const find = await chzzkFind(url);
    if (!find) {
      alert("유효하지 않은 주소(채널ID)입니다.\n다시 한 번 확인해주세요.");
      return;
    }

    setChannel(find);
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <Container>
      <ContainerCenter>
        <Text>현재 설정된 채널</Text>
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
        <Text>새 채널 등록</Text>
        <Btns>
          <MainInput
            type="url"
            value={url}
            placeholder="ex) https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc"
            style={{ flex: 1 }}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            onKeyUp={handleEnter}
            autoFocus
          />
          <MainButton size="small" onClick={handleSubmit}>
            등록
          </MainButton>
        </Btns>
      </ContainerCenter>
    </Container>
  );
}
