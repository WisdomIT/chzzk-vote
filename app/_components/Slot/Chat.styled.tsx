"use client";

import { styled } from "styled-components";
import { PopupBackground } from "../Main/Popup";

export const Container = styled(PopupBackground)`
  gap: 20px;
`;

export const Viewer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-width: 1px;
  height: 100px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.background01};
  border-top: 1px solid ${({ theme }) => theme.colors.border01};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border01};
`;

export const ViewerBadge = styled.img`
  width: 40px;
  height: 40px;
`;

export const ViewerName = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["5xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.truncate};
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  padding: 30px;
  border-radius: ${({ theme }) => theme.rounded.base};
  animation: ${({ theme }) => theme.animation.viewers} 0.5s;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.background01};
  border: ${({ theme }) => theme.colors.border01};
`;

export const Balloon = styled.p`
  display: inline-block;
  padding: 20px 14px;
  font-weight: 1px solid ${({ theme }) => theme.fonts.weight.semibold};
  font-size: 1px solid ${({ theme }) => theme.fonts.size.xl};
  line-height: 1px solid ${({ theme }) => theme.fonts.lineHeight.none};
  border-radius: ${({ theme }) => theme.rounded.base};
  border-top-left-radius: 0px;
  background-color: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.black};
  animation: ${({ theme }) => theme.animation.appearUp} 0.2s;
`;

export const ChatBottom = styled.div``;
