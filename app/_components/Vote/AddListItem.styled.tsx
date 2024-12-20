"use client";

import { styled } from "styled-components";
import MainButton from "../Main/MainButton";

export const TitleDummy = styled.div`
  width: 120px;

  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const DeleteDummy = styled.div`
  width: 49px;

  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const Button = styled(MainButton)`
  flex: 1;

  ${({ theme }) => theme.device.mobile} {
    flex: auto;
  }
`;
