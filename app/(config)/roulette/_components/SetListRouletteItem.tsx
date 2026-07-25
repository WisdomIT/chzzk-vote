import { faXmark } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";
import {
  Container,
  Title,
  DeleteContainer,
  DeleteIcon,
  MobileRow,
  Percentage,
} from "./SetListRouletteItem.styled";
import MainInput from "@/app/_components/Main/MainInput";

export default function SetListRouletteItem({
  index,
  name,
  setName,
  size,
  setSize,
  percentage,
  onDelete,
}: {
  index: number;
  name: string;
  setName: (value: string) => void;
  size: number;
  setSize: (value: number) => void;
  percentage: string;
  onDelete: () => void;
}) {
  return (
    <Container>
      <Title>항목 {index + 1}</Title>
      <MobileRow>
        <MainInput
          type="text"
          placeholder="투표 이름"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          style={{ flex: 1, minWidth: 1 }}
        />
        <MainInput
          type="number"
          placeholder="확률"
          value={size}
          onChange={(event) => {
            setSize(parseInt(event.target.value));
          }}
          step={1}
          min={1}
          style={{ width: 100 }}
        />
        <Percentage>{percentage}%</Percentage>
        <DeleteContainer onClick={onDelete}>
          <DeleteIcon icon={faXmark} />
        </DeleteContainer>
      </MobileRow>
    </Container>
  );
}
