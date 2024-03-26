import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/Input";
import Btn from "@/components/Btn";
import { ViewerType } from "@/lib/types";
import deepCopy from "@/lib/deepcopy";
import { ChzzkChat } from "chzzk";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useRouter } from "next/router";
import ChatSlot from "@/components/ChatSlot";
import { PopupBackground } from "@/components/Popup";
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

const SetList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  max-height: 440px;
  overflow-y: auto;
  gap: 20px;

  @media ${device.mobile} {
    max-height: none;
    overflow-y: unset;
    gap: 10px;
  }
`

const SetItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const SetNum = styled.p`
  font: 600 36px/1 var(--font-default);
  width: 120px;

  @media ${device.mobile} {
    font: 600 20px/1 var(--font-default);
    width: 70px;
  }
`

const SetName = styled(Input)`
  flex: 1;
`

const SetDelete = styled.i`
  font-size: 40px;
  color: var(--color-white-20);
  cursor: pointer;

  .dark & {
    color: var(--color-white-20);
  }

  .light & {
    color: var(--color-black-20);
  }
  
  &:hover {
    color: var(--color-red);
  }

  @media ${device.mobile} {
    font-size: 28px;
  }
`

const SetBtn = styled(Btn)`
  height: 60px;

  @media ${device.mobile} {
    height: 48px;
  }
`

const SetDeleteDummy = styled.div`
  width: 30px;

  @media ${device.mobile} {
    width: 21px;
  }
`

const OpenTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
`

const OpenTopText = styled.p`
  font: 800 40px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`

const OpenList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  gap: 20px;

  @media ${device.mobile} {
    max-height: none;
    overflow-y: unset;
    gap: 20px;
  }
`

const OpenItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  
  @media ${device.mobile} {
    flex-direction: column;
    gap: 4px;
  }
`

const OpenItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 1px;
  flex: 1;
`

const OpenItemNum = styled.p`
  font: 800 20px/1 var(--font-default);
  
  @media ${device.mobile} {
    font: 800 12px/1 var(--font-default);
  }
`

const OpenItemName = styled.p`
  font: 800 32px/1 var(--font-default);
  ${ truncate }
  
  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`

const OpenItemBar = styled.div`
  flex: 2;
  height: 60px;
  border-radius: 8px;
  cursor: pointer;

  .dark & {
    background-color: var(--color-background-02);
  }

  .light & {
    background-color: var(--color-black-20);
  }

  &:hover {
    opacity: 0.7;
  }
`

const OpenItemBarInner = styled.div<{$width: string}>`
  height: 100%;
  width: ${props => props.$width}%;
  background-color: var(--color-brand);
  border-radius: 8px;
  overflow: hidden;

  transition: width .2s;
`

const OpenItemBarNum = styled.p`
  width: 300px;
  padding: 14px;
  font: 800 32px/1 var(--font-default);
  color: var(--color-black);
`

const OpenItemBarNumPercentage = styled.span`
  font-size: 20px;
  margin-left: 10px;
  color: var(--color-black);
`

const OpenItemBarHidden = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font: 600 20px/1 var(--font-default);
  color: var(--color-white-50);

  .dark & {
    color: var(--color-white-50);
  }

  .light & {
    color: var(--color-black-30);
  }
`

const BtnFrame = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media ${device.mobile} {
    gap: 20px;
    flex-direction: column;
  }
`

const HideView = styled.a<{$active: boolean}>`
  position: absolute;
  font: 600 20px/1 var(--font-default);

  opacity: ${props => props.$active ? '0.2' : '1'};

  width: 220px;
  left: 300px;
  animation: appear .3s;
  cursor: pointer;

  @media ${device.mobile} {
    position: relative;
    font: 600 14px/1 var(--font-default);
  }
`

const HideViewIcon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`

const DetailBackground = styled(PopupBackground)`
  gap: 20px;

  @media ${device.mobile} {
    padding: 0px 10px;
  }
`

const DetailTop = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 1000px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`

const DetailTopText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  gap: 8px;
`

