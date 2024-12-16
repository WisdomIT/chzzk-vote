import Head from "next/head";
import styled from "styled-components";
import { size, device, truncate } from "@/styles/style";
import { useState, useEffect } from "react";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/Breadcrumbs";
import Btn from "@/components/Btn";
import { ChzzkChat } from "chzzk";
import { ViewerType } from "@/lib/types";
import Chat from "@/components/Chat";
import ChatSlot from "@/components/ChatSlot";

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

const OptionBtn = styled.a<{ $active: boolean }>`
  font: 600 20px/1 var(--font-default);
  cursor: pointer;

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

const ClosedOptionBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: -20px 0px;
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
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
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

export default function Home() {
  const { channel } = useGlobalOptionStore();
  const router = useRouter();

  const [state, setState] = useState("before");
  const [viewers, setViewers] = useState<ViewerType[]>([]);
  const [option, setOption] = useState({
    subscribe: false,
    duplicate: false,
  });
  const [chat, setChat] = useState<null | ViewerType>(null);
  const [target, setTarget] = useState<null | number>(null);
  const [drawn, setDrawn] = useState<string[]>([]);

  useEffect(() => {
    if (channel.channelId === "") {
      router.push("/");
    }
  }, []);

  const updateViewers = (
    list: ViewerType[],
    newChat: ViewerType
  ): ViewerType[] => {
    if (list.find((e) => e.userIdHash === newChat.userIdHash))
      return Array.from(list);

    return Array.from([...list, newChat]);
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

    client.on("chat", (chat) => {
      //console.log(chat)

      const profile = chat.profile;

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

      setViewers((prev) => updateViewers(prev, thisUser));
    });

    client.connect();

    return () => {
      client.disconnect();
    };
  }, [state]);

  const onReset = () => {
    setState("before");
    setViewers([]);
    setOption({
      subscribe: false,
      duplicate: false,
    });
    setDrawn([]);
  };

  const onSlot = () => {
    const slotList = viewers.filter(
      (e) =>
        (option.subscribe ? e.subscribe : true) &&
        (option.duplicate ? !drawn.includes(e.userIdHash) : true)
    );

    if (slotList.length === 0) {
      alert("최소 한 명 이상의 참여자가 필요합니다!");
      return;
    }

    const RandomIndex = Math.floor(Math.random() * slotList.length);

    const getFromViewers = viewers.findIndex(
      (e) => e.userIdHash === slotList[RandomIndex].userIdHash
    );
    if (getFromViewers === -1) return;

    setTarget(getFromViewers);
    setDrawn((prev) =>
      prev.includes(viewers[getFromViewers].userIdHash)
        ? prev
        : [...prev, viewers[getFromViewers].userIdHash]
    );
  };

  return (
    <>
      <Head>
        <title>CHZZK VOTE - 치지직 투표 추첨기</title>
        <meta name="description" content="치지직 투표 추첨기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Frame>
        <Breadcrumbs icon="users" text="시청자 추첨" href="/viewer" />
        {state === "before" && (
          <BtnFrame>
            <Btn $type="default" $width={260} onClick={() => setState("open")}>
              참여자 모집 시작
            </Btn>
          </BtnFrame>
        )}
        {state === "open" && (
          <>
            <BtnFrame>
              <Btn
                $type="default"
                $width={260}
                onClick={() => setState("closed")}
              >
                참여자 모집 종료
              </Btn>
            </BtnFrame>
          </>
        )}
        {state === "closed" && (
          <>
            <BtnFrame>
              <Btn $type="line" $width={260} onClick={onReset}>
                참여자 다시 모집하기
              </Btn>
              <Btn $type="default" $width={260} onClick={onSlot}>
                추첨하기
              </Btn>
            </BtnFrame>
            <ClosedOptionBtns>
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
            </ClosedOptionBtns>
          </>
        )}
        {state !== "before" && (
          <ViewersFrame>
            <Viewers>
              {viewers.map((e) => (
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
              <ViewerBottomText>총 {viewers.length}명</ViewerBottomText>
              {state === "open" && (
                <ViewerBottomText>
                  채팅창에 아무 말이나 입력하시면 참여됩니다!
                </ViewerBottomText>
              )}
            </ViewersBottom>
          </ViewersFrame>
        )}
        {chat !== null && <Chat viewer={chat} onClose={() => setChat(null)} />}
        {target !== null && (
          <ChatSlot
            viewers={viewers}
            target={target}
            onClose={() => setTarget(null)}
          />
        )}
      </Frame>
    </>
  );
}
