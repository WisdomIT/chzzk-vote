import { faXmark } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";
import MainInput from "../Main/MainInput";
import {
  Container,
  Title,
  DeleteContainer,
  DeleteIcon,
  MobileRow,
} from "./SetListItem.styled";

export default function SetListItem({
  index,
  value,
  setValue,
  onDelete,
}: {
  index: number;
  value: string;
  setValue: (value: string) => void;
  onDelete: () => void;
}) {
  return (
    <Container>
      <Title>항목 {index + 1}</Title>
      <MobileRow>
        <MainInput
          type="text"
          placeholder="투표 이름"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          style={{ flex: 1, minWidth: 1 }}
        />
        <DeleteContainer onClick={onDelete}>
          <DeleteIcon icon={faXmark} />
        </DeleteContainer>
      </MobileRow>
    </Container>
  );
}