const DetailTopNum = styled.p`
  font: 800 24px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 12px/1 var(--font-default);
  }
`

const DetailTopName = styled.p`
  font: 800 48px/1 var(--font-default);
  ${truncate}

  @media ${device.mobile} {
    font: 800 24px/1 var(--font-default);
  }
`

const DetailTopCount = styled.span`
  font: 800 32px/1 var(--font-default);
  margin-left: 20px;

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`
const DetailTopPercentage = styled.span`
  font: 800 20px/1 var(--font-default);
  margin-left: 10px;
`

const ViewersFrame = styled.div`
  width: 100%;
  max-width: 1000px;
`

const Viewers = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 20px;
  border-radius: 8px;
  animation: viewers .5s;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 10px;

  .dark & {
    background-color: var(--color-background-01);
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
    background-color: var(--color-white);
    border: 1px solid var(--color-stroke-light-01);
  }
`

const Viewer = styled.a<{$active: boolean}>`
  display: inline-block;
  padding: 12px 20px;
  border-radius: 4px;
  font: 600 14px/1 var(--font-default);
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  animation: appearUp .2s;
  opacity: ${props => props.$active ? '1' : '0.3'};

  .dark & {
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
    border: 1px solid var(--color-stroke-light-01);
  }

  &:hover {
    .dark & {
      background-color: var(--color-white-10);
    }

    .light & {
      background-color: var(--color-black-10);
    }
  }

  &:last-child {
    margin-right: 0px;
  }
`

const ViewerBadge = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 2px;
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

  @media ${device.mobile} {
    font: 600 14px/1 var(--font-default);
  }
`

const OptionBtn = styled.a<{$active: boolean}>`
  font: 600 20px/1 var(--font-default);
  cursor: pointer;

  &:hover {
    opacity: ${props => props.$active ? '1' : '0.5'};
  }

  opacity: ${props => props.$active ? '1' : '0.2'};

  @media ${device.mobile} {
    position: relative;
    font: 600 14px/1 var(--font-default);
  }
`

const OptionBtnIcon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`

const ViewersOptionBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
  justify-content: flex-end;
`

