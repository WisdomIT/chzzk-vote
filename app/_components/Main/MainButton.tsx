import React from "react";
import type { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./MainButton.styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fill?: "primary" | "secondary";
  fillType?: "filled" | "outlined";
  size?: "normal" | "small";
};

export default function MainButton({
  children,
  fill = "primary",
  fillType = "filled",
  size = "normal",
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <StyledButton
      $fill={fill}
      $fillType={fillType}
      $size={size}
      {...buttonProps}
    >
      {children}
    </StyledButton>
  );
}
