import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Text = styled.p`
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  word-break: keep-all;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.button<{
  $recommanded: boolean;
  $selected: boolean;
}>`
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${({ $recommanded, $selected, theme }) =>
      $recommanded || $selected ? theme.colors.brand : theme.colors.content};
  opacity: ${({ $recommanded, $selected }) =>
    $recommanded || $selected ? "1" : "0.3"};
  border-radius: ${({ theme }) => theme.rounded.base};
  padding: 20px;
  gap: 10px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : "transparent"};
  width: 240px;
  text-align: left;
  cursor: pointer;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const Lang = styled.p<{
  $selected: boolean;
}>`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black : theme.colors.content50};
`;

export const Name = styled.p<{
  $selected: boolean;
}>`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  color: ${({ theme }) => theme.colors.content};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black : theme.colors.content};
`;

export const Icon = styled(FontAwesomeIcon)<{
  $selected: boolean;
}>`
  align-self: flex-end;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black : theme.colors.content};
  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
