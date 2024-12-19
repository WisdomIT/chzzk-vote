import React from "react";
import type { InputHTMLAttributes } from "react";
import { Container, Text, Title, Description, Input } from "./MainInput.styled";

interface CustomTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  title: string;
  description?: string | JSX.Element;
  type: "text" | "password" | "email" | "tel" | "url" | "search" | "number";
}

export default function MainInputTitle({
  title,
  description,
  style,
  className,
  ...inputProps
}: CustomTextInputProps) {
  return (
    <Container style={style} className={className}>
      <Text>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Text>
      <Input {...inputProps} />
    </Container>
  );
}
