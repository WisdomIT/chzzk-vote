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

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
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
  width: 5px; /* 세로축 스크롤바 길이 */
  height: 5px; /* 가로축 스크롤바 길이 */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: var(--color-white-10);
}

.light ::-webkit-scrollbar-thumb {
  background-color: var(--color-black-10);
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
