import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/Input";
import Btn from "@/components/Btn";
import { useGlobalOptionStore } from "@/lib/zustand";
import getVoices from "@/lib/getVoices";
import { ChzzkClient } from "chzzk";
import { ChannelType } from "@/lib/types";
import FindChannel from "@/components/FindChannel";

const Frame = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 60px;
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

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 800px;
`

const InputName = styled.p`
  font: 800 20px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 16px/1 var(--font-default);
  }
`

const InputNameDescription = styled.span`
  font: 600 14px/1 var(--font-default);
  margin-left: 20px;

  @media ${device.mobile} {
    font: 600 12px/1 var(--font-default);
    margin-left: 10px;
  }
`

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const SmallBtn = styled(Btn)`
  height: 60px;

  @media ${device.mobile} {
    height: 48px;
  }
`

const Select = styled.select`
  font: 400 20px/1 var(--font-default);
  padding: 16px 20px;
  border: 0px;
  border-radius: 8px;
  flex: 1;
  min-width: 120px;

  .dark & {
    background-color: var(--color-background-02);
    color: var(--color-white);

    &::placeholder{
      color: var(--color-white-20);
    }
  }

  .light & {
    background-color: var(--color-black-10);
    color: var(--color-black);

    &::placeholder{
      color: var(--color-black-20);
    }
  }

  @media ${device.mobile} {
    font: 400 14px/1 var(--font-default);
  }
`

const Description = styled.p`
  font: 600 14px/1 var(--font-default);
  padding: 10px 20px;
  border-radius: 8px;

  .dark & {
    background-color: var(--color-white-10);
    border: 1px solid var(--color-white-10);
  }

  .light & {
    background-color: var(--color-black-10);
    border: 1px solid var(--color-black-10);
  }

  @media ${device.mobile} {
    font: 600 12px/1 var(--font-default);
    margin-bottom: 10px;
  }
`

function isValidText(text: string): boolean {
  // 정규 표현식을 사용하여 32자의 영어 알파벳(대소문자 구분 없음)과 숫자로만 이루어져 있는지 확인
  const regex = /^[A-Za-z0-9]{32}$/;
  return regex.test(text);
}

function getLastPathSegment(input: string): string {
  try {
    const url = new URL(input);
    const pathSegments = url.pathname.split('/');
    return pathSegments.filter(Boolean).pop() || input;
  } catch {
    return input;
  }
}

export default function Home() {

  const [ channelId, setChannelId ] = useState('')
  const [ voiceName, setVoiceName ] = useState('')
  const [ voiceList, setVoiceList ] = useState<string[]>([])
  const { channel, voice, setChannel, setVoice } = useGlobalOptionStore()
  const [ find, setFind ] = useState<ChannelType | null>(null)

  const getVoiceList = async () => {
    const voices = await getVoices()
    const list = voices.map(e => e.name)
    setVoiceList(list)
  }

  useEffect(() => {
    setChannelId(channel.channelId)
    setVoiceName(voice)
    getVoiceList()
  },[channel, voice])
  
  const playVoice = async () => {
    const voices = await getVoices()
    const selected = voices.find(e => e.name === voiceName)
    if(!selected) return

    const utterance = new SpeechSynthesisUtterance('움성 테스트 메시지입니다');
    utterance.voice = selected

    window.speechSynthesis.speak(utterance);
  }

  const setVoiceFunction = () => {
    setVoice(voiceName)
    alert('저장되었습니다')
  }

  const onSubmitChannel = async () => {
    const getLastPath = getLastPathSegment(channelId)
    const isValidUrl = isValidText(getLastPath)
    
    if(!isValidUrl){
      alert('유효하지 않은 주소(채널ID)입니다.\n다시 한 번 확인해주세요.')
      return
    }

    const options = {
      baseUrls: {
        chzzkBaseUrl: '/api/proxy/chzzkBase',
        gameBaseUrl: '/api/proxy/gameBase'
      }
    }

    const client = new ChzzkClient(options)

    const findChannel = await client.channel(getLastPath)
    //console.log(findChannel)

    if(findChannel === null){
      alert('유효하지 않은 주소(채널ID)입니다.\n다시 한 번 확인해주세요.')
      return
    }

    const channelData = {
      channelId: findChannel.channelId,
      channelImageUrl: findChannel.channelImageUrl ? findChannel.channelImageUrl : '',
      channelName: findChannel.channelName,
      verifiedMark: findChannel.verifiedMark,
      followerCount: findChannel.followerCount
    }

    setFind(channelData)
  }

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      onSubmitChannel()
    }
  }

  const onSetChannel = async () => {
    if(!find){
      alert('잘못된 요청입니다!')
      return
    }

    setChannel(find)
    alert('저장되었습니다')
    setFind(null)

  }

  return (
    <>
      <Head>
        <title>CHZZK VOTE</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>
        <Breadcrumbs icon="gear" text="설정" href="/config" />
        <Description>모든 데이터는 컴퓨터에 저장되며, 서버에 전송되지 않습니다</Description>
        <InputFrame>
          <InputName>
            채널ID
            <InputNameDescription>치지직 채널ID 혹은 채널 주소(URL)를 입력해주세요</InputNameDescription>
          </InputName>
          <InputRow>
            <Input
              style={{flex: 1}}
              type="text"
              value={channelId}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChannelId(event.target.value)}
              onKeyUp={onEnter}
              placeholder="ex) https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc"
            />
            <SmallBtn
              $type="default"
              $width={100}
              onClick={onSubmitChannel}
            >
              설정
            </SmallBtn>
          </InputRow>
        </InputFrame>
        <InputFrame>
          <InputName>
            TTS 음성
          </InputName>
          <InputRow>
            <Select
              value={voiceName}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setVoiceName(event.target.value)}
            >
              {
                voiceList.map(e => <option key={`voice_${e}`} value={e}>{e}</option>)
              }
            </Select>
            <SmallBtn
              $type="line"
              $width={100}
              onClick={playVoice}
            >
              재생
            </SmallBtn>
            <SmallBtn
              $type="default"
              $width={100}
              onClick={setVoiceFunction}
            >
              설정
            </SmallBtn>
          </InputRow>
        </InputFrame>
      </Frame>
      {
        find !== null && <FindChannel find={find} onCancel={() => setFind(null)} onAccept={onSetChannel} />
      }
    </>
  )
}
