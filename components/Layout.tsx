import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGlobalOptionStore } from "@/lib/zustand";

const Frame = styled.div`
  display: block;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  flex-direction: row;
  padding: 0px 30px;

  .dark & {
    border-bottom: 1px solid var(--color-stroke-01);
  }

  .light & {
    border-bottom: 1px solid var(--color-stroke-light-01);
  }

  @media ${device.mobile} {
    padding: 0px 10px;
  }
`

const NavTitle = styled(Link)`
  font: 800 20px/1 var(--font-default);
  padding: 10px 2px;
  border-radius: 8px;

  .dark & {
    color: var(--color-white);

    &:hover {
      background-color: var(--color-white-10);
    }
  }

  .light & {
    &:hover {
      background-color: var(--color-black-10);
    }
  }

`

const NavInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const NavBtn = styled.a`
  width: 36px;
  height: 36px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  .dark & {
    &:hover {
      background-color: var(--color-white-10);
    }
  }

  .light & {
    &:hover {
      background-color: var(--color-black-10);
    }
  }
`

const NavIcon = styled.i`
  font-size: 20px;

  .dark & {
    color: var(--color-white);
  }
`

const NavChannel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-left: 20px;
  max-width: 400px;
  padding: 0 10px;
  border-radius: 8px;
  cursor: pointer;

  .dark & {
    &:hover {
      background-color: var(--color-white-10);
    }
  }

  .light & {
    &:hover {
      background-color: var(--color-black-10);
    }
  }

  @media ${device.mobile} {
    display: none;
  }
`

const NavChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 3px;

  .dark & {
    border: 3px solid var(--color-stroke-02);
  }

  .light & {
    border: 2px solid var(--color-stroke-light-02);
  }
`

const NavChannelName = styled.p`
  font: 800 14px/1 var(--font-default);
  ${ truncate }
`

const NavChannelVerified = styled.img`
  width: 14px;
  height: 14px;
`

const GNB = () => {

  const { channel, theme, setTheme } = useGlobalOptionStore()
  const router = useRouter()

  return <Nav>
    <NavInner>
      <NavTitle href="/">치지직 투표 추첨기</NavTitle>
      {
        channel.channelId !== "" && <NavChannel onClick={() => router.push('/config')}>
        <NavChannelImg src={channel.channelImageUrl} />
        <NavChannelName>{channel.channelName}</NavChannelName>
        {
          channel.verifiedMark && <NavChannelVerified src="/verified.png" />
        }
      </NavChannel>
      }
      
    </NavInner>
    <NavInner>
      <NavBtn onClick={setTheme}>{ theme === 'dark'
        ? <NavIcon className="fa-sharp fa-regular fa-sun-bright" />
        : <NavIcon className="fa-sharp fa-regular fa-moon" />
      }</NavBtn>
      <NavBtn onClick={() => router.push('/config')}><NavIcon className="fa-sharp fa-regular fa-gear" /></NavBtn>
    </NavInner>
  </Nav>
}

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 180px);

  @media ${device.mobile} {
    height: auto;
  }
`

const FooterFrame = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 120px;
  padding: 40px;

  .dark & {
    border-top: 1px solid var(--color-stroke-01);
  }

  .light & {
    border-top: 1px solid var(--color-stroke-light-01);
  }

  @media ${device.mobile} {
    flex-direction: column;
    gap: 20px;
    height: auto;
    padding: 40px 10px;
  }
`

const FooterLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`

const Copyright = styled.p`

  .dark & {
    font: 600 12px/1.5 var(--font-default);
    color: var(--color-white);
  }

  .light & {
    font: 800 12px/1.5 var(--font-default);
    color: var(--color-black);
  }
`

const Thirdparty = styled.p`
  font: 600 12px/1.5 var(--font-default);

  .dark & {
    color: var(--color-white-50);
  }

  .light & {
    color: var(--color-black-50);
  }
`

const SpecialThanks = styled.p`
  font: 600 12px/1.5 var(--font-default);

  .dark & {
    color: var(--color-white-50);
  }

  .light & {
    color: var(--color-black-50);
  }
`

const FooterLink = styled(Link)`
  &:hover {
    text-decoration: underline;

    .dark & {
      color: var(--color-brand);
    }

    .light & {
      color: var(--color-brand-light);
      font-weight: 800;
    }
  }
`

const Footer = () => {
  return <FooterFrame>
    <FooterLeft>
      <Copyright>© <FooterLink href="https://www.discord.com/users/901304044767834123" target="_blank">WisdomIT</FooterLink></Copyright>
      <Thirdparty>치지직 투표 추첨기는 <FooterLink href="https://chzzk.naver.com/" target="_blank">치지직</FooterLink>의 써드파티 사이트로, 치지직에서 운영하는 사이트가 아닙니다<br/>“치지직”은 NAVER Corp.의 등록 상표입니다</Thirdparty>
    </FooterLeft>
    <SpecialThanks>Special thanks to. <FooterLink href="https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc" target="_blank">빅헤드</FooterLink> <FooterLink href="https://chzzk.naver.com/219d8e65810a77d6e42c7df018d9632b" target="_blank">마뫄</FooterLink></SpecialThanks>
  </FooterFrame>
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

  const router = useRouter()
  const { channel } = useGlobalOptionStore()

  useEffect(() => {

    if(channel.channelId === '' && router.asPath !== '/sign'){
      router.push('/sign')
    }

  },[router.asPath])

  return <Frame>
    <GNB />
    <Main>
      {props.children}
    </Main>
    <Footer />
  </Frame>
}

export default Layout