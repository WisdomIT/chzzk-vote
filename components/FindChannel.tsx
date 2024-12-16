import styled from "styled-components";
import { size, device, truncate } from "@/styles/style";
import { PopupBackground } from "@/components/Popup";
import Btn from "@/components/Btn";
import { ChannelType } from "@/lib/types";

const Background = styled(PopupBackground)`
  gap: 100px;
`;

const Block = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 1px;
  flex-direction: row;
  padding: 20px 40px;
  gap: 40px;
  align-items: center;
  border-radius: 8px;

  .dark & {
    background-color: var(--color-background-01);
    border: 1px solid var(--color-stroke-01);
  }

  .light & {
    background-color: var(--color-white);
    border: 1px solid var(--color-stroke-light-01);
  }

  @media ${device.mobile} {
    padding: 10px 20px;
    gap: 20px;
  }
`;

const ChannelImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 4px;

  .dark & {
    background-color: var(--color-background-01);
    border: 4px solid var(--color-stroke-01);
  }

  .light & {
    background-color: var(--color-white);
    border: 4px solid var(--color-stroke-light-01);
  }

  @media ${device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.p`
  font: 800 48px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 20px/1 var(--font-default);
  }
`;

const Verified = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 10px;

  @media ${device.mobile} {
    width: 14px;
    height: 14px;
  }
`;

const Followers = styled.p`
  font: 600 20px/1 var(--font-default);

  @media ${device.mobile} {
    font: 800 14px/1 var(--font-default);
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 20px;
`;

function formatNumber(number: number): string {
  if (number <= 10000) {
    return number.toString();
  } else {
    const tenThousands = number / 10000;
    return `${tenThousands.toFixed(1)}만`;
  }
}

type FindChannelType = {
  find: ChannelType;
  onCancel: () => void;
  onAccept: (find: ChannelType) => void;
};

const FindChannel = (props: FindChannelType) => {
  const { find, onCancel, onAccept } = props;

  return (
    <Background>
      <Block>
        <ChannelImage>
          <Image src={find.channelImageUrl} />
        </ChannelImage>
        <Info>
          <Name>
            {find.channelName}
            {find.verifiedMark && <Verified src="/verified.png" />}
          </Name>
          <Followers>팔로워 {formatNumber(find.followerCount)}명</Followers>
        </Info>
      </Block>
      <Btns>
        <Btn $type="line" $width={260} onClick={onCancel}>
          다시 검색하기
        </Btn>
        <Btn $type="default" $width={260} onClick={() => onAccept(find)}>
          등록하기
        </Btn>
      </Btns>
    </Background>
  );
};

export default FindChannel;
