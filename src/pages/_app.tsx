import { YoutubeContextProvider } from "@/hooks/urlcontext";
import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NextUIProvider>
    <YoutubeContextProvider>
      <Component {...pageProps} />
    </YoutubeContextProvider>
  </NextUIProvider>
);

export default MyApp;
