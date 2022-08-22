import { useCallback, useContext, useEffect } from "react";

import { NextRouter, useRouter } from "next/router";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context";

export default function SignUp() {
  const router: NextRouter = useRouter();

  const { registerUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(data.username, data.password);
      if (response) {
        setIsRegister(true);
        router.push("/auth/login");
      }
      return response;
    } catch (e) {
      console.log(e, "error form not valid");
    }
  };

  useEffect(() => {
    router.prefetch("/auth/login");
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={""} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
              <FormControl id="username" isRequired={true}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="username"
                  value={data.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isRegister}
                >
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Button variant="none">
                    <Link color={"blue.400"} href="/auth/login">
                      Login
                    </Link>
                  </Button>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
