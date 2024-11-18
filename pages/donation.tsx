import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from "@/lib/style";
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

  animation: appearUp 0.3s;

  @media ${device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

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
`;

const SetListNoneOverflow = styled(SetList)`
  overflow-y: hidden;
`;

const SetItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const SetNum = styled.p`
  font: 600 36px/1 var(--font-default);
  width: 120px;

  @media ${device.mobile} {
    font: 600 20px/1 var(--font-default);
    width: 70px;
  }
`;

const SetName = styled(Input)`
  flex: 1;
`;

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
`;

const SetBtn = styled(Btn)`
  height: 60px;

  @media ${device.mobile} {
    height: 48px;
  }
`;

const SetDeleteDummy = styled.div`
  width: 30px;

  @media ${device.mobile} {
    width: 21px;
  }
`;

const OpenTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
`;

const OpenTopText = styled.p`
  font: 800 40px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`;

const OpenList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  max-height: calc(100vh - 800px);
  overflow-y: auto;
  gap: 20px;

  @media ${device.mobile} {
    max-height: none;
    overflow-y: unset;
    gap: 20px;
  }
`;

const OpenItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 4px;
  }
`;

const OpenItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 1px;
  flex: 1;
`;

const OpenItemNum = styled.p`
  font: 800 20px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 12px/1 var(--font-default);
  }
`;

const OpenItemName = styled.p`
  font: 800 32px/1 var(--font-default);
  ${truncate}

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`;

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
`;

const OpenItemBarInner = styled.div<{ $width: string }>`
  height: 100%;
  width: ${(props) => props.$width}%;
  background-color: var(--color-brand);
  border-radius: 8px;
  overflow: hidden;

  transition: width 0.2s;
`;

const OpenItemBarNum = styled.p`
  width: 300px;
  padding: 14px;
  font: 800 32px/1 var(--font-default);
  color: var(--color-black);
`;

const OpenItemBarNumPercentage = styled.span`
  font-size: 20px;
  margin-left: 10px;
  color: var(--color-black);
`;

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
`;

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
`;

const HideView = styled.a<{ $active: boolean }>`
  position: absolute;
  font: 600 20px/1 var(--font-default);

  opacity: ${(props) => (props.$active ? "0.2" : "1")};

  width: 220px;
  left: 300px;
  animation: appear 0.3s;
  cursor: pointer;

  @media ${device.mobile} {
    position: relative;
    font: 600 14px/1 var(--font-default);
    left: 0px;
    text-align: center;
  }
`;

const HideViewIcon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`;

const DetailBackground = styled(PopupBackground)`
  gap: 20px;

  @media ${device.mobile} {
    padding: 0px 10px;
  }
`;

const DetailTop = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 1000px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const DetailTopText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  gap: 8px;
`;

const DetailTopNum = styled.p`
  font: 800 24px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 12px/1 var(--font-default);
  }
`;

const DetailTopName = styled.p`
  font: 800 48px/1 var(--font-default);
  ${truncate}

  @media ${device.mobile} {
    font: 800 24px/1 var(--font-default);
  }
`;

const DetailTopCount = styled.span`
  font: 800 32px/1 var(--font-default);
  margin-left: 20px;

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`;
const DetailTopPercentage = styled.span`
  font: 800 20px/1 var(--font-default);
  margin-left: 10px;
`;

const ViewersFrame = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Viewers = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 20px;
  border-radius: 8px;
  animation: viewers 0.5s;
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
`;

const Viewer = styled.a<{ $active: boolean }>`
  display: inline-block;
  padding: 12px 20px;
  border-radius: 4px;
  font: 600 14px/1 var(--font-default);
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  animation: appearUp 0.2s;
  opacity: ${(props) => (props.$active ? "1" : "0.3")};

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
`;

const ViewerBadge = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 2px;
  vertical-align: middle;
`;

const ViewersBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 20px;
  animation: appearUp 0.2s;
`;

const ViewerBottomText = styled.p`
  font: 800 20px/1 var(--font-default);

  @media ${device.mobile} {
    font: 600 14px/1 var(--font-default);
  }
`;

const OptionBtn = styled.button<{ $active: boolean }>`
  font: 600 20px/1 var(--font-default);
  cursor: pointer;
  background-color: transparent;
  border: 0px;

  .dark & {
    color: var(--color-white);
  }

  .light & {
    color: var(--color-black);
  }

  &:hover {
    opacity: ${(props) => (props.$active ? "1" : "0.5")};
  }

  opacity: ${(props) => (props.$active ? "1" : "0.2")};

  @media ${device.mobile} {
    position: relative;
    font: 600 14px/1 var(--font-default);
  }
`;

