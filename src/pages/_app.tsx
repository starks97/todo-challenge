import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../themes";
import { AuthProvider } from "../context/auth";
import { TodoProvider } from "../context/todo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TodoProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </TodoProvider>
    </AuthProvider>
  );
}

export default MyApp;
