"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useGlobalOptionStore } from "@/lib/zustand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  height: 100px;
  color: ${({ theme }) => theme.colors.content10};
  animation: ${Animation} 3s linear infinite;
`;

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useGlobalOptionStore((state) => state.hydrated);
  const channel = useGlobalOptionStore((state) => state.channel);
  const router = useRouter();

  useEffect(() => {
    // hydration이 완료되고, channelId가 없을 때만 리다이렉트
    if (hydrated && !channel.channelId) {
      console.log("Redirecting to /sign"); // 디버깅용
      router.replace("/sign");
    }
  }, [hydrated, channel.channelId, router]);

  useEffect(() => {
    if (channel.channelId !== "" && window.gtag) {
      window.gtag("set", {
        user_id: channel.channelId,
        user_name: channel.channelName,
      });
      window.gtag("event", "page_view", {
        user_id: channel.channelId,
        user_name: channel.channelName,
      });
    }
  }, [channel.channelId]);

  // hydration이 완료되지 않았다면 로딩 상태를 보여줄 수 있습니다
  if (!hydrated) {
    return (
      <Container>
        <Icon icon={faSpinnerThird} height={100} />
      </Container>
    );
  }

  return <>{children}</>;
}
