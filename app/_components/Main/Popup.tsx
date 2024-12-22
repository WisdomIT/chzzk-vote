"use client";

import styled from "styled-components";

export const PopupBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  animation: 0.3s ${({ theme }) => theme.animation.appear};
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.background01Transparent};
`;
