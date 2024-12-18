import { styled } from "styled-components";

export const Text1 = styled.p`
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.base};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  word-break: keep-all;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

export const Text2 = styled.p`
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  word-break: keep-all;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
  }
`;

export const TopText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  max-width: 800px;
`;
