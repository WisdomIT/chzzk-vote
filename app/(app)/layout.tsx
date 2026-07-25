"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { styled } from "styled-components";
import ProtectedRoute from "../_components/Layout/ProtectedRoute";
import { useGlobalOptionStore } from "@/lib/zustand";

// 앱 모드 레이아웃 — 진행 중인 투표 화면용 (*/live).
// 방송 송출을 위해 100vw/100vh에 고정하고 zoom을 적용한다.
const Container = styled.div<{ $zoom: number }>`
  display: flex;
  flex-direction: column;
  width: calc(100vw * ${({ $zoom }) => 100 / $zoom});
  height: calc(100vh * ${({ $zoom }) => 100 / $zoom});
  transform: scale(${({ $zoom }) => $zoom / 100});
  transform-origin: top left;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
`;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { zoom } = useGlobalOptionStore();

  return (
    <Container $zoom={zoom}>
      <Header />
      <Main>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Main>
      <Footer />
    </Container>
  );
}
