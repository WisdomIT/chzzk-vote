import styled from "styled-components";

// 웹 모드: 높이를 고정하지 않고 콘텐츠만큼 늘어나야 페이지 스크롤이 동작한다.
// (height: 100% + center는 콘텐츠가 뷰포트를 넘으면 위아래가 잘린다)
export const Container = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 100px 40px 40px;
  animation: ${({ theme }) => theme.animation.appearUp} 0.5s;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    justify-content: initial;
    padding: 80px 20px;
  }
`;

export const Btns = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const ContainerCenter = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
