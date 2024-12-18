"use client";

import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { faVolume } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";
import MainButton from "@/app/_components/Main/MainButton";
import useVoice, { getSystemVoices } from "@/lib/useVoice";
import { Container, Btns } from "./index.styled";
import { Text, Item, List, Lang, Name, Icon } from "./Voice.styled";

export default function Voice({
  voice,
  setVoice,
  onBack,
  onSubmit,
}: {
  voice: string;
  setVoice: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [list, setList] = useState<SpeechSynthesisVoice[]>([]);

  async function handleGetVoices() {
    const voices = await getSystemVoices();
    setList(voices);
  }

  useEffect(() => {
    handleGetVoices();
  }, []);

  function handleSetVoice(name: string) {
    useVoice(name, "TTS 음성 테스트입니다");
    setVoice(name);
  }

  return (
    <Container>
      <Text>TTS를 읽을 음성을 선택하세요</Text>
      <List>
        {list.map((item) => (
          <Item
            key={item.voiceURI}
            $recommanded={item.lang === "ko-KR"}
            $selected={item.name === voice}
            onClick={() => {
              handleSetVoice(item.name);
            }}
          >
            <Lang $selected={item.name === voice}>{item.lang}</Lang>
            <Name $selected={item.name === voice}>{item.name}</Name>
            <Icon $selected={item.name === voice} icon={faVolume} />
          </Item>
        ))}
      </List>
      <Btns>
        <MainButton fillType="outlined" onClick={onBack}>
          돌아가기
        </MainButton>
        <MainButton onClick={onSubmit}>저장하기</MainButton>
      </Btns>
    </Container>
  );
}
