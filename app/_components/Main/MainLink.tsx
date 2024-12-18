import React from "react";
import type { HTMLAttributes } from "react";
import { StyledLink } from "./MainButton.styled";

type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  fill?: "primary" | "secondary";
  fillType?: "filled" | "outlined";
  size?: "normal" | "small";
};

export default function MainLink({
  children,
  fill = "primary",
  fillType = "filled",
  size = "normal",
  className,
  ...linkProps
}: LinkProps) {
  return (
    <StyledLink $fill={fill} $fillType={fillType} $size={size} {...linkProps}>
      {children}
    </StyledLink>
  );
}
