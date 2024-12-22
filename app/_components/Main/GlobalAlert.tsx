"use client";

import { useState } from "react";
import {
  Close,
  Container,
  Hr,
  Icon,
  Message,
  Title,
} from "./GlobalAlert.styled";
import { faXmarkLarge } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

export default function GlobalAlert({
  title,
  message,
  until,
}: {
  title: string;
  message: string;
  until?: Date;
}) {
  const [closed, setClosed] = useState(false);

  if (until && until.getTime() < new Date().getTime()) return null;
  if (closed) return null;

  return (
    <Container>
      <Title>{title}</Title>
      <Hr />
      <Message>{message}</Message>
      <Close
        onClick={() => {
          setClosed(true);
        }}
      >
        <Icon icon={faXmarkLarge} />
      </Close>
    </Container>
  );
}
