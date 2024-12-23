"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { styled } from "styled-components";

export const Btn = styled(Link)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 300px;
  gap: 50px;
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;

  border: 1px solid ${({ theme }) => theme.colors.border01};

  &:hover,
  &:focus {
    border: 3px solid ${({ theme }) => theme.colors.brand};
  }

  &:hover svg,
  &:focus svg,
  &:hover p,
  &:focus p {
    color: ${({ theme }) => theme.colors.brand};
  }

  &:hover span,
  &:focus span {
    display: block;
  }

  ${({ theme }) => theme.device.tablet} {
    width: 200px;
    height: 250px;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100px;
    flex-direction: row;

    &:hover span,
    &:focus span {
      display: none;
    }
  }
`;

export const BtnIcon = styled(FontAwesomeIcon)`
  height: 80px;

  color: ${({ theme }) => theme.colors.content};

  ${({ theme }) => theme.device.tablet} {
    height: 60px;
  }

  ${({ theme }) => theme.device.mobile} {
    height: 40px;
  }
`;

export const BtnText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
`;

export const BtnTooltip = styled.span`
  display: none;
  position: absolute;
  top: 310px;
  left: -4px;
  right: -4px;
  background-color: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.black};
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  border-radius: ${({ theme }) => theme.rounded.base};
  animation: ${({ theme }) => theme.animation.appearUp} 0.3s;
  white-space: pre-wrap;
  word-break: keep-all;

  ${({ theme }) => theme.device.tablet} {
    top: 260px;
  }
`;
