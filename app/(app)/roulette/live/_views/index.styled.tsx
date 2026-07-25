"use client";

import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  gap: 20px;

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
