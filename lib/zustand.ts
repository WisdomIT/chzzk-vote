import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ChannelType {
  channelId: string;
  channelImageUrl: string;
  channelName: string;
  verifiedMark: boolean;
  followerCount: number;
}

interface GlobalOptionState {
  channel: ChannelType;
  voice: string;
  theme: string;
}

interface GlobalOptionActions {
  setChannel: (channel: ChannelType) => void;
  setVoice: (voice: string) => void;
  setTheme: () => void;
}

export const useGlobalOptionStore = create<GlobalOptionState & GlobalOptionActions>()(
  devtools(
    persist(
      (set) => ({
        channel: {
          channelId: '',
          channelImageUrl: '',
          channelName: '',
          verifiedMark: false,
          followerCount: 0
        },
        voice: '',
        theme: 'dark',

        setChannel: (channel: ChannelType) => set({ channel }),
        setVoice: (voice: string) => set({ voice }),
        setTheme: () => set(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' })),
      }),
      {
        name: 'globalOption' // localStorage에 저장될 이름
      },
    ),
  ),
);