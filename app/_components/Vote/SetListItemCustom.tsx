import type { InputHTMLAttributes } from "react";
import MainInput from "../Main/MainInput";
import { Container, Title, MobileRow } from "./SetListItem.styled";
import { DeleteDummy } from "./AddListItem.styled";

interface CustomTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type: "text" | "password" | "email" | "tel" | "url" | "search" | "number";
  title: string;
}

export default function SetListItemCustom({
  title,
  ...props
}: CustomTextInputProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <MobileRow>
        <MainInput {...props} style={{ flex: 1, minWidth: 1 }} />
        <DeleteDummy />
      </MobileRow>
    </Container>
  );
}
