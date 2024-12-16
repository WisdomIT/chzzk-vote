import type { Metadata, Viewport } from "next";
import StyledProvider from "@/app/_components/StyledProvider";
import StyledThemeProvider from "./_components/StyledThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#00ffa3",
};

export const metadata: Metadata = {
  title: "CHZZK VOTE - 치지직 투표 추첨기",
  description:
    "치지직(네이버 스트리밍 플랫폼) 채팅 연계 추첨, 투표 서비스 CHZZK VOTE입니다",
  openGraph: {
    title: "CHZZK VOTE - 치지직 투표 추첨기",
    description:
      "치지직(네이버 스트리밍 플랫폼) 채팅 연계 추첨, 투표 서비스 CHZZK VOTE입니다",
    type: "website",
    locale: "ko_KR",
    url: "https://chzzk-vote.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledProvider>
          <StyledThemeProvider>{children}</StyledThemeProvider>
        </StyledProvider>
      </body>
      <GoogleAnalytics gaId="G-FH3J6K7Z1Y" />
    </html>
  );
}
