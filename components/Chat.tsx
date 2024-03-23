import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { PopupBackground } from "@/components/Popup";
import Btn from "@/components/Btn";
import { ViewerType } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChzzkChat } from "chzzk";
import { useGlobalOptionStore } from "@/lib/zustand";
import getVoices from "@/lib/getVoices";

const Background = styled(PopupBackground)`
  gap: 20px;
`

const Viewer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-width: 1px;
  height: 100px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--color-background-01);
  border-top: 1px solid var(--color-stroke-01);
  border-bottom: 1px solid var(--color-stroke-01);
`

const ViewerBadge = styled.img`
  width: 40px;
  height: 40px;
`

const ViewerName = styled.p`
  font: 800 40px/1 var(--font-default);

  ${truncate}

`

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 30px;
  background-color: var(--color-background-01);
  border: 1px solid var(--color-stroke-01);
  border-radius: 8px;
  animation: viewers .5s;
  overflow-y: auto;
`

const Balloon = styled.p`
  display: inline-block;
  padding: 20px 14px;
  font: 600 20px/1 var(--font-default);
  border-radius: 8px;
  border-top-left-radius: 0px;
  background-color: var(--color-brand);
  color: var(--color-black);
  animation: appearUp .2s;
`

const ChatBottom = styled.div``

type ChatType = {
  viewer: ViewerType,
  onClose: () => void
}

const Chat = (props: ChatType) => {

  const { viewer, onClose } = props
  const [ chat, setChat ] = useState<string[]>([])
  const { channel, voice } = useGlobalOptionStore()

  const getVoice = async () => {
    const voices = await getVoices()
    const filter = voices.filter(voice => voice.lang === 'ko-KR')
    const findSettedVoice = filter.find(e => e.name === voice)
    
    if(findSettedVoice) return findSettedVoice
    return voices[0] 
  }
  
  useEffect(() => {
    
    const options = {
      channelId: channel.channelId,
      pollInterval: 30 * 1000,
      baseUrls: {
        chzzkBaseUrl: '/api/proxy/chzzkBase',
        gameBaseUrl: '/api/proxy/gameBase'
      }
    }

    const client = new ChzzkChat(options)

    client.on('connect', () => {
      console.log('[chzzk] Chat Connected')
    })

    client.on('chat', async (chat) => {

      //console.log(chat)
      if(chat.profile.userIdHash !== viewer.userIdHash) return
      
      const utterance = new SpeechSynthesisUtterance(chat.message);
      utterance.voice = await getVoice()

      window.speechSynthesis.speak(utterance);
      setChat( prev => ([...prev, chat.message]))

    })

    client.connect()

    return () => { 
      setTimeout(() => {
        client.disconnect()
      }, 100)
    }

  }, [])

  useEffect(() => {
    document.querySelector('#chatBottom')?.scrollIntoView({
      behavior: 'smooth'
    })
  },[chat])

  return <Background>
    <Viewer>
      {
        viewer.badges.map((e, i) => 
        <ViewerBadge key={`chat_badge_${i}`} src={e} />
        )
      }
      <ViewerName>{viewer.nickname}</ViewerName>
    </Viewer>
    <ChatBox>
      {
        chat.map((e, i) => 
        <Balloon key={`chat_balloon_${i}`}>
          {e}
        </Balloon>
        )
      }
      <ChatBottom id="chatBottom" />
    </ChatBox>
    <Btn
      $type="line"
      $width={200}
      onClick={onClose}
    >닫기</Btn>
  </Background>
}

export default Chat