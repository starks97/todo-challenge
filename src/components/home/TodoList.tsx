import React, { useContext } from "react";

import { Box, Container, Grid, Text } from "@chakra-ui/react";

import TaskCard from "./TodoCard";

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
        {Object.values(todos).map((todo) => (
          <TaskCard todo={todo} key={todo.id} />
        ))}
      </Grid>
    </Container>
  );
}
