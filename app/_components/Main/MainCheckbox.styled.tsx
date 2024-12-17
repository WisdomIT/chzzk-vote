"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const Button = styled.button<{ $active: boolean }>`
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
  background-color: transparent;
  border: none;
  cursor: pointer;

  opacity: ${({ $active }) => ($active ? "1" : "0.2")};

  &:hover {
    opacity: ${({ $active }) => ($active ? "1" : "0.5")};
  }

  ${({ theme }) => theme.device.mobile} {
    position: relative;
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  height: 20px;
  margin-right: 10px;
`;
