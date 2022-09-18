import React, { useMemo, useState } from "react";

import {
  Box,
  Text,
  GridItem,
  Tag,
  useColorModeValue,
  Stack,
  Flex,
} from "@chakra-ui/react";

import CounterTask from "../../assets/counterTask.svg";

import Image from "next/image";
import { TodoProps } from "../../context/todo";

import { TagList } from "./tags";
import { Task } from "@prisma/client";

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

            <CompletedTasks tasks={todo.tasks} />
          </Stack>
        </Box>
      </GridItem>
    </>
  );
}

interface ICompletedTasks {
  tasks: Task[];
}

function CompletedTasks({ tasks }: ICompletedTasks) {
  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed === true).length;
  }, [tasks]);
  if (tasks.length === 0) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Image src={CounterTask} width="25px" height="25px" />
        <Text color="whiteAlpha.700" fontSize="lg" marginLeft="0.3rem">
          No tasks
        </Text>
      </Flex>
    );
  }

  if (completedTasks === tasks.length) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Image src={CounterTask} width="25px" height="25px" />
        <Text color="whiteAlpha.700" fontSize="lg" marginLeft="0.3rem">
          All tasks completed
        </Text>
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" p={2} px={3} gap={2}>
      <Image src={CounterTask} width={30} height={30} alt="Counter" />
      <Text>
        {completedTasks}/{tasks.length}
      </Text>
    </Flex>
  );
}
