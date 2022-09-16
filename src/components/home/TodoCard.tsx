import React, { useContext, useMemo, useState } from "react";

import {
  Box,
  Text,
  GridItem,
  Tag,
  useColorModeValue,
  Stack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import CounterTask from "../../assets/counterTask.svg";

import Image from "next/image";
import { TodoProps, TodoContext } from "../../context/todo";

import { SelectTags, TagList } from "./tags";

import { AuthContext } from "../../context/auth";

interface IProps {
  todo: TodoProps;
  onOpen: () => void;
}

export default function TodoCard({ todo, onOpen }: IProps) {
  const [color, setColor] = useState<string>(todo.color);

  const tagsIds = useMemo(() => todo.tagIds, [todo]);

  return (
    <>
      <GridItem w="full">
        <Box
          bg={useColorModeValue("whiteAlpha.300", "whiteAlpha.100")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          onClick={() => onOpen()}
        >
          <Tag
            bg={color}
            w="full"
            borderBottomEndRadius={0}
            borderBottomStartRadius={0}
          />

          <TagList tagsIds={tagsIds} />

          <Stack
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
              {todo.title}
            </Text>
            <Flex alignItems="center" p={2} px={3} gap={2}>
              <Image src={CounterTask} width={30} height={30} alt="Counter" />
              <Text>0/3</Text>
            </Flex>
          </Stack>
        </Box>
      </GridItem>
    </>
  );
}
