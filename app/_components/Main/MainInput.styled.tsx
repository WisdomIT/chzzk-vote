"use client";

import { styled } from "styled-components";

export const Input = styled.input`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  border-radius: ${({ theme }) => theme.rounded.base};
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.background02};
  color: ${({ theme }) => theme.colors.content};
  border: 0px;
`;
