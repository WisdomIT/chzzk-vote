"use client";

import Link from "next/link";
import { css, styled } from "styled-components";

export const style = css<{
  $fill: "primary" | "secondary";
  $fillType: "filled" | "outlined";
  $size: "normal" | "small";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;
  animation: ${({ theme }) => theme.animation.appear} 0.2s;

  height: ${({ $size }) => {
    switch ($size) {
      case "normal":
        return "80px";
      case "small":
        return "60px";
      default:
        return "80px";
    }
  }};

  font-size: ${({ $size, theme }) => {
    switch ($size) {
      case "normal":
        return theme.fonts.size["2xl"];
      case "small":
        return theme.fonts.size.xl;
      default:
        return theme.fonts.size["2xl"];
    }
  }};

  padding: ${({ $size }) => {
    switch ($size) {
      case "normal":
        return "0px 40px";
      case "small":
        return "0px 28px";
      default:
        return "0px 40px";
    }
  }};

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

  &:focus {
    outline: 6px double ${({ theme }) => theme.colors.brand};
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
  $size: "normal" | "small";
}>`
  ${style}
`;

export const StyledLink = styled(Link)<{
  $fill: "primary" | "secondary";
  $fillType: "filled" | "outlined";
  $size: "normal" | "small";
}>`
  ${style}
`;
