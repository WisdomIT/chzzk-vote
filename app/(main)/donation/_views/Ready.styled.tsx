import { styled } from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

export const ListScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh - 720px);
  overflow-y: auto;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;

export const ListScrollEnd = styled.div`
  margin-top: -20px;
`;
