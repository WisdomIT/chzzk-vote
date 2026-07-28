"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { createGlobalStyle, styled } from "styled-components";
import ProtectedRoute from "../_components/Layout/ProtectedRoute";

// 웹 모드 레이아웃 — 설정/정적 페이지용.
// 앱 모드(100vw/100vh 고정)와 달리 세로 스크롤을 허용하고 zoom을 적용하지 않는다.
// 전역 스타일(StyledGlobalProvider)이 html/body를 100vh + overflow hidden으로
// 고정하므로, 웹 모드가 마운트된 동안에만 문서 스크롤을 다시 연다.
const WebModeGlobalStyle = createGlobalStyle`
  html,
  body {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

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
      <WebModeGlobalStyle />
      <Header showZoom={false} />
      <Main>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Main>
      <Footer />
    </Container>
  );
}
