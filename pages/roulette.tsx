import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/Input";
import Btn from "@/components/Btn";
import deepCopy from "@/lib/deepcopy";
import dynamic from "next/dynamic";
import ConfettiExplosion from "react-confetti-explosion";
const Wheel = dynamic(() => 
  import('react-custom-roulette').then<
  typeof import('react-custom-roulette').Wheel
  >((mod) => mod.Wheel), {
    ssr: false, // 서버 사이드 렌더링 비활성화
  }
);

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
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`

const SetSize = styled(Input)`
  width: 100px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`

const ViewSize = styled.p`
  font: 400 20px/1 var(--font-default);
  width: 80px;
`

const SetDelete = styled.i`
  font-size: 40px;
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

const WheelFrame = styled.div<{ $size: number }>`

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    width: ${({ $size }) => `${$size}px`};
    height: ${({ $size }) => `${$size}px`};
    max-width: calc(100vw - 800px);
    max-height: calc(100vh - 300px);
    aspect-ratio: 1 / 1;

    @media ${device.tablet} {
      max-width: 100%;
      max-height: 100%;
    }
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

const EndFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  bottom: 120px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  font: 800 4vw/1 var(--font-default);
  color: var(--color-white);
  text-shadow: 0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black),
               0 0 5px var(--color-black);
  z-index: 10;
  transform: translateZ(1);
  pointer-events: none;
  animation: appearUp .2s;
`

const backgroundColors = [
  '#3f297e',
  '#175fa9',
  '#169ed8',
  '#239b63',
  '#64b031',
  '#efe61f',
  '#f7a416',
  '#e6471d',
  '#dc0936',
  '#e5177b',
  '#be1180',
  '#871f7f',
]

type RouletteType = {
  name: string,
  size: number | null
}

type OptionItem = {
  option: string;
  optionSize: number;
  style: {
    backgroundColor: string;
  };
};

export default function Home() {

  const [ state, setState ] = useState('before')
  const [ list, setList ] = useState<RouletteType[]>([
    { name: '', size: 1 },
    { name: '', size: 1 },
  ])
  const [mustSpin, setMustSpin] = useState(false);
  const [target, setTarget] = useState(0);
  const [end, setEnd] = useState<null | string>(null);

  const changeName = (number: number, value: string) => {
    if(list.length <= number) return ''
    let tempList = deepCopy(list)

    tempList[number].name = value

    setList(tempList)
  }

  const changeNumber = (number: number, value: string) => {
    if(list.length <= number) return ''
    let tempList = deepCopy(list)

    if(value === '') tempList[number].size = null
    else tempList[number].size = parseInt(value)

    setList(tempList)
  }

  const getAllSize = () => {
    return list.reduce((total, currentList) => currentList.size ? total + currentList.size : total, 0)
  }

  const addList = () => {
    setList(Array.from([...list, { name: '', size: 1 }]))
  }

  const deleteList = (number: number) => {
    if(number >= list.length) return

    let tempList = deepCopy(list)
    tempList.splice(number, 1)

    setList(tempList)
  }

  const onOpen = () => {

    if(list.length < 2){
      alert('최소 두개 이상의 항목이 있어야 합니다')
      return
    }

    if(!list.every(e => e.size !== null)){
      alert('모든 항목에는 확률이 설정되어야 합니다')
      return
    }

    setState('open')
  }
  
  const getRandomItemIndex = (): number => {
    const totalSize = getAllSize();
    let randomNum = Math.random() * totalSize;
    
    for (let i = 0; i < list.length; i++) {
      randomNum -= list[i].size!;
      if (randomNum < 0) return i;
    }
  
    // 마지막 인덱스를 반환, 이 경우에는 일반적으로 발생하지 않음
    return list.length - 1;
  };

  const onSpin = () => {

    if(end !== null) return

    const getRandom = getRandomItemIndex()
    setTarget(getRandom)
    setMustSpin(true)

    setTimeout(() => {
      setEnd(list[getRandom].name)
    }, 6000)
    setTimeout(() => {
      setEnd(null)
    }, 10000)

  }

  const [boxSize, setBoxSize] = useState<number>(0);

  const updateSize = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let size: number;

    if (vw <= 800) {
      size = vw - 100; // 800px 이하일 경우
    } else if (vw <= 1300) {
      size = vw - 500; // 1300px 이하일 경우
    } else {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const maxWidth = vw - 800;
      const maxHeight = vh - 500;
      size = Math.min(maxWidth, maxHeight, vw - 200); // 기본 조건
    }

    setBoxSize(size);
  };

  useEffect(() => {

    if(state !== 'open') return
    if (typeof window === 'undefined') return;

    window.addEventListener('resize', updateSize);
    updateSize(); // 초기 사이즈 설정

    return () => { window.removeEventListener('resize', updateSize) }
  }, [state]);

  const onReset = () => {
    setState('before')
    setMustSpin(false)
    setTarget(0)
    setEnd(null)
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
        <Breadcrumbs icon="slot-machine" text="룰렛" href="/roulette" />
        {
          state === 'before' &&
          <>
          <SetList>
            {
              list.map((e,i) => 
              <SetItem key={`list_${i}`}>
                <SetNum>항목 {i + 1}</SetNum>
                <SetName placeholder="항목 이름" value={e.name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeName(i, event.target.value)} />
                <SetSize placeholder="확률" value={e.size ? e.size : ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeNumber(i, event.target.value)} />
                <ViewSize>{e.size ? (e.size / getAllSize() * 100).toFixed(2) : '0'}%</ViewSize>
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
            onClick={onOpen}
          >룰렛 시작</Btn>
          </>
        }
        {
          state === 'open' &&
          <>
            <WheelFrame $size={boxSize}>
              <Wheel
                mustStartSpinning={mustSpin}
                spinDuration={0.5}
                prizeNumber={target}
                data={
                  list.map((item, index) => ({
                  option: item.name,
                  optionSize: item.size ?? 1, // size가 null일 경우 1로 설정
                  style: {
                    backgroundColor: backgroundColors[index % backgroundColors.length] // 순환 방식으로 색상 할당
                  }
                  }))
                }
                outerBorderColor={"#ccc"}
                outerBorderWidth={10}
                radiusLineColor={"tranparent"}
                textColors={["#f5f5f5"]}
                textDistance={50}
                onStopSpinning={() => {
                  setMustSpin(false);
                }}
              />
            </WheelFrame>
            <BtnFrame>
              <Btn
                $type="line"
                $width={200}
                onClick={onReset}
              >돌아가기</Btn>
              <Btn
                $type="default"
                $width={260}
                onClick={onSpin}
              >돌려!</Btn>
            </BtnFrame>
          </>
        }
        {
          end && <EndFrame>
            <ConfettiExplosion force={0.5} width={2000} zIndex={10} />
            {end}
          </EndFrame>
        }
      </Frame>
    </>
  )
}
