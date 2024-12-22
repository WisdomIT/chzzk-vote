import { useEffect, useState } from "react";
import { RouletteType } from "../page";
import { Container } from "./index.styled";
import { BottomBtns, Complete, WheelContainer } from "./Running.styled";
import dynamic from "next/dynamic";
import MainButton from "@/app/_components/Main/MainButton";
import ConfettiExplosion from "react-confetti-explosion";
const Wheel = dynamic(
  () =>
    import("react-custom-roulette").then<
      typeof import("react-custom-roulette").Wheel
    >((mod) => mod.Wheel),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
  }
);

const backgroundColors = [
  "#3f297e",
  "#175fa9",
  "#169ed8",
  "#239b63",
  "#64b031",
  "#efe61f",
  "#f7a416",
  "#e6471d",
  "#dc0936",
  "#e5177b",
  "#be1180",
  "#871f7f",
];

export default function Running({
  roulette,
  onReset,
}: {
  roulette: RouletteType[];
  onReset: () => void;
}) {
  const [target, setTarget] = useState<null | number>(null);
  const [boxSize, setBoxSize] = useState<number>(0);
  const [complete, setComplete] = useState(false);

  const updateSize = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    let size: number;

    if (vw <= 800) {
      size = vw - 200; // 800px 이하일 경우
    } else if (vw <= 1300) {
      size = vw - 500; // 1300px 이하일 경우
    } else {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      const maxWidth = vw - 800;
      const maxHeight = vh - 500;
      size = Math.min(maxWidth, maxHeight, vw - 200); // 기본 조건
    }

    setBoxSize(size);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize(); // 초기 사이즈 설정

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  function handleSpin() {
    if (target !== null) return;

    const total = roulette.reduce((sum, item) => sum + item.size, 0);

    let randomNum = Math.random() * total;
    let newTarget = 0;

    for (let i = 0; i < roulette.length; i++) {
      randomNum -= roulette[i].size;
      if (randomNum < 0) newTarget = i;
    }

    setTarget(newTarget);

    setTimeout(() => {
      setComplete(true);
    }, 6000);

    setTimeout(() => {
      setTarget(null);
      setComplete(false);
    }, 10000);
  }

  const rouletteData = roulette.map((item) => ({
    option: item.name,
    optionSize: item.size,
    style: {
      backgroundColor: backgroundColors[item.id % backgroundColors.length],
    },
  }));

  return (
    <Container>
      <WheelContainer $size={boxSize}>
        <Wheel
          mustStartSpinning={target !== null && !complete}
          spinDuration={0.5}
          prizeNumber={target ?? 0}
          data={rouletteData}
          outerBorderColor={"#ccc"}
          outerBorderWidth={10}
          radiusLineColor={"tranparent"}
          textColors={["#f5f5f5"]}
          textDistance={50}
        />
      </WheelContainer>
      <BottomBtns>
        <MainButton fillType="outlined" onClick={onReset}>
          돌아가기
        </MainButton>
        <MainButton onClick={handleSpin}>돌려!</MainButton>
      </BottomBtns>
      {target && complete ? (
        <Complete>
          <ConfettiExplosion force={0.5} width={2000} zIndex={10} />
          {roulette[target].name}
        </Complete>
      ) : null}
    </Container>
  );
}
