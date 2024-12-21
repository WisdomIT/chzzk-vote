"use client";

import { styled } from "styled-components";
import { PopupBackground } from "../Main/Popup";

export const Container = styled(PopupBackground)`
  gap: 20px;
`;

export const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1160px;
  padding: 80px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.background01};
  border: 1px solid ${({ theme }) => theme.colors.border01};
  border-radius: ${({ theme }) => theme.rounded.lg};

  ${({ theme }) => theme.device.tablet} {
    padding: 40px;
    max-width: 1080px;
  }

  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
    max-width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }
`;

export const Top = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const TopText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  gap: 8px;

  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 10px;
  }
`;

export const TopIndex = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const TopName = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["6xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  ${({ theme }) => theme.truncate}

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`;

export const TopButtons = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;
