"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, styled } from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  right: 40px;
  bottom: 160px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.rounded.base};

  ${({ theme }) => theme.device.mobile} {
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
`;

export const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.rounded.base};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.content50};
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  height: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  white-space: pre-wrap;
  word-break: keep-all;
`;

export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;
