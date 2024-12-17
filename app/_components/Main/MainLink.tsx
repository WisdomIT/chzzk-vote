import React from "react";
import type { HTMLAttributes } from "react";
import { StyledLink } from "./MainButton.styled";

type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  fill?: "primary" | "secondary";
  fillType?: "filled" | "outlined";
};

export default function MainLink({
  children,
  fill = "primary",
  fillType = "filled",
  className,
  ...linkProps
}: LinkProps) {
  return (
    <StyledLink $fill={fill} $fillType={fillType} {...linkProps}>
      {children}
    </StyledLink>
  );
}
