import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  gap: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border02};
  border-radius: ${({ theme }) => theme.rounded.base};
  color: ${({ theme }) => theme.colors.content};

  ${({ theme }) => theme.device.mobile} {
    padding-bottom: 50px;
  }
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
  }
`;

export const List = styled.ul`
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  margin-left: 20px;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  color: ${({ theme }) => theme.colors.brand};
`;

export const HideButton = styled.button`
  display: flex;
  position: absolute;
  align-items: center;
  gap: 10px;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.rounded.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
  cursor: pointer;
  background-color: transparent;
  border: 0px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.content10};
  }

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  height: ${({ theme }) => theme.fonts.size.lg};
`;
