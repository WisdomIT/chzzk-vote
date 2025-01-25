"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { createGlobalStyle, styled } from "styled-components";
import ProtectedRoute from "../_components/Layout/ProtectedRoute";
import { useGlobalOptionStore } from "@/lib/zustand";

const Container = styled.div<{ $zoom: number }>`
  display: flex;
  flex-direction: column;
  width: calc(100vw * ${({ $zoom }) => 100 / $zoom});
  height: calc(100vh * ${({ $zoom }) => 100 / $zoom});
  transform: scale(${({ $zoom }) => $zoom / 100});
  transform-origin: top left;

  ${({ theme }) => theme.device.mobile} {
    height: auto;
  }
`;

const Main = styled.main`
  flex: 1;
  position: relative;

  ${({ theme }) => theme.device.mobile} {
    min-height: calc(100vh - (60px + 240px));
  }
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
