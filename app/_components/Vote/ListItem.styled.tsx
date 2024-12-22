import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 1px;
  flex: 1;
`;

export const InfoIndex = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const InfoName = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  ${({ theme }) => theme.truncate};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

export const Percentage = styled.button`
  position: relative;
  flex: 2;
  height: 60px;
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background02};
  border: none;
  text-align: left;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  ${({ theme }) => theme.device.mobile} {
    flex: auto;
    height: 48px;
  }
`;

export const PercentageText = styled.p`
  padding: 14px;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};

  ${({ theme }) => theme.device.mobile} {
    padding: 10px;
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`;

export const PercentageCurrent = styled.div<{ $width: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.$width}%;
  background-color: ${({ theme }) => theme.colors.brand};
  border-radius: ${({ theme }) => theme.rounded.base};
  overflow: hidden;

  transition: width 0.2s;
`;

export const PercentageCurrentText = styled.p`
  padding: 14px;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.black};
  width: 400px;
  height: 100%;

  ${({ theme }) => theme.device.mobile} {
    padding: 10px;
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`;

export const TextPercentage = styled.span`
  font-size: 20px;
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fonts.size.xl};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
  }
`;

export const PercentageHidden = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content50};
`;
