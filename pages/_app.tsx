import "@/styles/globals.css";
import type { AppProps } from "next/app";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  
  return <StyledComponentsRegistry>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </StyledComponentsRegistry>
}
