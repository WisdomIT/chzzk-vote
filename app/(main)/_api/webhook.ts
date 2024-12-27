"use server";

import { discord } from "@/lib/discord";
import { ChannelType } from "@/lib/types";

export async function webhook(type: string, channel: ChannelType) {
  const response = await discord({
    type,
    channel,
  });

  return response.ok;
}
