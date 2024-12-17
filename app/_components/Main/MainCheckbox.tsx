"use client";

import { MouseEventHandler } from "react";
import { Button, Icon } from "./MainCheckbox.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

export default function MainCheckbox({
  title,
  value,
  onClick,
}: {
  title: string | JSX.Element;
  value: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button $active={value} onClick={onClick}>
      <Icon icon={faCheck} height={20} />
      {title}
    </Button>
  );
}
