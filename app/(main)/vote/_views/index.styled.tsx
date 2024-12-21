"use client";

import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  animation: ${({ theme }) => theme.animation.appearUp} 0.3s;

  ${({ theme }) => theme.device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
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
  max-width: 1000px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;

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
  max-width: 1000px;
  max-height: 400px;
  overflow-y: auto;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;
