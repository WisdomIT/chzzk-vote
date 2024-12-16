"use client";

import { ThemeProvider } from "styled-components";
import { useGlobalOptionStore } from "@/lib/zustand";
import { darkTheme, lightTheme } from "@/styles/style";

export default function StyledThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useGlobalOptionStore();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}
