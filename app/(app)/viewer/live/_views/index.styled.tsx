import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 40px;
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

export const Btns = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const Seconds = styled.p`
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
`;
