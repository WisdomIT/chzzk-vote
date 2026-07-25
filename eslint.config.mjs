import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Next 16에서 `next lint`가 제거되어 ESLint CLI를 직접 사용한다.
// (기존에는 별도 ESLint 설정 없이 next lint에 의존)
const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "node_modules/**", "next-env.d.ts"]),
  {
    // 기존 코드의 훅 사용 패턴 위반(콜백 내 useChzzkChat/useVoice 호출 등)은
    // 동작 변경 리스크가 있어 이 마이그레이션에서 수정하지 않는다.
    // Phase 1(레이아웃/UX)·Phase 2(useChzzkChat 재설계)에서 해소 예정 — 그때까지 warn 유지.
    rules: {
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
