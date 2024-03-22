import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'

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
  background-color: var(--color-background-01-transparent);
  backdrop-filter: blur(10px);
  animation: .3s appear;
`