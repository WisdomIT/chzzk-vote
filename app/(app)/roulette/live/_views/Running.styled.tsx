import { styled } from "styled-components";

export const WheelContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  & > div {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
  }
`;

export const BottomBtns = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 100%;
  }
`;

export const Complete = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  bottom: 120px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: ${({ theme }) =>
    Array(30).fill(`0 0 5px ${theme.colors.black}`).join(", ")};
  z-index: 10;
  transform: translateZ(1);
  pointer-events: none;
  animation: ${({ theme }) => theme.animation.appearUp} 0.2s;
`;
