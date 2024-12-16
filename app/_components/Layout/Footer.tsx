"use client";

import {
  Container,
  Inner,
  Copyright,
  Thirdparty,
  SpecialThanks,
  FooterLink,
  Github,
} from "./Footer.styled";
import { faGithub } from "@awesome.me/kit-8710ef4103/icons/classic/brands";

export default function Footer() {
  return (
    <Container>
      <Inner>
        <Copyright>
          ©{" "}
          <FooterLink
            href="https://www.discord.com/users/901304044767834123"
            target="_blank"
          >
            WisdomIT
          </FooterLink>
        </Copyright>
        <Thirdparty>
          치지직 투표 추첨기는{" "}
          <FooterLink href="https://chzzk.naver.com/" target="_blank">
            치지직
          </FooterLink>
          의 써드파티 사이트로, 치지직에서 운영하는 사이트가 아닙니다
          <br />
          “치지직”은 NAVER Corp.의 등록 상표입니다
        </Thirdparty>
      </Inner>
      <Inner>
        <SpecialThanks>
          Special thanks to.{" "}
          <FooterLink
            href="https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc"
            target="_blank"
          >
            빅헤드
          </FooterLink>{" "}
          <FooterLink
            href="https://chzzk.naver.com/219d8e65810a77d6e42c7df018d9632b"
            target="_blank"
          >
            마뫄
          </FooterLink>
        </SpecialThanks>
        <FooterLink
          href="https://github.com/WisdomIT/chzzk-vote"
          target="_blank"
        >
          <Github icon={faGithub} height={20} />
        </FooterLink>
      </Inner>
    </Container>
  );
}