const OptionBtnIcon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`;

const ViewersOptionBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
  justify-content: flex-end;
`;

const Description = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  gap: 20px;
  border: 1px solid var(--color-stroke-02);
  border-radius: 8px;

  @media ${device.mobile} {
    padding-bottom: 50px;
  }

  .dark & {
    border: 1px solid var(--color-stroke-02);
  }

  .light & {
    border: 1px solid var(--color-stroke-light-02);
  }
`;

const DescriptionTitle = styled.p`
  font: 800 24px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 18px/1 var(--font-default);
  }
`;

const DescriptionList = styled.ul`
  font: 600 18px/1.5 var(--font-default);
  margin-left: 20px;

  @media ${device.mobile} {
    font: 600 12px/1.5 var(--font-default);
  }
`;

const DB = styled.span`
  font-weight: 800;
  .dark & {
    color: var(--color-brand);
  }

  .light & {
    color: var(--color-brand-light);
  }
`;

const DescriptionButton = styled.button`
  display: flex;
  position: absolute;
  align-items: center;
  gap: 10px;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 4px;
  font: 600 18px/1 var(--font-default);
  cursor: pointer;
  background-color: transparent;
  border: 0px;

  .dark & {
    color: var(--color-white);
  }

  .light & {
    color: var(--color-black);
  }

  &:hover {
    .dark & {
      background-color: var(--color-white-10);
    }

    .light & {
      background-color: var(--color-black-10);
    }
  }

  @media ${device.mobile} {
    font: 600 12px/1 var(--font-default);
  }
