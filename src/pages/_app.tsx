
import type { AppProps } from "next/app";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { theme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;


