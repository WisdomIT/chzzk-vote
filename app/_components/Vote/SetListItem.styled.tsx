"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const Title = styled.p`
  width: 120px;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
    width: 100%;
  }
`;

export const MobileRow = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const DeleteContainer = styled.button`
  color: ${({ theme }) => theme.colors.content20};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  height: 52px;
`;
