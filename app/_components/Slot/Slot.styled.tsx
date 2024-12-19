import { styled } from "styled-components";

export const SlotContainer = styled.div<{ $height: number }>`
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  height: ${({ $height }) => `${$height}px`};

  background-color: ${({ theme }) => theme.colors.background01};
  border-top: 1px solid ${({ theme }) => theme.colors.border01};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border01};
`;

export const SlotItems = styled.div<{
  $duration: number;
  $translateY: number;
  $initAnimation: boolean;
}>`
  display: flex;
  flex-direction: column;
  transition: ${(props) =>
    props.$initAnimation
      ? `none`
      : `transform ${props.$duration - 200}ms ease-out`};
  transform: ${(props) => `translateY(-${props.$translateY}px)`};
`;

export const SlotItem = styled.div<{ $height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["5xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  height: ${(props) => `${props.$height}px`};
  gap: 8px;
`;

export const SlotItemBadge = styled.img`
  width: 40px;
  height: 40px;
`;

export const ConfettiFrame = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
`;

export const CompleteFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  align-items: stretch;
`;