`;

const convertSecondsToHMS = (seconds: number): string => {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 시, 분, 초를 두 자리 숫자 형식으로 변환
  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

function extractVoteNumber(input: string) {
  // '!투표'로 시작하는지 확인
  if (!input.startsWith("!투표")) {
    return null;
  }

  // 정규표현식을 사용하여 '!투표' 뒤의 숫자를 추출
  const match = input.match(/^!투표\s*(\d+)/);

  // 매칭되는 숫자가 있으면 숫자를 반환, 없으면 null 반환
  return match ? parseInt(match[1]) : null;
}

type SlotType = {
  viewers: ViewerType[];
  target: null | number;
};

export default function Home() {
  const { channel } = useGlobalOptionStore();
  const router = useRouter();

  const [list, setList] = useState<string[]>(["", ""]);
  const [vote, setVote] = useState<ViewerType[][]>([[], []]);
  const [state, setState] = useState("before");
  const [time, setTime] = useState<number>(0);
  const [view, setView] = useState(true);
  const [detail, setDetail] = useState<null | number>(null);
  const [chat, setChat] = useState<null | ViewerType>(null);
  const [slot, setSlot] = useState<SlotType>({
    viewers: [],
    target: null,
  });
  const [option, setOption] = useState({
    subscribe: false,
    duplicate: false,
  });
  const [drawn, setDrawn] = useState<string[]>([]);
  const [donationOption, setDonationOption] = useState({
    price: 1000,
    plural: false,
    description: true,
  });

  const addList = () => {
    setList(Array.from([...list, ""]));
    setVote(Array.from([...vote, []]));
  };

  const setListValue = (number: number, value: string) => {
    if (number >= list.length) return;

    let tempList = deepCopy(list);
    tempList[number] = value;

    setList(tempList);
  };

  const deleteList = (number: number) => {
    if (number >= list.length) return;

    let tempList = deepCopy(list);
    tempList.splice(number, 1);
    let tempVote = deepCopy(vote);
    tempVote.splice(number, 1);

    setList(tempList);
    setVote(tempVote);
  };

  const updateVote = (
    prev: ViewerType[][],
    thisUser: ViewerType,
    number: number,
    price: number
  ): ViewerType[][] => {
    if (donationOption.price > price) return prev;

    if (donationOption.plural) {
      //복수투표일 경우 (기존 투표를 지우지 않음)
      const newVote = deepCopy(prev);
      const count = Math.floor(price / donationOption.price);

      for (let i = 0; i < count; i++) {
        newVote[number].push(thisUser);
      }

      return newVote;
    }

    //복수투표가 아닐 경우 (기존 투표를 지움)
    const newVote = prev.map((group) =>
      group.filter((user) => user.userIdHash !== thisUser.userIdHash)
    );

    if (number >= 0 && number < newVote.length) {
      newVote[number].push(thisUser);
    } else {
      return prev;
    }

    return newVote;
  };

  useEffect(() => {
    if (state !== "open") return;

    const options = {
      channelId: channel.channelId,
      pollInterval: 30 * 1000,
      baseUrls: {
        chzzkBaseUrl: "/api/proxy/chzzkBase",
        gameBaseUrl: "/api/proxy/gameBase",
      },
    };

    const client = new ChzzkChat(options);

    client.on("connect", () => {
      console.log("[chzzk] Chat Connected");
    });

    client.on("donation", (chat) => {
      if (!chat.message.startsWith("!투표")) return;

      let onlyNumber = extractVoteNumber(chat.message);

      if (!onlyNumber) return;
      onlyNumber--;

      console.log(chat);
      const profile = chat.profile;
      const price = chat.extras.payAmount;

      if (!profile) return;

      let thisUser: ViewerType = {
        userIdHash: profile.userIdHash,
        badges: [],
        nickname: profile.nickname,
        subscribe: profile.streamingProperty.subscription ? true : false,
      };

      if (profile.badge) {
        thisUser.badges.push(profile.badge.imageUrl);
      }

      if (profile.streamingProperty.subscription) {
        thisUser.badges.push(
          profile.streamingProperty.subscription.badge.imageUrl
        );
      }

      for (let e of profile.activityBadges) {
        thisUser.badges.push(e.imageUrl);
      }

      setVote((prev) => updateVote(prev, thisUser, onlyNumber, price));
    });

    client.connect();

    setTime(0);
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);

    return () => {
      client.disconnect();
      clearInterval(interval);
    };
  }, [state]);

  const countAllVotes = () => {
    return vote.reduce((total, currentGroup) => total + currentGroup.length, 0);
  };

  const getVotePercentage = (number: number) => {
    if (vote.length <= number) return "0";
    if (vote[number].length === 0) return "0";
    return ((vote[number].length / countAllVotes()) * 100).toFixed(2);
  };

  const onReset = () => {
    setVote(Array.from({ length: list.length }, () => []));
    setState("before");
    setTime(0);
    setView(true);
    setOption({
      subscribe: false,
      duplicate: false,
    });
    setDrawn([]);
  };

  const onSlot = (number: number) => {
    if (vote.length <= number) return;

    const slotList = vote[number].filter(
      (e) =>
        (option.subscribe ? e.subscribe : true) &&
        (option.duplicate ? !drawn.includes(e.userIdHash) : true)
    );

    if (slotList.length === 0) {
      alert("최소 한 명 이상의 참여자가 필요합니다!");
      return;
    }

    const RandomIndex = Math.floor(Math.random() * slotList.length);

    const getFromViewers = vote[number].findIndex(
      (e) => e.userIdHash === slotList[RandomIndex].userIdHash
    );
    if (getFromViewers === -1) return;

    setSlot({
      viewers: vote[number],
      target: getFromViewers,
    });
    setDrawn((prev) =>
      prev.includes(vote[number][getFromViewers].userIdHash)
        ? prev
        : [...prev, vote[number][getFromViewers].userIdHash]
    );
  };

  const onOpen = () => {
    if (donationOption.price < 1) {
      alert("도네 금액은 반드시 1원 이상으로 설정되어야 합니다!");
      return;
    }
    setState("open");
  };

  return (
    <>
      <Head>
        <title>CHZZK VOTE - 치지직 투표 추첨기</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Frame>
        <Breadcrumbs icon="cheese-swiss" text="도네 투표" href="/donation" />
        {state === "before" && (
          <>
            <SetListNoneOverflow>
              <SetItem>
                <SetNum>금액</SetNum>
                <SetName
                  type="number"
                  placeholder="1000"
                  value={donationOption.price.toString()}
                  step={1}
                  onChange={(event) => {
                    setDonationOption((prev) => ({
                      ...prev,
                      price: parseInt(event.target.value),
                    }));
                  }}
                />
                <SetDeleteDummy />
              </SetItem>
              <SetItem>
                <SetNum />
                <OptionBtn
                  $active={donationOption.plural}
                  onClick={() => {
                    setDonationOption((prev) => ({
                      ...prev,
                      plural: !prev.plural,
                    }));
                  }}
                >
                  <OptionBtnIcon className="fa-sharp fa-solid fa-check" />
                  복수투표 허용 (금액만큼 배수 투표됩니다)
                </OptionBtn>
                <SetDeleteDummy />
              </SetItem>
            </SetListNoneOverflow>
            <SetList>
              {list.map((e, i) => (
                <SetItem key={`list_${i}`}>
                  <SetNum>항목 {i + 1}</SetNum>
                  <SetName
                    placeholder="투표 이름"
                    value={e}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setListValue(i, event.target.value)
                    }
                  />
                  <SetDelete
                    className="fa-sharp fa-solid fa-xmark"
                    onClick={() => deleteList(i)}
                  />
                </SetItem>
              ))}
              <SetItem>
                <SetNum />
                <SetBtn $type="line" style={{ flex: 1 }} onClick={addList}>
                  항목 추가
                </SetBtn>
                <SetDeleteDummy />
              </SetItem>
            </SetList>
            <Btn $type="default" $width={260} onClick={onOpen}>
              투표 시작
            </Btn>
          </>
        )}
        {state === "open" && (
          <>
            <OpenTop>
              <OpenTopText>총 {countAllVotes()}표</OpenTopText>
              <OpenTopText>{convertSecondsToHMS(time)}</OpenTopText>
            </OpenTop>
            <Description>
              <DescriptionTitle>
                투표금액 {donationOption.price}원 / 복수투표{" "}
                {donationOption.plural ? "허용됨" : "허용 안됨"}
              </DescriptionTitle>
              {donationOption.description ? (
                <DescriptionList>
                  <li>
                    복수투표가{" "}
                    {donationOption.plural
                      ? "허용되었습니다"
                      : "허용되지 않았습니다"}
                    {donationOption.plural ? (
                      <DescriptionList>
                        <li>
                          {donationOption.price}원 - 1표 /{" "}
                          {donationOption.price * 2}원 - 2표 /{" "}
                          {donationOption.price * 3}원 - 3표 /{" "}
                          {donationOption.price * 4}원 - 4표 ... 와 같이 금액에
                          따라 복수로 투표됩니다
                        </li>
                        <li>
                          남는 금액은 내림으로 계산되며, 버려진 금액은 다음 도네
                          {` `}
                          금액와 합산되지 않습니다
                        </li>
                        <li>
                          추가 도네 시 기존 투표는 유지되며, 복수로 추가로{` `}
                          투표됩니다
                        </li>
                      </DescriptionList>
                    ) : (
                      <DescriptionList>
                        <li>
                          얼마를 투표하던 투표 수 하나로 고정됩니다 (최소 투표
                          금액을 넘지 않을 경우 투표되지 않습니다)
                        </li>
                        <li>
                          추가 도네 시 해당 투표자의 기존 투표를 지우고 새로운
                          투표로 취급됩니다
                        </li>
                      </DescriptionList>
                    )}
                  </li>
                  <li>
                    도네 시 반드시 <DB>메시지 가장 앞</DB>에 <DB>'!투표1'</DB>{" "}
                    혹은 <DB>'!투표 1'</DB>과 같이 입력해주세요
                  </li>
                  <li>
                    <DB>익명 도네 시 투표가 들어가지 않습니다. 주의하세요!</DB>
                  </li>
                </DescriptionList>
              ) : null}
              <DescriptionButton
                onClick={() => {
                  setDonationOption((prev) => ({
                    ...prev,
                    description: !prev.description,
                  }));
                }}
              >
                {donationOption.description ? (
                  <>
                    안내사항 접기
                    <i className="fa-sharp fa-solid fa-chevron-up" />
                  </>
                ) : (
                  <>
                    안내사항 열기
                    <i className="fa-sharp fa-solid fa-chevron-down" />
                  </>
                )}
              </DescriptionButton>
            </Description>
            <OpenList>
              {list.map((e, i) => (
                <OpenItem key={`list_open_${i}`}>
                  <OpenItemText>
                    <OpenItemNum>!투표{i + 1}</OpenItemNum>
                    <OpenItemName>{e}</OpenItemName>
                  </OpenItemText>
                  <OpenItemBar onClick={() => setDetail(i)}>
                    {view ? (
                      <OpenItemBarInner $width={getVotePercentage(i)}>
                        <OpenItemBarNum>
                          {vote[i].length}표
                          <OpenItemBarNumPercentage>
                            {getVotePercentage(i)}%
                          </OpenItemBarNumPercentage>
                        </OpenItemBarNum>
                      </OpenItemBarInner>
                    ) : (
                      <OpenItemBarHidden>
                        투표 내용이 가려졌습니다
                      </OpenItemBarHidden>
                    )}
                  </OpenItemBar>
                </OpenItem>
              ))}
            </OpenList>
            <BtnFrame>
              <Btn
                $type="default"
                $width={260}
                onClick={() => setState("closed")}
              >
                투표 종료
              </Btn>
              <HideView $active={view} onClick={() => setView((prev) => !prev)}>
                <HideViewIcon className="fa-sharp fa-solid fa-check" />
                투표 내용 가리기
              </HideView>
            </BtnFrame>
          </>
        )}
        {state === "closed" && (
          <>
            <OpenTop>
              <OpenTopText>총 {countAllVotes()}표</OpenTopText>
              <OpenTopText>{convertSecondsToHMS(time)}</OpenTopText>
            </OpenTop>
            <OpenList>
              {list.map((e, i) => (
                <OpenItem key={`list_closed_${i}`}>
                  <OpenItemText>
                    <OpenItemNum>!투표{i + 1}</OpenItemNum>
                    <OpenItemName>{e}</OpenItemName>
                  </OpenItemText>
                  <OpenItemBar onClick={() => setDetail(i)}>
                    <OpenItemBarInner $width={getVotePercentage(i)}>
                      <OpenItemBarNum>
                        {vote[i].length}표
                        <OpenItemBarNumPercentage>
                          {getVotePercentage(i)}%
                        </OpenItemBarNumPercentage>
                      </OpenItemBarNum>
                    </OpenItemBarInner>
                  </OpenItemBar>
                </OpenItem>
              ))}
            </OpenList>
            <BtnFrame>
              <Btn $type="default" $width={260} onClick={onReset}>
                투표 다시 시작하기
              </Btn>
            </BtnFrame>
          </>
        )}
        {detail !== null && (
          <DetailBackground>
            <DetailTop>
              <DetailTopText>
                <DetailTopNum>!투표{detail + 1}</DetailTopNum>
                <DetailTopName>
                  {list[detail]}
                  <DetailTopCount>{vote[detail].length}표</DetailTopCount>
                  <DetailTopPercentage>
                    ({getVotePercentage(detail)}%)
                  </DetailTopPercentage>
                </DetailTopName>
              </DetailTopText>
              <Btn $type="line" $width={200} onClick={() => setDetail(null)}>
                목록으로
              </Btn>
              <Btn $type="default" $width={260} onClick={() => onSlot(detail)}>
                추첨하기
              </Btn>
            </DetailTop>
            <ViewersOptionBtns>
              <OptionBtn
                $active={option.subscribe}
                onClick={() =>
                  setOption((prev) => ({ ...prev, subscribe: !prev.subscribe }))
                }
              >
                <OptionBtnIcon className="fa-sharp fa-solid fa-check" />
                구독자만 추첨하기
              </OptionBtn>
              <OptionBtn
                $active={option.duplicate}
                onClick={() =>
                  setOption((prev) => ({ ...prev, duplicate: !prev.duplicate }))
                }
              >
                <OptionBtnIcon className="fa-sharp fa-solid fa-check" />
                이미 뽑힌 참여자 제외하기
              </OptionBtn>
            </ViewersOptionBtns>
            <ViewersFrame>
              <Viewers>
                {vote[detail].map((e) => (
                  <Viewer
                    key={`viewer_${e.userIdHash}`}
                    $active={
                      (option.subscribe ? e.subscribe : true) &&
                      (option.duplicate ? !drawn.includes(e.userIdHash) : true)
                    }
                    onClick={() => setChat(e)}
                  >
                    {e.badges.map((e2, i2) => (
                      <ViewerBadge
                        key={`viewer_${e.userIdHash}_badge_${i2}`}
                        src={e2}
                      />
                    ))}
                    {e.nickname}
                  </Viewer>
                ))}
              </Viewers>
              <ViewersBottom>
                <ViewerBottomText>총 {vote[detail].length}명</ViewerBottomText>
              </ViewersBottom>
            </ViewersFrame>
          </DetailBackground>
        )}
        {slot.viewers.length !== 0 && slot.target !== null ? (
          <ChatSlot
            viewers={slot.viewers}
            target={slot.target}
            onClose={() => setSlot({ viewers: [], target: null })}
          />
        ) : (
          <></>
        )}
        {chat !== null && <Chat viewer={chat} onClose={() => setChat(null)} />}
      </Frame>
    </>
  );
}
