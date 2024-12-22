"use client";

import styled from "styled-components";

export const Btns = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;
