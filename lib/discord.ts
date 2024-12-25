import { ChannelType } from "./types";

export async function discord({
  type,
  channel,
}: {
  type: string;
  channel: ChannelType;
}) {
  const webhook = process.env.DISCORD_WEBHOOK ?? "";
  const userid = process.env.DISCORD_USERID ?? "";

  const payload = {
    content: channel.followerCount > 50000 ? `<@${userid}>` : null,
    embeds: [
      {
        title: channel.channelName,
        description: `https://chzzk.naver.com/live/${channel.channelId}`,
        color: null,
        author: {
          name: type,
        },
        image: {
          url: channel.channelImageUrl,
        },
      },
    ],
    attachments: [],
  };

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to send webhook: ${response.statusText}`);
  }

  return response;
}
