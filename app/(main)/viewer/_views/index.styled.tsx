import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 60px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  animation: ${({ theme }) => theme.animation.appearUp} 0.3s;

  ${({ theme }) => theme.device.mobile} {
    padding: 80px 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

export const Config = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;
