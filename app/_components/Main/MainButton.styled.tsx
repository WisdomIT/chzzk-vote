"use client";

import Link from "next/link";
import { css, styled } from "styled-components";

export const style = css<{
  $fill: "primary" | "secondary";
  $fillType: "filled" | "outlined";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  height: 80px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;
  animation: ${({ theme }) => theme.animation.appear} 0.2s;

  background-color: ${({ $fillType, $fill, theme }) => {
    if ($fillType === "outlined") return "transparent";
    switch ($fill) {
      case "primary":
        return theme.colors.brand;
      case "secondary":
        return theme.colors.red;
      default:
        return theme.colors.brand;
    }
  }};

  color: ${({ $fillType, $fill, theme }) => {
    if ($fillType === "filled") return theme.colors.black;
    switch ($fill) {
      case "primary":
        return theme.colors.brand;
      case "secondary":
        return theme.colors.red;
      default:
        return theme.colors.brand;
    }
  }};

  border: 3px solid
    ${({ $fill, theme }) => {
      switch ($fill) {
        case "primary":
          return theme.colors.brand;
        case "secondary":
          return theme.colors.red;
        default:
          return theme.colors.brand;
      }
    }};

  &:hover {
    opacity: 0.5;
  }

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    height: 60px;
    width: 100% !important;
  }
`;

export const StyledButton = styled.button<{
  $fill: "primary" | "secondary";
  $fillType: "filled" | "outlined";
}>`
  ${style}
`;

export const StyledLink = styled(Link)<{
  $fill: "primary" | "secondary";
  $fillType: "filled" | "outlined";
}>`
  ${style}
`;
