import React, { useContext, useMemo } from "react";

import { Container, Grid, useDisclosure, Text, Flex } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";

import TodoCard from "./TodoCard";

import { TodoContext, TodoProps, Filters, F } from "../../context/todo";
import TodoModal from "./TodoModal";


export default function TodoList() {
  const { todos, setTodoSelected, filterBy } = useContext(TodoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (todo: TodoProps) => {
    setTodoSelected({ ...todo });
    onOpen();
  };


  const filterTodos = useMemo(() => {
    return Filters[filterBy].callback(todos);
  },[todos, filterBy])


  return (
    <Container maxW="90rem" marginTop="2rem" justifyContent="center">
      <Grid
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridGap={{ base: "1rem", md: "2rem" }}
        justifyItems={"center"}
        gap={5}
      >
        {filterTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} onOpen={() => handleOpen(todo)} />
        ))}
      </Grid>
      <TodoModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
