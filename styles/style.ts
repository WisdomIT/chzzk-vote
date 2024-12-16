import { styled, css, keyframes } from "styled-components";

export const size = {
  mobile: 768,
  tablet: 1300,
  desktop: 1920,
};

export const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};

export const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const darkColors = {
  border01: `rgba(255, 255, 255, 0.06)`,
  border02: `rgba(255, 255, 255, 0.1)`,
  background01: `rgb(20, 21, 23)`,
  background02: `rgb(55, 58, 63)`,
  background01Transparent: `rgba(20, 21, 23, 0.5)`,
  brand: `rgb(0, 255, 163)`,
  brandTransparent: `rgba(0, 255, 163, 0.3)`,
  content: `rgb(255, 255, 255)`,
  content10: `rgba(255, 255, 255, 0.1)`,
  content20: `rgba(255, 255, 255, 0.2)`,
  content30: `rgba(255, 255, 255, 0.3)`,
  content40: `rgba(255, 255, 255, 0.4)`,
  content50: `rgba(255, 255, 255, 0.5)`,
  content60: `rgba(255, 255, 255, 0.6)`,
  content70: `rgba(255, 255, 255, 0.7)`,
  content80: `rgba(255, 255, 255, 0.8)`,
  content90: `rgba(255, 255, 255, 0.9)`,
  black: `rgb(0, 0, 0)`,
  white: `rgb(255, 255, 255)`,
  red: `rgb(255, 56, 56)`,
};

const lightColors = {
  border01: `rgba(0, 0, 0, 0.1)`,
  border02: `rgba(0, 0, 0, 0.2)`,
  background01: `rgb(255, 255, 255)`,
  background02: `rgba(0, 0, 0, 0.1)`,
  background01Transparent: `rgba(255, 255, 255, 0.5)`,
  brand: `rgb(27, 179, 115)`,
  brandTransparent: `rgba(27, 179, 115, 0.3)`,
  content: `rgb(0, 0, 0)`,
  content10: `rgba(0, 0, 0, 0.1)`,
  content20: `rgba(0, 0, 0, 0.2)`,
  content30: `rgba(0, 0, 0, 0.3)`,
  content40: `rgba(0, 0, 0, 0.4)`,
  content50: `rgba(0, 0, 0, 0.5)`,
  content60: `rgba(0, 0, 0, 0.6)`,
  content70: `rgba(0, 0, 0, 0.7)`,
  content80: `rgba(0, 0, 0, 0.8)`,
  content90: `rgba(0, 0, 0, 0.9)`,
  black: `rgb(0, 0, 0)`,
  white: `rgb(255, 255, 255)`,
  red: `rgb(255, 56, 56)`,
};

const fonts = {
  family: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
  size: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    ["2xl"]: "24px",
    ["3xl"]: "32px",
    ["4xl"]: "36px",
    ["5xl"]: "40px",
    ["6xl"]: "48px",
    ["7xl"]: "60px",
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  fontWeight: {
    regular: 400,
    semibold: 600,
    extrabold: 800,
  },
};

const rounded = {
  sm: "4px",
  base: "8px",
  full: "100%",
  half: "50%",
};

const animation = {
  appear: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
  appearUp: keyframes`
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  `,
  appearDown: keyframes`
    0% {
      opacity: 0;
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(10px);
    }
  `,
  viewers: keyframes`
    0% {
      opacity: 0;
      height: 0px;
    }
    100% {
      opacity: 1;
      height: 400px;
    }
  `,
  slotViewerDiv: keyframes`
    0% {
      height: 180px;
    }
    100% {
      height: 100px;
    }
  `,
  slotViewerBadge: keyframes`
    0% {
      width: 60px;
      height: 60px;
    }
    100% {
      width: 40px;
      height: 40px;
    }
  `,
  slotViewerName: keyframes`
    0% {
      font: 800 60px/1 var(--font-default);
    }
    100% {
      font: 800 40px/1 var(--font-default);
    }
  `,
  chatbox: keyframes`
    0% {
      opacity: 0;
      height: 0px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    100% {
      opacity: 1;
      height: 400px;
      margin-top: 20px;
      margin-bottom: 40px;
    }
  `,
  btnHeight: keyframes`
    0% {
      opacity: 0;
      height: 0px;
      overflow: hidden;
      border: 0px solid var(--color-brand);
    }
    100% {
      opacity: 1;
      height: 80px;
      overflow: hidden;
      border: 3px solid var(--color-brand);
    }
  `,
};

export const lightTheme = {
  colors: lightColors,
  fonts: fonts,
  rounded: rounded,
  animation: animation,
} as const;

export const darkTheme = {
  colors: darkColors,
  fonts: fonts,
  rounded: rounded,
  animation: animation,
};

export type Theme = typeof lightTheme;
