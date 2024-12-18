import React from "react";
import type { InputHTMLAttributes } from "react";
import { Input } from "./MainInput.styled";

interface CustomTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type: "text" | "password" | "email" | "tel" | "url" | "search" | "number";
}

export default function MainInput(inputProps: CustomTextInputProps) {
  return <Input {...inputProps} />;
}
