import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChannelType } from "./types";
import chzzkFind from "./chzzkFind";

interface GlobalOptionState {
  channel: ChannelType;
  voice: string;
  theme: "dark" | "light";
  zoom: number;
  hydrated: boolean;
}

interface GlobalOptionActions {
  setChannel: (channel: ChannelType) => void;
  setVoice: (voice: string) => void;
  setTheme: () => void;
  setZoom: (zoom: number) => void;
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
        zoom: 100,
        hydrated: false,

        setChannel: (channel: ChannelType) => set({ channel }),
        setVoice: (voice: string) => set({ voice }),
        setTheme: () =>
          set((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
          })),
        setZoom: (zoom: number) => set({ zoom }),
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
