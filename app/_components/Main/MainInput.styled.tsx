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

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Text = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
`;

export const Description = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
`;
