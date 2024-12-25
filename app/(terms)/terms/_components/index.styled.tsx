import { styled } from "styled-components";

export const Container = styled.div`
  padding: 100px 0px;
  text-align: center;

  ${({ theme }) => theme.device.mobile} {
    padding: 40px 0px;
  }
`;

export const ContainerCenter = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  max-width: 1600px;
  padding: 40px;
  margin: 0px 10px;
  margin-top: 40px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border02};
  border-radius: ${({ theme }) => theme.rounded.base};
  color: ${({ theme }) => theme.colors.content};
  text-align: left;
  word-break: keep-all;

  ${({ theme }) => theme.device.mobile} {
    max-height: fit-content;
    padding: 20px;
  }
`;

export const PageTitle = styled.h1`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  word-break: keep-all;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`;

export const Title = styled.h2`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  margin-top: 20px;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
  }
`;

export const UnorderedList = styled.ul`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  margin: 10px 0px;
  margin-left: 20px;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const OrderedList = styled.ol`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
  margin: 10px 0px;
  margin-left: 20px;

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

export const Text = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  line-height: ${({ theme }) => theme.fonts.lineHeight.normal};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;
