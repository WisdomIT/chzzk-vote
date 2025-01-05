import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  ${({ theme }) => theme.device.mobile} {
    position: fixed;
  }
`;

export const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.background02};
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand};
  overflow: hidden;
  transition: width 1s linear;
  text-align: right;
  padding: 2px 0px;
  padding-right: 6px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  color: ${({ theme }) => theme.colors.background01};
  vertical-align: middle;
`;

const fadeIn = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Background = styled.p`
  font-size: 20vw;
  color: ${({ theme }) => theme.colors.content20};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  animation: ${fadeIn} 0.8s forwards;

  ${({ theme }) => theme.device.tablet} {
    font-size: 30vw;
  }

  ${({ theme }) => theme.device.mobile} {
    font-size: 40vw;
  }
`;
