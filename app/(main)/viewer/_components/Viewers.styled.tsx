import { keyframes, styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export const ViewersContainer = styled.div<{ $active?: boolean }>`
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.rounded.base};
  animation-name: ${({ theme }) => theme.animation.viewers};
  animation-duration: ${({ $active }) => ($active ? "0.5s" : "0s")};
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border01};
`;

const AppearUpOpacity = keyframes`
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 0.3;
      transform: translateY(0px);
    }
  `;

export const Viewer = styled.button<{ $active: boolean }>`
  display: inline-block;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.rounded.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  animation: ${({ $active, theme }) =>
      $active ? theme.animation.appearUp : AppearUpOpacity}
    0.2s;
  opacity: ${({ $active }) => ($active ? "1" : "0.3")};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.content};

  border: 1px solid ${({ theme }) => theme.colors.border01};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.content10};
  }

  &:last-child {
    margin-right: 0px;
  }
`;

export const ViewerBadge = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 2px;
  vertical-align: middle;
`;

export const ViewersBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 20px;
  animation: ${({ theme }) => theme.animation.appearUp} 0.2s;
`;

export const ViewerBottomText = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;
