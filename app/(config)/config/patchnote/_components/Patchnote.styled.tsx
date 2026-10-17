import { styled } from "styled-components";

// 웹 모드: 내부 스크롤 대신 페이지 스크롤을 사용한다.
export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  padding: 40px;
  gap: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border02};
  border-radius: ${({ theme }) => theme.rounded.base};
  color: ${({ theme }) => theme.colors.content};

  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
