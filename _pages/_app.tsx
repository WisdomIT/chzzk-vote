import "@/styles/globals.css";
import type { AppProps } from "next/app";
import StyledComponentsRegistry from "@/app/_components/StyledProvider";
import Layout from "@/components/Layout";
import { useGlobalOptionStore } from "@/lib/zustand";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useGlobalOptionStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <StyledComponentsRegistry>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyledComponentsRegistry>
  );
}
