"use client";

import { faPenNib } from "@awesome.me/kit-8710ef4103/icons/sharp/regular";
import BreadcrumbsConfig from "../_components/BreadcrumbsConfig";
import Patchnote, { PatchnoteType } from "./_components/Patchnote";
import { Btns, Container, ContainerCenter } from "../_components/index.styled";
import MainLink from "@/app/_components/Main/MainLink";

export default function Page() {
  const patchnote: PatchnoteType[] = [
    {
      date: new Date("2024-03-27"),
      body: [
        "채팅창 종료 시 tts가 정상적으로 unmount 되지 않는 버그 수정",
        "시청자 추첨 시 추첨된 인원은 제외하는 옵션 추가",
        "채팅에서 이모티콘 사용 가능하도록 변경",
        "패치노트 버튼 추가",
      ],
    },
    {
      date: new Date("2024-11-19"),
      body: [
        "메인 페이지 툴팁 추가",
        "도네 투표 항목 추가 (양아지님 요청)",
        "투표 시 항목 갯수가 화면을 초과할 때 스크롤바가 나타나도록 수정",
      ],
    },
    {
      date: new Date("2024-11-20"),
      body: [
        "투표 결과 룰렛 이전기능 추가 (양아지님 요청)",
        "투표 결과 정렬기능 추가",
      ],
    },
    {
      date: new Date("2024-12-22"),
      body: [
        "전체 프로젝트 리팩토링",
        "전체 페이지 접근성 향상 및 모바일 뷰 대폭 수정",
      ],
    },
    {
      date: new Date("2024-12-27"),
      body: ["추첨 및 투표참여 성능 최적화", "채팅 에러 안내 문구 추가"],
    },
    {
      date: new Date("2025-01-06"),
      body: ["타이머 기능 추가"],
    },
    {
      date: new Date("2025-01-25"),
      body: ["채널 정보 자동 업데이트 기능 추가", "줌 기능 추가"],
    },
  ];

  return (
    <>
      <BreadcrumbsConfig icon={faPenNib} text="패치노트" />
      <Container>
        <Patchnote data={patchnote} />
        <Btns>
          <MainLink
            size="small"
            href="https://discord.gg/6nnJMe2gxD"
            target="_blank"
          >
            개발자에게 건의하기 (디스코드)
          </MainLink>
          <MainLink
            size="small"
            fillType="outlined"
            href="https://toon.at/donate/wisdomit"
            target="_blank"
          >
            후원하기 (투네이션)
          </MainLink>
        </Btns>
      </Container>
    </>
  );
}
