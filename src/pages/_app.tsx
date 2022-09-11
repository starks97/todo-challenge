import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../themes";
import { AuthProvider } from "../context/auth";
import { TodoProvider } from "../context/todo";
import { TagProvider } from "../context/tag";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TagProvider>
        <TodoProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </TodoProvider>
      </TagProvider>
    </AuthProvider>
  );
}

export default MyApp;
