import React, { useContext } from "react";

import { MenuItem } from "@chakra-ui/react";

import { TagProps } from "../../../context/tag";
import { TodoContext, TodoProps } from "../../../context/todo";

interface Props {
  tag: TagProps;
  todo: TodoProps;
}

export default function TagSelected({ tag, todo }: Props) {
  const { setTag } = useContext(TodoContext);

  const handleCheck = () => {
    if (todo.tagIds.includes(tag.id)) {
      todo.tagIds = todo.tagIds.filter((id) => id !== tag.id);
    } else {
      todo.tagIds = [...todo.tagIds, tag.id];
    }

    setTag(todo);
  };

  return (
    <MenuItem value={tag.title} bg={tag.color} onClick={handleCheck}>
      {tag.title}
    </MenuItem>
  );
}
