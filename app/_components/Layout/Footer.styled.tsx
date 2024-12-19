"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { styled } from "styled-components";

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 120px;
  padding: 40px;

  border-top: 1px solid ${({ theme }) => theme.colors.border01};

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    gap: 20px;
    height: auto;
    padding: 40px 10px;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.content};
`;

export const Thirdparty = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.content50};
`;

export const SpecialThanks = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.content50};
`;

export const FooterLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: underline;

    color: ${({ theme }) => theme.colors.brand};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  }
`;

export const Github = styled(FontAwesomeIcon)`
  height: 20px;
`;
