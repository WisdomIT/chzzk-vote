"use client";

import { ViewerType } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  SlotContainer,
  SlotItems,
  SlotItem,
  SlotItemBadge,
  ConfettiFrame,
  CompleteFrame,
} from "./Slot.styled";
import { Viewer, ViewerName } from "./Chat.styled";
import ConfettiExplosion from "react-confetti-explosion";

const height = 100;

export default function Slot({
  list,
  duration,
  onEnd,
  initialTarget,
}: {
  list: ViewerType[];
  duration: number;
  onEnd: (item: ViewerType, index: number) => void;
  initialTarget: ViewerType | null;
}) {
  const [items, setItems] = useState<ViewerType[]>([]);
  const [translateY, setTranslateY] = useState(0);
  const [initAnimation, setInitAnimation] = useState(true);

  useEffect(() => {
    if (list.length === 0) {
      setItems([]);
      return;
    }

    if (initialTarget) {
      return;
    }

    const target = Math.floor(Math.random() * list.length);
    const targetViewer = list[target];

    // 데이터 반복 로직으로 충분히 길이를 확보하여 최소 2바퀴 회전이 가능하게 함
    const minimumRepeats = Math.ceil(20 / list.length);
    const repeatsNeededForTwoRotations = 2;
    const totalRepeats = Math.max(minimumRepeats, repeatsNeededForTwoRotations);
    const repeatedlist = Array(totalRepeats)
      .fill([...list])
      .flat();

    // 최종 데이터에 target 위치까지 반영
    let processedlist = [...repeatedlist, ...repeatedlist.slice(0, target + 1)];

    setItems(processedlist);
    setInitAnimation(true);
    setTranslateY(0); // 위치 초기화

    requestAnimationFrame(() => {
      setInitAnimation(false);
      // 슬롯의 전체 회전을 위한 정확한 translateY 계산
      const rotationsHeight = height * repeatedlist.length; // 최소 2바퀴 회전
      const targetHeight = height * target; // target 위치까지 이동
      setTranslateY(rotationsHeight + targetHeight);
    });

    const timer = setTimeout(() => {
      if (onEnd) onEnd(targetViewer, target);
    }, duration);

    return () => clearTimeout(timer);
  }, [list, initialTarget]);

  //initialTarget이 없을때는 슬롯이 돌아감감
  if (!initialTarget) {
    return (
      <SlotContainer $height={height}>
        <SlotItems
          $duration={duration}
          $translateY={translateY}
          $initAnimation={initAnimation}
        >
          {items.map((item, index) => (
            <SlotItem key={`slot_${index}_${item.userIdHash}`} $height={height}>
              {item.badges.map((e, i) => (
                <SlotItemBadge
                  key={`slot_${index}_${item.userIdHash}_badge_${i}`}
                  src={e}
                />
              ))}
              <ViewerName>{item.nickname}</ViewerName>
            </SlotItem>
          ))}
        </SlotItems>
      </SlotContainer>
    );
  }
  return (
    <CompleteFrame>
      <ConfettiFrame>
        <ConfettiExplosion force={0.5} width={2000} zIndex={11} />
        <ConfettiExplosion force={0.5} width={2000} zIndex={11} />
      </ConfettiFrame>
      <Viewer>
        {initialTarget.badges.map((e, i) => (
          <SlotItemBadge key={`chat_badge_${i}`} src={e} />
        ))}
        <ViewerName>{initialTarget.nickname}</ViewerName>
      </Viewer>
    </CompleteFrame>
  );
}
