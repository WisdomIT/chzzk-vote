import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 4px solid ${({ theme }) => theme.colors.red};
  border-radius: ${({ theme }) => theme.rounded.base};
  padding: 20px;
  width: 100%;
  max-width: 1000px;
  text-align: center;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
`;

export const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.red};
  height: ${({ theme }) => theme.fonts.size["2xl"]};
  margin: 0px 8px;
`;
