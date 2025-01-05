"use client";

import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;

  animation: ${({ theme }) => theme.animation.appearUp} 0.3s;

  ${({ theme }) => theme.device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

export const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  max-height: calc(100% - 40px);
  gap: 40px;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;

export const Total = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["5xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-shrink: 0;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow-y: auto;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;
