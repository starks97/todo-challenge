import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../themes";
import { AuthProvider } from "../context/auth";
import { TodoProvider } from "../context/todo";
import { TagProvider } from "../context/tag";
import { TaskProvider } from "../context/tasks";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TagProvider>
        <TodoProvider>
          <TaskProvider>
            <ChakraProvider resetCSS theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </TaskProvider>
        </TodoProvider>
      </TagProvider>
    </AuthProvider>
  );
}

export default MyApp;
