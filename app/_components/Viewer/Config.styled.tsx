import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;
