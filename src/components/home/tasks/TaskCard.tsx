import React, { Dispatch, SetStateAction, useState } from "react";

import { ListItem, Checkbox } from "@chakra-ui/react";
import { Task } from "@prisma/client";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const handleChecked = () => {};

  return (
    <ListItem m="0.8rem">
      <Checkbox>{task.title}</Checkbox>
    </ListItem>
  );
}
