# CLAUDE.md

이 파일은 Claude Code(및 모든 기여자)가 이 저장소에서 작업할 때 반드시 따르는 규칙을 정의합니다.
작업을 시작하기 전에 이 문서와 **리팩토링 로드맵 이슈 [#24](https://github.com/WisdomIT/chzzk-vote/issues/24)** 를 먼저 읽으세요.

## 프로젝트

- **CHZZK VOTE** — 치지직(네이버 스트리밍) 채팅 연계 투표·추첨 서비스
- 스택: **Next.js 14 (App Router)** · TypeScript · styled-components · zustand · **yarn**
- 도메인: `vote`(숫자) / `donation`(도네) / `viewer`(추첨) / `roulette` + `config`

## 커밋 컨벤션 (필수)

**순수 [Conventional Commits](https://www.conventionalcommits.org/).** 버전·CHANGELOG·릴리스가 이 형식으로 자동화되므로 반드시 지킵니다.

> ⚠️ **gitmoji / 이모지 프리픽스 금지** (`✨ feat:` ❌). release-please가 이모지 프리픽스를 파싱하지 못해 해당 커밋이 버전업에서 누락됩니다.

- 형식: `<type>: <설명>` · 범위 필요 시 `<type>(<scope>): <설명>` · 파괴적 변경 `<type>!: <설명>`
- 주요 `type`:
  - `feat:` 기능 추가 (minor ↑)
  - `fix:` 버그 수정 (patch ↑)
  - `refactor:` · `perf:` · `style:` · `docs:` · `test:` · `ci:` · `build:` · `chore:` (버전 영향 없음)

```
feat: 다중 투표 동시 진행 기능 추가
fix: TTS 설정 화면 스크롤 누락 수정
refactor: 레이아웃 그룹 config/app 분리
chore: Next.js 15로 업데이트
```

## 브랜치 & PR 워크플로

- **모든 PR의 base 브랜치는 `dev`.** `master`는 릴리스 전용이며 직접 push 금지.
- **한 PR = 한 작업 단위** — 도메인/작업 경계를 넘지 않는다.
- PR 제목도 커밋 컨벤션(`<type>: ...`)을 따른다.
- PR 본문은 `.github/pull_request_template.md`를 따르고, 대응하는 작업 단위 이슈를 `Closes #N`으로 연결한다.
- **dev로는 squash merge.** 릴리스 시 **dev → master 는 merge commit**(squash 금지 — release-please가 개별 커밋을 파싱해야 하므로).

## 이슈 & 로드맵 프로토콜

- 에이전트를 통한 모든 작업은 **로드맵 이슈**와 **작업 단위 이슈**를 먼저 올린 뒤 그 위에서 진행한다.
- 작업 시작 전 **작업 단위 이슈 + 연결된 로드맵 이슈를 모두 읽는다** → 로드맵 맥락 안에서 결과를 만든다.
- **작업 단위 이슈는 상위 로드맵 이슈를 반드시 링크**한다(템플릿 필수 필드).
- 템플릿: `.github/ISSUE_TEMPLATE/` — 운영자용(`🛠️ 로드맵`/`작업 단위`), 사용자용(`🐛 버그`/`✨ 기능 제안`).

## 품질 게이트 & 로컬 개발

- PR은 CI **`verify`** (`yarn lint` + `yarn build`)를 통과해야 머지된다.
- **Node 22** (`package.json`의 `engines.node`).
- 로컬 설치: `yarn install` 시 **`FONTAWESOME_TOKEN`** 환경변수 필요(`.npmrc`가 FontAwesome 프라이빗 레지스트리 참조).
- 로컬 HTTPS 구동: `server.js`가 `cert/` 인증서를 사용.

## 릴리스

- **release-please**가 `master`를 감시 → Release PR 머지 시 태그 `vX.Y.Z` + GitHub Release 자동 생성.
- 버전은 커밋 `<type>` 기반으로 산정된다 → **커밋 컨벤션 준수 = 릴리스 정확도.**

## 배포

- Vercel 자동 배포는 **비활성화**(`vercel.json`), 배포는 **GitHub Actions**가 담당.
- `master` → production · `dev`/PR → preview.
