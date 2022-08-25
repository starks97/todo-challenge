import React from "react";

import { Box, Container, Grid, Text } from "@chakra-ui/react";

import TaskCard from "./TaskCard";
import { ToDo } from "@prisma/client";

interface Props  {
  data: ToDo
};

export default function TaskList() {
  return (
    <Container maxW="90rem" marginTop="3rem">
      <Grid
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridGap={{ base: "1rem", md: "2rem" }}
      >
        <TaskCard color={""} />
      </Grid>
    </Container>
  );
}
