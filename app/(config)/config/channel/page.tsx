"use client";

import { ChannelType } from "@/lib/types";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useState } from "react";
import BreadcrumbsConfig from "../_components/BreadcrumbsConfig";
import { faSignalStream } from "@awesome.me/kit-8710ef4103/icons/sharp/regular";
import Current from "./_views/Current";
import New from "./_views/New";

export default function Page() {
  const { channel, setChannel } = useGlobalOptionStore();

  const [newChannel, setNewChannel] = useState<ChannelType>({
    channelId: "",
    channelImageUrl: "",
    channelName: "",
    verifiedMark: false,
    followerCount: 0,
  });

  function handleReset() {
    setNewChannel({
      channelId: "",
      channelImageUrl: "",
      channelName: "",
      verifiedMark: false,
      followerCount: 0,
    });
  }

  return (
    <>
      <BreadcrumbsConfig icon={faSignalStream} text="채널 설정" />
      {newChannel.channelId === "" ? (
        <Current channel={channel} setChannel={setNewChannel} />
      ) : (
        <New
          channel={newChannel}
          setChannel={setChannel}
          onReset={handleReset}
        />
      )}
    </>
  );
}
