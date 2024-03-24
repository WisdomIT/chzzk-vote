import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { PopupBackground } from "@/components/Popup";
import Btn from "@/components/Btn";
import { ViewerType } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChzzkChat } from "chzzk";
import { useGlobalOptionStore } from "@/lib/zustand";
import Slot from "./Slot";
import getVoices from "@/lib/getVoices";
import ConfettiExplosion from 'react-confetti-explosion';

const Background = styled(PopupBackground)`
  gap: 0px;
`

const SlotItem = styled.div`
  display: flex;
  gap: 10px;
`

const SlotBadge = styled.img`
  width: 60px;
  height: 60px;
`

const SlotName = styled.p`
  font: 800 60px/1 var(--font-default);
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

  .dark & {
    background-color: var(--color-background-01);
    border-top: 1px solid var(--color-stroke-01);
    border-bottom: 1px solid var(--color-stroke-01);
  }

  .light & {
    background-color: var(--color-white);
    border-top: 1px solid var(--color-stroke-light-01);
    border-bottom: 1px solid var(--color-stroke-light-01);
  }

  animation: slotViewerDiv .3s;
`

const ViewerBadge = styled.img`
  width: 40px;
  height: 40px;

  animation: slotViewerBadge .3s;
`

const ViewerName = styled.p`
  font: 800 40px/1 var(--font-default);
  ${truncate}

  animation: slotViewerName .3s;
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
  border-radius: 8px;
  animation: chatbox .5s;
  overflow-y: auto;
  margin-top: 20px;
  margin-bottom: 40px;

  .dark & {
    background-color: var(--color-background-01);
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
    background-color: var(--color-white);
    border: 1px solid var(--color-stroke-light-01);
  }
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

const ConfettiFrame = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
`

type ChatType = {
  viewers: ViewerType[],
  target: number,
  onClose: () => void
}

const ChatSlot = (props: ChatType) => {

  const { viewers, target, onClose } = props
  const [ state, setState ] = useState(false)
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

    if(!state) return
    if(viewers.length <= target) return

    const viewer = viewers[target]
    
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
      }, 500)
    }

  }, [state])

  useEffect(() => {
    document.querySelector('#chatBottom')?.scrollIntoView({
      behavior: 'smooth'
    })
  },[chat])

  return <Background>
    {
      !state && <Slot data={viewers.map((e) => 
        <SlotItem key={`slot_${e.userIdHash}`}>
          {
            e.badges.map((e2,i2) => <SlotBadge key={`slot_${e.userIdHash}_badge_${i2}`} src={e2} />)
          }
          <SlotName>{e.nickname}</SlotName>
        </SlotItem>
        )}
        target={target}
        duration={3000}
        onEnd={() => setState(true)}
        />
    }
    {
      state && <>
      <ConfettiFrame>
        <ConfettiExplosion force={0.5} width={2000} />
        <ConfettiExplosion force={0.5} width={2000} />
      </ConfettiFrame>
      <Viewer>
        {
          viewers[target].badges.map((e, i) => 
          <ViewerBadge key={`chat_badge_${i}`} src={e} />
          )
        }
        <ViewerName>{viewers[target].nickname}</ViewerName>
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
        style={{animation: 'btnHeight .2s'}}
      >닫기</Btn>
      </>
    }
  </Background>
}

export default ChatSlot