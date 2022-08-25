import { useState, useEffect, ChangeEvent, useContext } from "react";

import { NextRouter, useRouter } from "next/router";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";

export default function SimpleCard() {
  const router: NextRouter = useRouter();

  const { loginUser } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(login.username, login.password);
      if (response) {
        setIsLogin(true);
        router.push("/");
      }
      return response;
    } catch (err) {
      console.log(err, "login not authenticated");
    }
  };

  useEffect(() => {
    router.prefetch("/");
  }, []);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleClick}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="username"
                  value={login.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLogin({ ...login, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={login.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"} href="/auth/register">
                    Dont have account yet?
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isLogin}
                  loadingText="Logging in..."
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
