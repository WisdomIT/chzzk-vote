import { Container, Title, DeleteDummy } from "./SetListItem.styled";
import MainButton from "../Main/MainButton";

export default function AddListItem({ onAdd }: { onAdd: () => void }) {
  return (
    <Container>
      <Title />
      <MainButton
        fillType="outlined"
        size="small"
        style={{ flex: 1 }}
        onClick={onAdd}
      >
        항목 추가
      </MainButton>
      <DeleteDummy />
    </Container>
  );
}
