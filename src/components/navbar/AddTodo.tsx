import { MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import React from "react";

type Props = {};

export default function AddTodo({}: Props) {
  return (
    <Button>
      {" "}
      <AddIcon />
    </Button>
  );
}
