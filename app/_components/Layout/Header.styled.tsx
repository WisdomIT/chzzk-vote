"use client";

import Link from "next/link";
import { styled } from "styled-components";
import { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  flex-direction: row;
  padding: 0px 30px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border01};

  ${({ theme }) => theme.device.mobile} {
    padding: 0px 10px;
  }
`;

export const Title = styled(Link)`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  padding: 10px 4px;
  border-radius: ${({ theme }) => theme.rounded.base};
  color: ${({ theme }) => theme.colors.content};

  &:hover {
    background-color: ${({ theme }) => theme.colors.content10};
  }
`;

export const NavInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const BtnStyle = css`
  width: 36px;
  height: 36px;
  padding: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background01};
  border: none;
  border-radius: ${({ theme }) => theme.rounded.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.content10};
  }
`;

export const NavLink = styled(Link)`
  ${BtnStyle}
`;

export const NavButton = styled.button`
  ${BtnStyle}
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  color: ${({ theme }) => theme.colors.content};
`;

export const Channel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-left: 20px;
  max-width: 400px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.rounded.base};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.content10};
  }

  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.rounded.half};
  padding: 3px;

  border: 3px solid ${({ theme }) => theme.colors.border02};
`;

export const ChannelName = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  ${({ theme }) => theme.truncate}
`;

export const ChannelVerified = styled.img`
  width: 14px;
  height: 14px;
`;
