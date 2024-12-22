import styled from "styled-components";

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  animation: ${({ theme }) => theme.animation.appearUp} 0.5s;

  ${({ theme }) => theme.device.mobile} {
    width: auto;
    height: 100vh;
    justify-content: initial;
    align-items: center;
    overflow-y: auto;
    padding: 80px 20px;
  }

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 100vh;
    justify-content: initial;
    align-items: center;
    overflow-y: auto;
    padding: 80px 20px;
  }
`;

export const ErrorCode = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: 10vw;
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content10};

  ${({ theme }) => theme.device.tablet} {
    font-size: 20vw;
  }

  ${({ theme }) => theme.device.mobile} {
    font-size: 40vw;
  }
`;

export const ErrorMessage = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;