const convertSecondsToHMS = (seconds: number): string => {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 시, 분, 초를 두 자리 숫자 형식으로 변환
  const formattedHours: string = hours.toString().padStart(2, '0');
  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

type SlotType = {
  viewers: ViewerType[],
  target: null | number
}

export default function Home() {

  const { channel } = useGlobalOptionStore()
  const router = useRouter()
  
  const [ list, setList ] = useState<string[]>(['',''])
  const [ vote, setVote ] = useState<ViewerType[][]>([[],[]])
  const [ state, setState ] = useState('before')
  const [ time, setTime ] = useState<number>(0)
  const [ view, setView ] = useState(true)
  const [ detail, setDetail ] = useState<null | number>(null)
  const [ chat, setChat ] = useState<null | ViewerType>(null)
  const [ slot, setSlot ] = useState<SlotType>({
    viewers: [],
    target: null
  })
  const [ option, setOption ] = useState({
    subscribe: false,
    duplicate: false
  })
  const [ drawn, setDrawn ] = useState<string[]>([])

  const addList = () => {
    setList(Array.from([...list, '']))
    setVote(Array.from([...vote, []]))
  }

  const setListValue = (number: number, value: string) => {
    if(number >= list.length) return

    let tempList = deepCopy(list)
    tempList[number] = value

    setList(tempList)
  }

  const deleteList = (number: number) => {
    if(number >= list.length) return

    let tempList = deepCopy(list)
    tempList.splice(number, 1)
    let tempVote = deepCopy(vote)
    tempVote.splice(number, 1)

    setList(tempList)
    setVote(tempVote)
  }

  const updateVote = (prev: ViewerType[][], thisUser: ViewerType, number: number): ViewerType[][] => {
    const newVote = prev.map(group => group.filter(user => user.userIdHash !== thisUser.userIdHash));

    if (number >= 0 && number < newVote.length) {
      newVote[number].push(thisUser);
    } else {
      return prev
    }

    return newVote;
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
      
      if(!chat.message.startsWith("!투표")) return
      
      const onlyNumber = chat.message.replace("!투표", "").replace(" ", "")
      let number = parseInt(onlyNumber)

      if(isNaN(number)) return
      number--

      const profile = chat.profile

      let thisUser: ViewerType = {
        userIdHash: profile.userIdHash,
        badges: [],
        nickname: profile.nickname,
        subscribe: profile.streamingProperty.subscription ? true : false
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

      setVote(prev => updateVote(prev, thisUser, number))

    })

    client.connect()

    setTime(0)
    const interval = setInterval(() => setTime(prev => prev + 1), 1000)

    return () => { 
      client.disconnect()
      clearInterval(interval)
    }

  }, [state])

  const countAllVotes = () => {
    return vote.reduce((total, currentGroup) => total + currentGroup.length, 0);
  }

  const getVotePercentage = (number: number) => {
    if(vote.length <= number) return '0'
    if(vote[number].length === 0) return '0'
    return ( ( vote[number].length / countAllVotes() ) * 100 ).toFixed(2)
  }

  const onReset = () => {
    setVote(Array.from({ length: list.length }, () => []))
    setState('before')
    setTime(0)
    setView(true)
    setOption({
      subscribe: false,
      duplicate: false
    })
    setDrawn([])
  }
  
  const onSlot = (number: number) => {

    if(vote.length <= number) return

    const slotList = vote[number].filter(e => (option.subscribe ? e.subscribe : true) && (option.duplicate ? !drawn.includes(e.userIdHash) : true))

    if(slotList.length === 0){
      alert('최소 한 명 이상의 참여자가 필요합니다!')
      return
    }

    const RandomIndex = Math.floor(Math.random() * slotList.length);
    
    const getFromViewers = vote[number].findIndex(e => e.userIdHash === slotList[RandomIndex].userIdHash)
    if(getFromViewers === -1) return

    setSlot({
      viewers: vote[number],
      target: getFromViewers
    })
    setDrawn(prev => prev.includes(vote[number][getFromViewers].userIdHash) ? prev : ([...prev, vote[number][getFromViewers].userIdHash]))

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
        <Breadcrumbs icon="check-to-slot" text="숫자 투표" href="/vote" />
        {
          state === 'before' &&
          <>
            <SetList>
              {
                list.map((e,i) => 
                <SetItem key={`list_${i}`}>
                  <SetNum>항목 {i + 1}</SetNum>
                  <SetName placeholder="투표 이름" value={e} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setListValue(i, event.target.value)} />
                  <SetDelete className="fa-sharp fa-solid fa-xmark" onClick={() => deleteList(i)} />
                </SetItem>
                )
              }
              <SetItem>
                <SetNum />
                <SetBtn
                  $type="line"
                  style={{flex: 1}}
                  onClick={addList}
                >항목 추가</SetBtn>
                <SetDeleteDummy />
              </SetItem>
            </SetList>
            <Btn
              $type="default"
              $width={260}
              onClick={() => setState('open')}
            >투표 시작</Btn>
          </>
        }
        {
          state === 'open' && <>
          <OpenTop>
            <OpenTopText>총 {countAllVotes()}표</OpenTopText>
            <OpenTopText>{convertSecondsToHMS(time)}</OpenTopText>
          </OpenTop>
          <OpenList>
            {
              list.map((e,i) => 
              <OpenItem key={`list_open_${i}`}>
                <OpenItemText>
                  <OpenItemNum>!투표{i+1}</OpenItemNum>
                  <OpenItemName>{e}</OpenItemName>
                </OpenItemText>
                <OpenItemBar onClick={() => setDetail(i)}>
                  {
                    view
                      ? <OpenItemBarInner $width={getVotePercentage(i)}>
                          <OpenItemBarNum>
                            {vote[i].length}표
                            <OpenItemBarNumPercentage>{getVotePercentage(i)}%</OpenItemBarNumPercentage>
                          </OpenItemBarNum>
                        </OpenItemBarInner>
                      : <OpenItemBarHidden>투표 내용이 가려졌습니다</OpenItemBarHidden>
                  }
                </OpenItemBar>
              </OpenItem>
              )
            }
          </OpenList>
          <BtnFrame>
            <Btn
              $type="default"
              $width={260}
              onClick={() => setState('closed')}
            >투표 종료</Btn>
            <HideView
              $active={view}
              onClick={() => setView(prev => !prev)}
            ><HideViewIcon className="fa-sharp fa-solid fa-check" />투표 내용 가리기</HideView>
          </BtnFrame>
          </>
        }
        {
          state === 'closed' && <>
          <OpenTop>
            <OpenTopText>총 {countAllVotes()}표</OpenTopText>
            <OpenTopText>{convertSecondsToHMS(time)}</OpenTopText>
          </OpenTop>
          <OpenList>
            {
              list.map((e,i) => 
              <OpenItem key={`list_closed_${i}`}>
                <OpenItemText>
                  <OpenItemNum>!투표{i+1}</OpenItemNum>
                  <OpenItemName>{e}</OpenItemName>
                </OpenItemText>
                <OpenItemBar onClick={() => setDetail(i)}>
                  <OpenItemBarInner $width={getVotePercentage(i)}>
                    <OpenItemBarNum>
                      {vote[i].length}표
                      <OpenItemBarNumPercentage>{getVotePercentage(i)}%</OpenItemBarNumPercentage>
                    </OpenItemBarNum>
                  </OpenItemBarInner>
                </OpenItemBar>
              </OpenItem>
              )
            }
          </OpenList>
          <BtnFrame>
            <Btn
              $type="default"
              $width={260}
              onClick={onReset}
            >투표 다시 시작하기</Btn>
          </BtnFrame>
          </>
        }
        {
          detail !== null && <DetailBackground>
          <DetailTop>
            <DetailTopText>
              <DetailTopNum>!투표{detail+1}</DetailTopNum>
              <DetailTopName>
                {list[detail]}
                <DetailTopCount>{vote[detail].length}표</DetailTopCount>
                <DetailTopPercentage>({getVotePercentage(detail)}%)</DetailTopPercentage>
              </DetailTopName>
            </DetailTopText>
            <Btn
              $type="line"
              $width={200}
              onClick={() => setDetail(null)}
            >목록으로</Btn>
            <Btn
              $type="default"
              $width={260}
              onClick={() => onSlot(detail)}
            >추첨하기</Btn>
          </DetailTop>
          <ViewersOptionBtns>
            <OptionBtn $active={option.subscribe} onClick={() => setOption(prev => ({...prev, subscribe: !prev.subscribe}))}>
              <OptionBtnIcon className="fa-sharp fa-solid fa-check" />
              구독자만 추첨하기
            </OptionBtn>
            <OptionBtn $active={option.duplicate} onClick={() => setOption(prev => ({...prev, duplicate: !prev.duplicate}))}>
              <OptionBtnIcon className="fa-sharp fa-solid fa-check" />
              이미 뽑힌 참여자 제외하기
            </OptionBtn>
          </ViewersOptionBtns>
          <ViewersFrame>
            <Viewers>
              {
                vote[detail].map(e => 
                <Viewer
                  key={`viewer_${e.userIdHash}`}
                  $active={ 
                    (option.subscribe ? e.subscribe : true) &&
                    (option.duplicate ? !drawn.includes(e.userIdHash) : true)
                  }
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
              <ViewerBottomText>총 {vote[detail].length}명</ViewerBottomText>
            </ViewersBottom>
          </ViewersFrame>
        </DetailBackground>
        }
        {
          slot.viewers.length !== 0 && slot.target !== null ?
            <ChatSlot viewers={slot.viewers} target={slot.target} onClose={() => setSlot({viewers:[], target:null})} />
            : <></>
        }
        {
          chat !== null && <Chat viewer={chat} onClose={() => setChat(null)} />
        }
      </Frame>
    </>
  )
}
