import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { ChzzkClient } from "chzzk";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useRouter } from "next/router";
import FindChannel from "@/components/FindChannel";
import { ChannelType } from "@/lib/types";
import getVoices from "@/lib/getVoices";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media ${device.mobile} {
    padding: 80px 10px;
  }
`

const Text1 = styled.p`
  text-align: center;
  font: 600 16px/1.5 var(--font-default);
  word-break: keep-all;

  @media ${device.mobile} {
    font: 600 12px/1.5 var(--font-default);
  }
`

const Text2 = styled.p`
  text-align: center;
  font: 600 24px/1 var(--font-default);
  word-break: keep-all;

  @media ${device.mobile} {
    font: 600 18px/1.5 var(--font-default);
  }
`

const TopText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  max-width: 800px;
`

const InputChannel = styled(Input)`
  flex: 1;
`

const BtnSmall = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brand);
  color: var(--color-black);
  font: 800 20px/1 var(--font-default);
  height: 60px;
  width: 100px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media ${device.mobile} {
    font: 800 14px/1 var(--font-default);
    height: 48px;
    width: 80px;
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

  const [ channelId, setChannelId ] = useState<string>('')
  const [ find, setFind ] = useState<ChannelType | null>(null)
  const { channel, setChannel, setVoice } = useGlobalOptionStore()

  const router = useRouter()

  const onSubmit = async () => {
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
      onSubmit()
    }
  }

  const onSetChannel = async () => {
    if(!find){
      alert('잘못된 요청입니다!')
      return
    }

    const voices = await getVoices()
    const voicesKR = voices.filter(voice => voice.lang === 'ko-KR')
    const findGoogleVoice = voicesKR.find(e => e.name.startsWith('Google'))

    if(findGoogleVoice) setVoice(findGoogleVoice.name)
    else if(voicesKR.length !== 0) setVoice(voicesKR[0].name)

    setChannel(find)
    router.push('/')
  }

  useEffect(() => {
    if(channel.channelId !== ''){
      router.push('/')
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>CHZZK VOTE</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>
        <TopText>
          <Text1>안녕하세요!<br/>처음 오셨나요?</Text1>
          <Text2>추첨 및 투표를 진행할 치지직 채널의 주소(URL)를 알려주세요!</Text2>
        </TopText>
        <Inputs>
          <InputChannel
            type="text"
            placeholder="ex) https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc"
            value={channelId}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChannelId(event.target.value)}
            onKeyUp={onEnter}
          />
          <BtnSmall onClick={onSubmit}>등록</BtnSmall>
        </Inputs>
        <Text1>채널ID를 직접 입력하셔도 괜찮아요!<br/>등록된 채널ID는 이후 설정 메뉴에서 변경 가능합니다<br/>데이터는 컴퓨터에 저장되며, 서버에는 전송되지 않습니다</Text1>
      </Frame>
      {
        find !== null && <FindChannel find={find} onCancel={() => setFind(null)} onAccept={onSetChannel} />
      }
    </>
  )
}
