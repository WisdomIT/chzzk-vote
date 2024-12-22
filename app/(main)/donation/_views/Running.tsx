"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { TimeType, ViewerType, VoteType } from "@/lib/types";
import MainButton from "@/app/_components/Main/MainButton";
import TimeElapsed from "@/app/_components/Vote/TimeElapsed";
import ListItem from "@/app/_components/Vote/ListItem";
import MainCheckbox from "@/app/_components/Main/MainCheckbox";
import { useGlobalOptionStore } from "@/lib/zustand";
import useChzzkChat from "@/lib/useChzzkChat";
import { extractVoteNumber } from "@/lib/vote";
import Description, {
  DescriptionType,
} from "@/app/_components/Vote/Description";
import {
  Container,
  Top,
  Total,
  Bottom,
  List,
  ContainerCenter,
} from "./index.styled";
import { DoneConfigType } from "../page";

export default function Running({
  doneConfig,
  vote,
  setVote,
  onStop,
  drawn,
  time,
  setDrawn,
}: {
  doneConfig: DoneConfigType;
  vote: VoteType[];
  setVote: Dispatch<SetStateAction<VoteType[]>>;
  drawn: ViewerType[];
  setDrawn: (viewer: ViewerType) => void;
  time: TimeType;
  onStop: () => void;
}) {
  const { channel } = useGlobalOptionStore();
  const [hidden, setHidden] = useState<boolean>(false);

  function handleOnDonation(
    viewer: ViewerType,
    message: string,
    price: number
  ) {
    if (doneConfig.price > price) return;

    const onlyNumber = extractVoteNumber(message);
    if (!onlyNumber) return;

    const number = onlyNumber - 1;

    setVote((prev) => {
      const thisVote = prev[number];
      if (!thisVote) return prev;

      //복수투표가 아닐 경우 (기존 투표를 지움)
      if (!doneConfig.plural) {
        const newVote = [...prev].map((item) => ({
          ...item,
          viewers: item.viewers.filter(
            (viewersItem) => viewersItem.userIdHash !== viewer.userIdHash
          ),
        }));

        newVote[number].viewers.push(viewer);
        return newVote;
      }

      //복수투표일 경우 (기존 투표를 지우지 않음)
      const newVote = [...prev];
      const count = Math.floor(price / doneConfig.price);

      for (let i = 0; i < count; i++) {
        newVote[number].viewers.push(viewer);
      }

      return newVote;
    });
  }

  useEffect(() => {
    if (channel.channelId === "") {
      alert("채널ID가 정상적으로 인식되지 않습니다. 다시 시도해주세요.");
      location.reload();
      return;
    }

    const client = useChzzkChat({
      channelId: channel.channelId,
      onDonation: (viewer, message, messageString, price) => {
        handleOnDonation(viewer, messageString, price);
      },
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const total = vote.reduce((sum, item) => sum + item.viewers.length, 0);

  const description: DescriptionType[] = [
    {
      body: [
        {
          bold: false,
          text: `복수투표가 ${
            doneConfig.plural ? "허용되었습니다" : "허용되지 않았습니다"
          }`,
        },
      ],
      list: doneConfig.plural
        ? [
            [
              {
                bold: false,
                text: `${doneConfig.price}원 - 1표 / ${
                  doneConfig.price * 2
                }원 - 2표 / ${doneConfig.price * 3}원 - 3표 / ${
                  doneConfig.price * 4
                }원 - 4표 ... 와 같이 금액에 따라 복수로 투표됩니다`,
              },
            ],
            [
              {
                bold: false,
                text: "남는 금액은 내림으로 계산되며, 버려진 금액은 다음 도네 금액과 합산되지 않습니다",
              },
            ],
            [
              {
                bold: false,
                text: "추가 도네 시 기존 투표는 유지되며, 복수로 추가로 투표됩니다",
              },
            ],
          ]
        : [
            [
              {
                bold: false,
                text: "얼마를 투표하던 투표 수 하나로 고정됩니다 (최소 투표 금액을 넘지 않을 경우 투표되지 않습니다)",
              },
            ],
            [
              {
                bold: false,
                text: "추가 도네 시 해당 투표자의 기존 투표를 지우고 새로운 투표로 취급됩니다",
              },
            ],
          ],
    },
    {
      body: [
        {
          bold: false,
          text: "도네 시 반드시 ",
        },
        {
          bold: true,
          text: "메시지 가장 앞",
        },
        {
          bold: false,
          text: "에 ",
        },
        {
          bold: true,
          text: "'!투표1'",
        },
        {
          bold: false,
          text: " 혹은 ",
        },
        {
          bold: true,
          text: "'!투표 1'",
        },
        {
          bold: false,
          text: "과 같이 입력해주세요",
        },
      ],
    },
    {
      body: [
        {
          bold: true,
          text: "익명 도네 시 투표가 들어가지 않습니다. 주의하세요!",
        },
      ],
    },

    {
      body: [
        {
          bold: false,
          text: "투표율 바를 클릭하면 상세 정보를 확인할 수 있습니다",
        },
      ],
    },
  ];

  return (
    <Container>
      <ContainerCenter>
        <Top>
          <Total>총 {total}표</Total>
          <TimeElapsed {...time} />
        </Top>
        <Description
          title={`투표금액 ${doneConfig.price}원 / 복수투표 ${
            doneConfig.plural ? "허용됨" : "허용 안됨"
          }`}
          body={description}
        />
        <List>
          {vote.map((item) => (
            <ListItem
              index={item.id}
              name={item.name}
              total={total}
              viewers={item.viewers}
              drawn={drawn}
              setDrawn={setDrawn}
              hidden={hidden}
            />
          ))}
        </List>
        <Bottom>
          <MainCheckbox
            title="투표 내용 가리기"
            value={hidden}
            onClick={() => {
              setHidden((prev) => !prev);
            }}
          />
          <MainButton onClick={onStop}>투표 종료</MainButton>
        </Bottom>
      </ContainerCenter>
    </Container>
  );
}
