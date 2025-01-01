"use client";

import Header from "../_components/Layout/Header";
import Footer from "../_components/Layout/Footer";
import { styled } from "styled-components";
import ProtectedRoute from "../_components/Layout/ProtectedRoute";
import GlobalAlert from "../_components/Main/GlobalAlert";

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
      <Header />
      <Main>
        <ProtectedRoute>{children}</ProtectedRoute>
        <GlobalAlert
          title="사이트가 업데이트되었습니다!"
          message={`프로젝트의 베이스부터 모든 페이지가 최적화되고, 접근성을 개선했습니다.\n작동 매커니즘이 바뀌면서 사이트에 버그가 있을 수 있습니다.\n버그를 발견하신다면 설정 -  패치노트 - 개발자에게 건의를 통해 제보 부탁드립니다!\n항상 이용해주셔서 감사합니다.`}
          until={new Date("2025-01-01")}
        />
      </Main>
      <Footer />
    </Container>
  );
}
