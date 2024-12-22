import { useGlobalOptionStore } from "@/lib/zustand";
import {
  Container,
  Title,
  NavInner,
  NavLink,
  NavButton,
  Icon,
  Channel,
  ChannelImg,
  ChannelName,
  ChannelVerified,
} from "./Header.styled";
import {
  faGear,
  faMoon,
  faSunBright,
} from "@awesome.me/kit-8710ef4103/icons/sharp/regular";

export default function Header() {
  const { channel, theme, setTheme } = useGlobalOptionStore();

  return (
    <Container>
      <NavInner>
        <Title href="/">치지직 투표 추첨기</Title>
        {channel.channelId !== "" && (
          <Channel href="/config/channel">
            <ChannelImg src={channel.channelImageUrl} />
            <ChannelName>{channel.channelName}</ChannelName>
            {channel.verifiedMark && <ChannelVerified src="/verified.png" />}
          </Channel>
        )}
      </NavInner>
      <NavInner>
        <NavButton onClick={setTheme}>
          {theme === "dark" ? (
            <Icon icon={faSunBright} />
          ) : (
            <Icon icon={faMoon} />
          )}
        </NavButton>
        <NavLink href="/config">
          <Icon icon={faGear} />
        </NavLink>
      </NavInner>
    </Container>
  );
}
