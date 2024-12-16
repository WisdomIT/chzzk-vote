import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChannelType } from "./types";

interface GlobalOptionState {
  channel: ChannelType;
  voice: string;
  theme: "dark" | "light";
}

interface GlobalOptionActions {
  setChannel: (channel: ChannelType) => void;
  setVoice: (voice: string) => void;
  setTheme: () => void;
}

export const useGlobalOptionStore = create<
  GlobalOptionState & GlobalOptionActions
>()(
  devtools(
    persist(
      (set) => ({
        channel: {
          channelId: "",
          channelImageUrl: "",
          channelName: "",
          verifiedMark: false,
          followerCount: 0,
        },
        voice: "",
        theme: "dark",

        setChannel: (channel: ChannelType) => set({ channel }),
        setVoice: (voice: string) => set({ voice }),
        setTheme: () =>
          set((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
          })),
      }),
      {
        name: "globalOption", // localStorage에 저장될 이름
      }
    )
  )
);
