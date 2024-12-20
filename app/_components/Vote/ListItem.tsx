import { faXmark } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";
import MainInput from "../Main/MainInput";
import { ViewerType } from "@/lib/types";
import {
  Container,
  Info,
  InfoIndex,
  InfoName,
  Percentage,
  PercentageText,
  PercentageCurrent,
  PercentageCurrentText,
  TextPercentage,
  PercentageHidden,
} from "./ListItem.styled";

export default function ListItem({
  index,
  name,
  total,
  viewers,
  drawn,
  setDrawn,
  hidden,
}: {
  index: number;
  name: string;
  total: number;
  viewers: ViewerType[];
  drawn: ViewerType[];
  setDrawn: (viewer: ViewerType) => void;
  hidden: boolean;
}) {
  const percentage =
    total !== 0 ? ((viewers.length / total) * 100).toFixed(2) : "0";

  return (
    <Container>
      <Info>
        <InfoIndex>!투표{index + 1}</InfoIndex>
        <InfoName>{name}</InfoName>
      </Info>
      <Percentage>
        {!hidden ? (
          <>
            <PercentageText>
              {viewers.length}표<TextPercentage>{percentage}%</TextPercentage>
            </PercentageText>
            <PercentageCurrent $width={percentage}>
              <PercentageCurrentText>
                {viewers.length}표<TextPercentage>{percentage}%</TextPercentage>
              </PercentageCurrentText>
            </PercentageCurrent>
          </>
        ) : (
          <PercentageHidden>투표 내용이 가려졌습니다</PercentageHidden>
        )}
      </Percentage>
    </Container>
  );
}
