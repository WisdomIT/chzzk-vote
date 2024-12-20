"use client";

import { ViewersConfigType, ViewerType } from "@/lib/types";
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
  animation,
  message,
  onSelect,
}: {
  viewers: ViewerType[];
  drawn: ViewerType[];
  config: ViewersConfigType;
  animation?: boolean;
  message?: string;
  onSelect: (viewer: ViewerType) => void;
}) {
  return (
    <Container>
      <ViewersContainer $animation={animation}>
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
        {message ? <ViewerBottomText>{message}</ViewerBottomText> : null}
      </ViewersBottom>
    </Container>
  );
}
