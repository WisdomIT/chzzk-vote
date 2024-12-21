"use client";

import React from "react";
import { ChatEvent, ChzzkChat, DonationEvent, type Profile } from "chzzk";
import { ViewerType } from "@/lib/types";
import { styled } from "styled-components";

type ChatHandler = (
  viewer: ViewerType,
  message: JSX.Element,
  messageString: string
) => void;

type DonationHandler = (
  viewer: ViewerType,
  message: JSX.Element,
  messageString: string,
  price: number
) => void;

type ChatMessageResult = {
  message: JSX.Element;
  messageString: string;
};

type UseChzzkChatProps = {
  channelId: string;
  onChat?: ChatHandler;
  onDonation?: DonationHandler;
  baseUrls?: {
    chzzkBaseUrl: string;
    gameBaseUrl: string;
  };
  pollInterval?: number;
};

function profileToBadges(profile: Profile): string[] {
  const badges: string[] = [];

  if (profile.badge) {
    badges.push(profile.badge.imageUrl);
  }

  if (profile.streamingProperty.subscription) {
    badges.push(profile.streamingProperty.subscription.badge.imageUrl);
  }

  for (let e of profile.activityBadges) {
    badges.push(e.imageUrl);
  }

  return badges;
}

function profileToViewer(profile: Profile): ViewerType {
  return {
    userIdHash: profile.userIdHash,
    badges: profileToBadges(profile),
    nickname: profile.nickname,
    subscribe: Boolean(profile.streamingProperty.subscription),
  };
}

const BalloonEmoji = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

function chatToMessage(chat: ChatEvent | DonationEvent): ChatMessageResult {
  let voice: string[] = [];
  let elements: JSX.Element[] = [];

  const regex = /{:(.*?):}/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = regex.exec(chat.message)) !== null) {
    if (chat.extras && chat.extras.emojis !== "") {
      // 이전 매치와 현재 매치 사이의 텍스트 추가
      if (lastIndex < match.index) {
        const text = chat.message.substring(lastIndex, match.index);
        elements.push(
          React.createElement("span", { key: `text-${lastIndex}` }, text)
        );
        voice.push(chat.message.substring(lastIndex, match.index));
      }

      const emojiKey = match[1];
      const emojiUrl = chat.extras.emojis[emojiKey];

      // 이모티콘 이미지 태그 추가
      if (emojiUrl) {
        elements.push(
          React.createElement(BalloonEmoji, {
            key: `emoji-${match.index}`,
            src: emojiUrl,
            alt: emojiKey,
          })
        );
      }

      lastIndex = match.index + match[0].length;
    }
  }

  // 마지막 매치 이후의 텍스트 추가
  if (lastIndex < chat.message.length) {
    const remainingText = chat.message.substring(lastIndex);
    elements.push(
      React.createElement("span", { key: `text-${lastIndex}` }, remainingText)
    );
    voice.push(chat.message.substring(lastIndex));
  }

  return {
    message: React.createElement("span", {}, elements),
    messageString: voice.join(" "),
  };
}

export default function useChzzkChat({
  channelId,
  onChat,
  onDonation,
  baseUrls = {
    chzzkBaseUrl: "/api/proxy/chzzkBase",
    gameBaseUrl: "/api/proxy/gameBase",
  },
  pollInterval = 30 * 1000,
}: UseChzzkChatProps) {
  const handleChatEvent = (chat: ChatEvent) => {
    if (!onChat) return;
    const viewer = profileToViewer(chat.profile);
    const { message, messageString } = chatToMessage(chat);
    onChat(viewer, message, messageString);
  };

  const handleDonationEvent = (chat: DonationEvent) => {
    if (!onDonation || !chat.profile) return;
    const viewer = profileToViewer(chat.profile);
    const { message, messageString } = chatToMessage(chat);
    const price = chat.extras.payAmount;
    onDonation(viewer, message, messageString, price);
  };

  const options = {
    channelId,
    pollInterval,
    baseUrls,
  };

  const client = new ChzzkChat(options);

  client.on("connect", () => {
    console.log("[chzzk] Chat Connected");
  });

  if (onChat) {
    client.on("chat", handleChatEvent);
  }

  if (onDonation) {
    client.on("donation", handleDonationEvent);
  }

  client.connect();

  return client;
}
