import { ChzzkClient } from "chzzk";
import { ChannelType } from "./types";

function isValidText(text: string): boolean {
  // 정규 표현식을 사용하여 32자의 영어 알파벳(대소문자 구분 없음)과 숫자로만 이루어져 있는지 확인
  const regex = /^[A-Za-z0-9]{32}$/;
  return regex.test(text);
}

function getLastPathSegment(input: string): string {
  try {
    const url = new URL(input);
    const pathSegments = url.pathname.split("/");
    return pathSegments.filter(Boolean).pop() || input;
  } catch {
    return input;
  }
}

export default async function chzzkFind(
  url: string
): Promise<ChannelType | null> {
  const getLastPath = getLastPathSegment(url);
  const isValidUrl = isValidText(getLastPath);

  if (!isValidUrl) {
    return null;
  }

  const options = {
    baseUrls: {
      chzzkBaseUrl: "/api/proxy/chzzkBase",
      gameBaseUrl: "/api/proxy/gameBase",
    },
  };

  const client = new ChzzkClient(options);

  const findChannel = await client.channel(getLastPath);

  if (findChannel === null) {
    return null;
  }

  const channelData = {
    channelId: findChannel.channelId,
    channelImageUrl: findChannel.channelImageUrl
      ? findChannel.channelImageUrl
      : "",
    channelName: findChannel.channelName,
    verifiedMark: findChannel.verifiedMark,
    followerCount: findChannel.followerCount,
  };

  return channelData;
}
