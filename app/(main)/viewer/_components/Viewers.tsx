"use client";

import { ViewerType } from "@/lib/types";
import {
  Container,
  ViewersContainer,
  Viewer,
  ViewerBadge,
  ViewersBottom,
  ViewerBottomText,
} from "./Viewers.styled";

export default function Viewers({
  viewers,
  drawn,
  config,
  active,
  onSelect,
}: {
  viewers: ViewerType[];
  drawn: ViewerType[];
  config: {
    subscribe: boolean;
    duplicate: boolean;
  };
  active?: boolean;
  onSelect: (viewer: ViewerType) => void;
}) {
  return (
    <Container>
      <ViewersContainer $active={active}>
        {viewers.map((e) => (
          <Viewer
            key={`viewer_${e.userIdHash}`}
            $active={
              (config.subscribe ? e.subscribe : true) &&
              (config.duplicate
                ? !drawn.find((item) => item.userIdHash === e.userIdHash)
                : true)
            }
            onClick={() => {
              onSelect(e);
            }}
          >
            {e.badges.map((e2, i2) => (
              <ViewerBadge
                key={`viewer_${e.userIdHash}_badge_${i2}`}
                src={e2}
              />
            ))}
            {e.nickname}
          </Viewer>
        ))}
      </ViewersContainer>
      <ViewersBottom>
        <ViewerBottomText>총 {viewers.length}명</ViewerBottomText>
        {active ? (
          <ViewerBottomText>
            채팅창에 아무 말이나 입력하시면 참여됩니다!
          </ViewerBottomText>
        ) : null}
      </ViewersBottom>
    </Container>
  );
}
