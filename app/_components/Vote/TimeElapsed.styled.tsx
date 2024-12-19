import styled, { keyframes } from "styled-components";

const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["5xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  display: flex;
  gap: 0px;
`;

export const DigitContainer = styled.div`
  position: relative;
  width: 1ch;
  height: 1em;
`;

export const DigitOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const OldDigit = styled.span<{ isChanging: boolean }>`
  position: absolute;
  opacity: 0;
  left: 0;
  width: 100%;
  top: 0;
  text-align: center;
  animation: ${(props) => (props.isChanging ? fadeOutDown : "none")} 0.3s
    ease-in-out forwards;
`;

export const NewDigit = styled.span<{ isChanging: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  text-align: center;
  animation: ${(props) => (props.isChanging ? fadeInUp : "none")} 0.3s
    ease-in-out;
`;

export const Separator = styled.span`
  display: inline-block;
`;
