import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type SlotDataType = string | JSX.Element;

type SlotData = {
  data: SlotDataType[];
  target: number;
  duration: number;
  height: number;
  onEnd: (target: number) => void;
};

const SlotContainer = styled.div<{ $height: number }>`
  overflow: hidden;
  height: ${(props) => `${props.$height}px`};
`;

const SlotItems = styled.div<{ $duration: number; $translateY: number; $initAnimation: boolean }>`
  display: flex;
  flex-direction: column;
  transition: ${(props) => props.$initAnimation ? `none` : `transform ${props.$duration}ms ease-out`};
  transform: ${(props) => `translateY(-${props.$translateY}px)`};
`;

const SlotItem = styled.div<{ $height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => `${props.$height / 5}px`};
  font-weight: 800;
  height: ${(props) => `${props.$height}px`};
`;

const Slot: React.FC<SlotData> = ({ data, target, duration, height, onEnd }) => {
  const [items, setItems] = useState<SlotDataType[]>([]);
  const [translateY, setTranslateY] = useState(0);
  const [initAnimation, setInitAnimation] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      setItems([]);
      return;
    }
  
    // 데이터 반복 로직으로 충분히 길이를 확보하여 최소 2바퀴 회전이 가능하게 함
    const minimumRepeats = Math.ceil(20 / data.length);
    const repeatsNeededForTwoRotations = 2;
    const totalRepeats = Math.max(minimumRepeats, repeatsNeededForTwoRotations);
    const repeatedData = Array(totalRepeats).fill([...data]).flat();
    
    // 최종 데이터에 target 위치까지 반영
    let processedData = [...repeatedData, ...repeatedData.slice(0, target + 1)];
  
    setItems(processedData);
    setInitAnimation(true);
    setTranslateY(0); // 위치 초기화
  
    requestAnimationFrame(() => {
      setInitAnimation(false);
      // 슬롯의 전체 회전을 위한 정확한 translateY 계산
      const rotationsHeight = height * repeatedData.length; // 최소 2바퀴 회전
      const targetHeight = height * target; // target 위치까지 이동
      setTranslateY(rotationsHeight + targetHeight);
    });
  
    const timer = setTimeout(() => {
      onEnd(target);
    }, duration);
  
    return () => clearTimeout(timer);
  }, [data, target, duration, height, onEnd]);

  return (
    <SlotContainer $height={height}>
      <SlotItems $duration={duration} $translateY={translateY} $initAnimation={initAnimation}>
        {items.map((item, index) => (
          <SlotItem key={index} $height={height}>
            {item}
          </SlotItem>
        ))}
      </SlotItems>
    </SlotContainer>
  );
};

export default Slot;
