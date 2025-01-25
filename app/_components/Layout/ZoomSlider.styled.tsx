"use client";

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  position: relative;
  width: 100px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.background02};
  border-radius: ${({ theme }) => theme.rounded.base};
  overflow: hidden;
  cursor: pointer;

  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const Bar = styled.div<{ $zoom: number }>`
  width: ${({ $zoom }) => `${$zoom - 50}px`};
  height: 36px;
  background-color: ${({ theme }) => theme.colors.brand};
  overflow: hidden;
`;

export const NumberStyle = styled.span`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 36px;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content};
  -webkit-user-drag: none;
`;

export const Icon = styled(FontAwesomeIcon)`
  height: ${({ theme }) => theme.fonts.size.sm};
  margin-right: 4px;
`;
