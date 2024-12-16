# 치지직 투표 추첨기 - CHZZK VOTE

[사이트 바로가기](https://chzzk-vote.vercel.app/)

## 소개

치지직(네이버 스트리밍 플랫폼) 채팅 연계 추첨, 투표 서비스 CHZZK VOTE입니다!  
본 서비스는 다음과 같은 기능을 제공합니다.

### 시청자 추첨

- 방송 시청자 중 한명 (혹은 여러명)을 랜덤으로 추첨하는 기능입니다.
- 추첨 시 구독자만 추첨하거나 이미 당첨된 시청자는 제외하는 옵션이 있습니다.

### 숫자 투표

- 스트리머가 투표 항목을 작성하고, 시청자들이 채팅으로 항목에 투표할 수 있는 기능입니다.
- !투표1, !투표2 와 같이 채팅을 치면 해당 항목에 투표됩니다.
- 투표 후 해당 항목을 클릭하면 투표에 참여한 사람의 목록을 확인할 수 있고, 그 안에서 추첨할 수 있습니다.

### 도네 투표

- 스트리머가 투표 항목을 작성하고, 시청자들이 도네로 항목에 투표할 수 있는 기능입니다.
- 도네 시 메시지 앞에 !투표1, !투표2 를 붙이면 해당 항목에 투표됩니다.
- 가격에 따른 복수투표를 허용할 수 있습니다.

### 룰렛

- 투표 항목과 가중치를 설정하면 룰렛이 설정되며, 룰렛을 돌려 추첨할 수 있습니다.
- 숫자 투표와 도네 투표 완료 시 해당 결과를 룰렛 항목으로 가져올 수 있습니다.

## 개발

본 프로젝트는 다음과 같은 주요 모듈을 포함하고 있습니다.

- [Next.js](https://nextjs.org/) - React기반 웹 프레임워크
- [chzzk](https://github.com/kimcore/chzzk) - 치지직 비공식 API 라이브러리
- [zustand](https://github.com/pmndrs/zustand) - 채널ID 등 설정 상태관리를 위한 전역 상태관리 라이브러리
- [styled-components](https://styled-components.com/) - 스타일링 라이브러리
- [react-custom-roulette](https://github.com/effectussoftware/react-custom-roulette) - 룰렛 기능 라이브러리
- [react-confetti-explosion](https://github.com/herrethan/react-confetti-explosion) - 추첨 시 팡파레 효과 연출용 라이브러리

## Copyright

© [WisdomIT](https://discord.com/users/901304044767834123)

치지직 투표 추첨기는 치지직의 써드파티 사이트로, 치지직에서 운영하는 사이트가 아닙니다  
“치지직”은 NAVER Corp.의 등록 상표입니다

Special thanks to. [빅헤드](https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc) [마뫄](https://chzzk.naver.com/219d8e65810a77d6e42c7df018d9632b)

## 후원

[후원하기](https://toon.at/donate/wisdomit)

본 서비스가 방송에 도움이 되었다면 후원을 고려해주세요!  
후원하신 금액은 서비스의 유지에 사용됩니다.
