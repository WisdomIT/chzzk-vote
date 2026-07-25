"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { styled } from "styled-components";
import ProtectedRoute from "../_components/Layout/ProtectedRoute";

// 웹 모드 레이아웃 — 설정/정적 페이지용.
// 앱 모드(100vw/100vh 고정)와 달리 세로 스크롤을 허용하고 zoom을 적용하지 않는다.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.device.mobile} {
    min-height: calc(100vh - (60px + 240px));
  }
`;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Header showZoom={false} />
      <Main>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Main>
      <Footer />
    </Container>
  );
}
