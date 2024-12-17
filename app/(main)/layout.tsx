"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  ${({ theme }) => theme.device.mobile} {
    height: auto;
  }
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
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}
