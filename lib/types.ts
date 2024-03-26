export type ChannelType = {
  channelId: string,
  channelImageUrl: string,
  channelName: string,
  verifiedMark: boolean,
  followerCount: number
}

export type ViewerType = {
  userIdHash: string,
  badges: string[],
  nickname: string,
  subscribe: boolean
}

