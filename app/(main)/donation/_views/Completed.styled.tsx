"use client";

import { styled } from "styled-components";

export const BottomBtns = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;
