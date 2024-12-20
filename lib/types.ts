export interface ChannelType {
  channelId: string;
  channelImageUrl: string;
  channelName: string;
  verifiedMark: boolean;
  followerCount: number;
}

export interface ViewerType {
  userIdHash: string;
  badges: string[];
  nickname: string;
  subscribe: boolean;
}

export interface VoteType {
  id: number;
  name: string;
  viewers: ViewerType[];
}

export interface ViewersConfigType {
  subscribe: boolean;
  duplicate: boolean;
}

export interface TimeType {
  start: Date | null;
  end: Date | null;
}
