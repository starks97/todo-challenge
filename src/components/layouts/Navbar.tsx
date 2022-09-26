import React, { Component, useContext } from "react";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { NextRouter, useRouter } from "next/router";


import { NavLinks } from "../navbar";
import { FilterTags } from "../navbar";
import { AddTaskModal } from "../Modal";
import { AuthContext } from "../../context/auth";

export default function Navbar() {
  const { isLoggedIn, auth, logoutUser } = useContext(AuthContext);

  const router: NextRouter = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOut = () => {
    logoutUser();
    router.reload();
  }

  return (
    <>
      <Box bg={useColorModeValue("#12110f", "gray.700")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            sx={{ marginLeft: { base: "none", md: "2rem" } }}
          >
            <Stack direction={"row"} spacing={3}>
              <AddTaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
              <FilterTags />
            </Stack>
          </Flex>

          <Flex
            alignItems={"center"}
            sx={{ marginRight: { base: "none", md: "2rem" } }}
          >
            <Stack direction={"row"} spacing={5}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu preventOverflow>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{auth?.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {isLoggedIn ? (
                    <>
                      <NavLinks url={"/cpanel"}>Profile</NavLinks>
                      <MenuItem onClick={handleOut}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <NavLinks url={"/auth/login"}>Login</NavLinks>
                    </>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
