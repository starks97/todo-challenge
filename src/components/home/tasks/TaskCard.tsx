import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  ListItem,
  Checkbox,
  Flex,
  IconButton,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { Task } from "@prisma/client";
import { DeleteIcon } from "@chakra-ui/icons";
import { TodoContext } from "../../../context/todo";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { deleteTask, updateTask } = useContext(TodoContext);
  const [ischecked, setIsChecked] = useState<boolean>(task.completed);

  console.log(ischecked);

  const handleChecked = () => {
    setIsChecked(!ischecked);
    updateTask({ ...task, completed: !ischecked });
  };

  return (
    <ListItem m="0.8rem">
      <Grid gridTemplateColumns={"repeat(2, 1fr)"} alignItems="center" w="full">
        <GridItem>
          <Checkbox isChecked={ischecked} onChange={handleChecked}>
            {task.title}
          </Checkbox>
        </GridItem>
        <GridItem justifyItems="end">
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete"
            variant={"none"}
            onClick={() => deleteTask(task)}
          />
        </GridItem>
      </Grid>
    </ListItem>
  );
}
