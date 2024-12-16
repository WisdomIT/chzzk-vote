import styled from "styled-components";
import { size, device, truncate } from "@/styles/style";

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
  animation: 0.3s appear;

  .dark & {
    background-color: var(--color-background-01-transparent);
  }

  .light & {
    background-color: var(--color-white-50);
  }
`;
