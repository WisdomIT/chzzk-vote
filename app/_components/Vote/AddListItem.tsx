import { Container } from "./SetListItem.styled";
import { ButtonContainer, DeleteDummy, TitleDummy } from "./AddListItem.styled";
import MainButton from "../Main/MainButton";

export default function AddListItem({ onAdd }: { onAdd: () => void }) {
  return (
    <Container>
      <TitleDummy />
      <ButtonContainer>
        <MainButton
          fillType="outlined"
          size="small"
          onClick={onAdd}
          style={{ width: "100%" }}
        >
          항목 추가
        </MainButton>
      </ButtonContainer>
      <DeleteDummy />
    </Container>
  );
}
