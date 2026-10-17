"use client";

import { styled } from "styled-components";

// 설정(Ready) 화면용 컨테이너 — 웹 모드.
// 앱 모드용 원본((app)/vote/live/_views/index.styled.tsx)에서 분리했다.
// 웹 모드 세부 스타일 정리는 #58에서 진행.

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  flex: 1;

  animation: ${({ theme }) => theme.animation.appearUp} 0.3s;

  ${({ theme }) => theme.device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

export const ContainerCenter = styled.div<{ $zoom: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  max-height: calc(100vh * ${({ $zoom }) => 100 / $zoom} - 320px);
  gap: 40px;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;
