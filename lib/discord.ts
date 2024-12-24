export async function discord({
  type,
  name,
  url,
  thumbnail,
}: {
  type: string;
  name: string;
  url: string;
  thumbnail: string;
}) {
  const webhook = process.env.DISCORD_WEBHOOK ?? "";

  const payload = {
    content: null,
    embeds: [
      {
        title: name,
        description: url,
        color: null,
        author: {
          name: type,
        },
        image: {
          url: thumbnail,
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
