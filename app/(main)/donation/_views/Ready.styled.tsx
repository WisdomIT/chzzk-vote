import { styled } from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  flex-grow: 0;
`;

export const ListScroll = styled.div<{ $zoom: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh * ${({ $zoom }) => 100 / $zoom} - 800px);
  overflow-y: auto;
  flex-grow: 0;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
  }
`;

export const ListScrollEnd = styled.div`
  margin-top: -20px;
`;

export const Timers = styled.div`
  display: flex;
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
