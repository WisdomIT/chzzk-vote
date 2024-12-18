import { styled } from "styled-components";

export const ChannelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.rounded.half};
  padding: 4px;

  background-color: ${({ theme }) => theme.colors.background01};
  border: 4px solid ${({ theme }) => theme.colors.border01};

  ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Name = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.extrabold};
  font-size: ${({ theme }) => theme.fonts.size["6xl"]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

export const Verified = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 10px;

  ${({ theme }) => theme.device.mobile} {
    width: 14px;
    height: 14px;
  }
`;

export const Followers = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  line-height: ${({ theme }) => theme.fonts.lineHeight.none};

  ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

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
