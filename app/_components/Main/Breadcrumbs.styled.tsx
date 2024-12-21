"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css, styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 40px;
  left: 40px;
  gap: 10px;
  align-items: center;
  z-index: 2;

  ${({ theme }) => theme.device.mobile} {
    top: 10px;
    left: 10px;
    gap: 4px;
  }
`;

const Breadcrumb = css`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;
  border: none;
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.content10};
  }

  ${({ theme }) => theme.device.mobile} {
    padding: 4px 8px;
  }
`;

export const BreadcrumbLink = styled(Link)`
  ${Breadcrumb}
`;

export const BreadcrumbButton = styled.button`
  ${Breadcrumb}
`;

export const Icon = styled(FontAwesomeIcon)`
  height: 14px;
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.brand};

  ${({ theme }) => theme.device.mobile} {
    height: 12px;
  }
`;

export const Text = styled.p`
  display: inline-block;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.brand};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const Next = styled(FontAwesomeIcon)`
  height: 12px;
  color: ${({ theme }) => theme.colors.brand};

  ${({ theme }) => theme.device.mobile} {
    height: 10px;
  }
`;
