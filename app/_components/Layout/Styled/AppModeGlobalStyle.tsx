"use client";

import { createGlobalStyle } from "styled-components";

// 앱 모드 전용 전역 스타일 — (main)/(app) 레이아웃에서만 마운트한다.
// 방송 송출용 화면이므로 문서를 뷰포트(100vh)에 고정하고 스크롤을 막는다.
// 웹 모드((config) 등)는 이 스타일이 마운트되지 않으므로 기본 문서 스크롤이 동작한다.
export const AppModeGlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    overflow: hidden;

    ${({ theme }) => theme.device.mobile} {
      height: fit-content;
      overflow: auto;
    }
  }
`;
