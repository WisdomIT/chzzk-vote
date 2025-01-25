import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  animation: ${({ theme }) => theme.animation.appearUp} 0.5s;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    justify-content: initial;
    padding: 80px 20px;
  }
`;

export const Btns = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const ContainerCenter = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
