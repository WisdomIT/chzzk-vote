import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChannelType } from "./types";
import chzzkFind from "./chzzkFind";

interface GlobalOptionState {
  channel: ChannelType;
  voice: string;
  theme: "dark" | "light";
  hydrated: boolean;
}

interface GlobalOptionActions {
  setChannel: (channel: ChannelType) => void;
  setVoice: (voice: string) => void;
  setTheme: () => void;
  setHydrated: (hydrated: boolean) => void;
  refreshChannel: (channelId: string) => void;
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
        hydrated: false,

        setChannel: (channel: ChannelType) => set({ channel }),
        setVoice: (voice: string) => set({ voice }),
        setTheme: () =>
          set((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
          })),
        setHydrated: (hydrated: boolean) => set({ hydrated }),
        refreshChannel: async (channelId: string) => {
          const channel = await chzzkFind(channelId);
          if (!channel) return;
          set({ channel });
        },
      }),
      {
        name: "globalOption", // localStorage에 저장될 이름
        onRehydrateStorage: () => (state) => {
          // hydration이 완료되면 호출되는 콜백
          setTimeout(() => {
            const store = useGlobalOptionStore.getState();
            store.setHydrated(true);
            if (store.channel.channelId) {
              store.refreshChannel(store.channel.channelId);
            }
          }, 10);
        },
      }
    )
  )
);
