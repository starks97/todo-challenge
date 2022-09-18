import React, { Dispatch, SetStateAction, useContext, useMemo } from "react";

import {
  Input,
  List,
  Flex,
  Text,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";

import Image from "next/image";

import AddTask from "../../../assets/AddTask.svg";

import TaskCard from "./TaskCard";
import { TodoContext } from "../../../context/todo";
import { Task } from "@prisma/client";

interface Props {
  taskCreated: { title: string; completed: boolean };
  setTaskCreated: Dispatch<
    SetStateAction<{ title: string; completed: boolean }>
  >;
}

export default function TaskList({ taskCreated, setTaskCreated }: Props) {
  const { createTask, todoSelected, todos } = useContext(TodoContext);

  const handleForm = async () => {
    try {
      const response = await createTask(
        taskCreated.title,
        taskCreated.completed
      );

      setTaskCreated({ title: "", completed: false });

      if (!response) {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const taskState = useMemo(() => {
    const todo = todos.find((todo) => todo.id === todoSelected.id)!;

    return todo.tasks;
  }, [todos]);

  return (
    <Flex marginTop="1rem" flexDirection="column">
      <Flex alignItems="center" justifyContent="flex-start" fontWeight="bold">
        <Image src={AddTask} width="25px" height="25px" />
        <Text color="black" fontSize="lg" marginLeft="0.3rem">
          Add your tasks
        </Text>
      </Flex>

      <Flex marginTop="0.5rem">
        <FormControl>
          <Input
            type="text"
            value={taskCreated.title}
            onChange={(e) =>
              setTaskCreated({ ...taskCreated, title: e.target.value })
            }
            onKeyPress={(e) => (e.key === "Enter" ? handleForm() : null)}
          />
        </FormControl>
      </Flex>

      <List>
        {taskState.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </List>
    </Flex>
  );
}
