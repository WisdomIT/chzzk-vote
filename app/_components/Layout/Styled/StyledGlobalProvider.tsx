"use client";

import { createGlobalStyle } from "styled-components";

export const StyledGlobalProvider = createGlobalStyle`

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family};
  outline: none;
}

/* html/body의 높이 고정(100vh + overflow hidden)은 앱 모드 레이아웃((main)/(app))의
   AppModeGlobalStyle이 담당한다. 기본값은 웹 모드(문서 스크롤 허용). */
html,
body {
  max-width: 100vw;
}

body {
  background-color: ${({ theme }) => theme.colors.background01};
  color: ${({ theme }) => theme.colors.content};
}

::-moz-selection {
  background: ${({ theme }) => theme.colors.content50};
  color: inherit;
}
::selection {
  background: ${({ theme }) => theme.colors.content50};
  color: inherit;
}

::-webkit-scrollbar {
  width: 10px; /* 세로축 스크롤바 길이 */
  height: 10px; /* 가로축 스크롤바 길이 */
  background-color: ${({ theme }) => theme.colors.background01};
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.colors.content10};
  box-shadow: inset 0 0 0 2.5px ${({ theme }) => theme.colors.background01};
}

input {
  -webkit-user-select: auto;
  user-select: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

img,
a {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

object {
  pointer-events: none;
}

#__next {
  animation: appear 0.2s;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
