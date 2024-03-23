import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { useState, useEffect } from "react";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/Breadcrumbs";
import Btn from "@/components/Btn";
import { ChzzkChat } from "chzzk";
import { ViewerType } from "@/lib/types";
import Chat from "@/components/Chat";

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

const BtnFrame = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Subscribe = styled.a<{$active: boolean}>`
  position: absolute;
  font: 600 20px/1 var(--font-default);

  opacity: ${props => props.$active ? '1' : '0.2'};
`

const BeforeSubscribe = styled(Subscribe)`
  bottom: -60px;
  cursor: pointer;

  &:hover {
    opacity: ${props => props.$active ? '1' : '0.5'};
  }
`

const OpenSubscribe = styled(Subscribe)`
  left: 300px;
  width: 220px;
`

const SubscribeIcon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`

const ViewersFrame = styled.div`
  width: 100%;
  max-width: 1000px;
`

const Viewers = styled.div`
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 20px;
  border: 1px solid var(--color-stroke-01);
  border-radius: 8px;
  animation: viewers .2s;
  overflow-y: auto;
`

const Viewer = styled.a`
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid var(--color-stroke-01);
  border-radius: 4px;
  font: 600 14px/1 var(--font-default);
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  animation: appearUp .2s;

  &:hover {
    background-color: var(--color-white-10);
  }
`

const ViewerBadge = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 4px;
  vertical-align: middle;
`

const ViewersBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 20px;
  animation: appearUp .2s;
`

const ViewerBottomText = styled.p`
  font: 800 20px/1 var(--font-default);


export default function Home() {

  const { channel } = useGlobalOptionStore()
  const router = useRouter()

  const [ state, setState ] = useState('before')
  const [ subscribe, setSubscribe ] = useState<boolean>(false)
  const [ viewers, setViewers ] = useState<ViewerType[]>([])
  const [ chat, setChat ] = useState<null | ViewerType>(null)

  useEffect(() => {
    if(channel.channelId === ''){
      router.push('/')
    }
  }, [])

  const updateViewers = (list: ViewerType[], newChat: ViewerType) => {
    if(list.find(e => e.userIdHash === newChat.userIdHash)) return Array.from(list)
    
    return Array.from([...list, newChat])
  }

  useEffect(() => {

    if(state !== 'open') return

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

    client.on('chat', (chat) => {

      //console.log(chat)

      const profile = chat.profile

      if(subscribe && !profile.streamingProperty.subscription) return

      let thisUser: ViewerType = {
        userIdHash: profile.userIdHash,
        badges: [],
        nickname: profile.nickname
      }

      if(profile.badge){
        thisUser.badges.push(profile.badge.imageUrl)
      }

      if(profile.streamingProperty.subscription){
        thisUser.badges.push(profile.streamingProperty.subscription.badge.imageUrl)
      }

      for(let e of profile.activityBadges){
        thisUser.badges.push(e.imageUrl)
      }

      setViewers(prev => updateViewers(prev, thisUser))

    })

    client.connect()

    return () => { 
      client.disconnect()
    }

  }, [state])

  const onReset = () => {
    setState('before')
    setSubscribe(false)
    setViewers([])
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
        <Breadcrumbs icon="users" text="시청자 추첨" href="/viewer" />
        {
          state === 'before' && <BtnFrame>
          <Btn
            $type="default"
            $width={260}
            onClick={() => setState('open')}
          >참여자 모집 시작</Btn>
          <BeforeSubscribe $active={subscribe} onClick={() => setSubscribe(prev => !prev)}>
            <SubscribeIcon className="fa-sharp fa-solid fa-check" />구독자만 모집하기
          </BeforeSubscribe>
        </BtnFrame>
        }
        {
          state === 'open' && <>
          <BtnFrame>
            <Btn
              $type="default"
              $width={260}
              onClick={() => setState('closed')}
            >참여자 모집 종료</Btn>
            <OpenSubscribe $active={true}>
              { subscribe ? '구독자만 모집하는 중' : '모든 시청자 모집하는 중' }
            </OpenSubscribe>
          </BtnFrame>
        </>
        }
        {
          state === 'closed' && <>
          <BtnFrame>
            <Btn
              $type="line"
              $width={260}
              onClick={onReset}
            >참여자 다시 모집하기</Btn>
            <Btn
              $type="default"
              $width={260}
              onClick={() => {}}
            >추첨하기</Btn>
          </BtnFrame>
        </>
        }
        {
          state !== 'before' && <ViewersFrame>
            <Viewers>
              {
                viewers.map(e => 
                <Viewer
                  key={`viewer_${e.userIdHash}`}
                  onClick={() => setChat(e)}
                >
                  {
                    e.badges.map((e2, i2) => <ViewerBadge key={`viewer_${e.userIdHash}_badge_${i2}`} src={e2} />)
                  }
                  {e.nickname}
                </Viewer>
                )
              }
            </Viewers>
            <ViewersBottom>
              <ViewerBottomText>총 {viewers.length}명</ViewerBottomText>
              {
                state === 'open' && <ViewerBottomText>채팅창에 아무 말이나 입력하시면 참여됩니다!</ViewerBottomText>
              }
            </ViewersBottom>
          </ViewersFrame>
        }
        {
          chat !== null && <Chat viewer={chat} onClose={() => setChat(null)} />
        }
      </Frame>
    </>
  )
}
