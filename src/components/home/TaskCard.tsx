import React from "react";

import {
  Box,
  Container,
  Grid,
  Text,
  GridItem,
  Tag,
  useColorModeValue,
  Stack,
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import CounterTask from "../../assets/counterTask.svg";

import Image from "next/image";

interface Props{
  color: string
}

export default function TaskCard({color}: Props) {
  return (
    <GridItem>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("whiteAlpha.300", "whiteAlpha.100")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Tag
          bg={color}
          w="full"
          borderBottomEndRadius={0}
          borderBottomStartRadius={0}
        />
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"start"}
        >
          <Text
            fontSize={"2xl"}
            fontWeight={500}
            p={2}
            px={3}
            color={useColorModeValue("gray.800", "white")}
          >
            My first task
          </Text>
          <Flex alignItems="center" p={2} px={3} gap={2}>
            <Image src={CounterTask} width={30} height={30} />
            <Text>0/3</Text>
          </Flex>
        </Stack>
      </Box>
    </GridItem>
  );
}
