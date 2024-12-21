"use client";

import { Button, Icon } from "./MainCheckbox.styled";
import type { ButtonHTMLAttributes } from "react";
import { faCheck } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

interface CustomButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title" | "value"> {
  title: string | JSX.Element;
  value: boolean;
}

export default function MainCheckbox({
  title,
  value,
  ...buttonProps
}: CustomButtonProps) {
  return (
    <Button $active={value} {...buttonProps}>
      <Icon icon={faCheck} height={20} />
      {title}
    </Button>
  );
}
