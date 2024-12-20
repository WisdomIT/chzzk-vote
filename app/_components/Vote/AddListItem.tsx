import { Container } from "./SetListItem.styled";
import { Button, DeleteDummy, TitleDummy } from "./AddListItem.styled";

export default function AddListItem({ onAdd }: { onAdd: () => void }) {
  return (
    <Container>
      <TitleDummy />
      <Button fillType="outlined" size="small" onClick={onAdd}>
        항목 추가
      </Button>
      <DeleteDummy />
    </Container>
  );
}
