import styled from "styled-components";

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  animation: ${({ theme }) => theme.animation.appearUp} 0.5s;

  ${({ theme }) => theme.device.mobile} {
    width: auto;
    height: 100vh;
    justify-content: initial;
    align-items: center;
    overflow-y: auto;
    padding: 60px 0px;
  }

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 100vh;
    justify-content: initial;
    align-items: center;
    overflow-y: auto;
    padding: 60px 0px;
  }
`;

export const Btns = styled.div`
  display: flex;
  gap: 20px;
`;
