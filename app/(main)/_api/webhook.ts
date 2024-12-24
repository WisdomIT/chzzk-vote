"use server";

import { discord } from "@/lib/discord";
import { ChannelType } from "@/lib/types";

export async function webhook(type: string, channel: ChannelType) {
  const response = discord({
    type,
    name: channel.channelName,
    url: `https://chzzk.naver.com/live/${channel.channelId}`,
    thumbnail: channel.channelImageUrl,
  });
}
