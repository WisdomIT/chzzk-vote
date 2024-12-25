"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { Container, ContainerCenter } from "./index.styled";
import MainButton from "@/app/_components/Main/MainButton";
import MainInput from "@/app/_components/Main/MainInput";
import { Text1, Text2, TopText, Inputs, Terms } from "./Channel.styled";
import { ChannelType } from "@/lib/types";
import chzzkFind from "@/lib/chzzkFind";

export default function Channel({
  setChannel,
}: {
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
        <TopText>
          <Text1>
            안녕하세요!
            <br />
            처음 오셨나요?
          </Text1>
          <Text2>
            추첨 및 투표를 진행할 치지직 채널의 주소(URL)를 알려주세요!
          </Text2>
        </TopText>
        <Inputs>
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
        </Inputs>
        <Text1>
          채널ID를 직접 입력하셔도 괜찮아요!
          <br />
          등록된 채널ID는 이후 설정 메뉴에서 변경 가능합니다
          <br />
          설정 데이터는 컴퓨터에 저장됩니다
        </Text1>
        <Terms href="/terms/privacy" target="_blank">
          개인정보처리방침 안내
        </Terms>
      </ContainerCenter>
    </Container>
  );
}
