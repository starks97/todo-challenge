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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLinks } from "../navbar";
import { FilterTags, SearchInput } from "../navbar";
import { AddTaskModal } from "../Modal";
import { AuthContext } from "../../context/auth";
import { User } from "@prisma/client";

export default function Navbar() {
  const { isLoggedIn, auth } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <SearchInput />
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
                      <NavLinks children={"Profile"} url={"/cpanel"} />
                      <NavLinks children={"Log Out"} url={"#"} />
                    </>
                  ) : (
                    <>
                      <NavLinks children={"Login"} url={"/auth/login"} />
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
