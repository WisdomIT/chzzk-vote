"use client";

import MainLink from "./_components/Main/MainLink";
import { Container, ErrorCode, ErrorMessage } from "./not-found.styled";

export default function NotFound() {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>잘못된 요청입니다!</ErrorMessage>
      <MainLink href="/" size="small" style={{ marginTop: 80 }}>
        홈으로 돌아가기
      </MainLink>
    </Container>
  );
}
