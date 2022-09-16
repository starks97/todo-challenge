import React, { useContext } from "react";

import { Container, Grid } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";

import TodoCard from "./TodoCard";

import { TodoContext } from "../../context/todo";

export default function TaskList() {
  const { todos } = useContext(TodoContext);

  return (
    <Container maxW="90rem" marginTop="3rem" justifyContent="center">
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
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </Grid>
    </Container>
  );
}
