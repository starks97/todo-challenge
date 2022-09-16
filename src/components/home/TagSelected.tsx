import React, { useContext, useState } from "react";

import { MenuItem } from "@chakra-ui/react";

import { TagProps } from "../../context/tag";
import { TodoContext, TodoProps } from "../../context/todo";

interface Props {
  setTagsIds: React.Dispatch<React.SetStateAction<string[]>>;
  tagsIds: string[];
  tag: TagProps;
  todo: TodoProps;
}

export default function TagSelected({ tag, tagsIds, setTagsIds, todo }: Props) {
  const { setTag } = useContext(TodoContext);

  const handleCheck = () => {
    if (tagsIds.includes(tag.id)) {
      setTagsIds(tagsIds.filter((id) => id !== tag.id));
    } else {
      setTagsIds([...tagsIds, tag.id]);
    }

    setTag({ ...todo, tagIds: [...tagsIds, tag.id] });
  };

  return (
    <MenuItem value={tag.title} bg={tag.color} onClick={handleCheck}>
      {tag.title}
    </MenuItem>
  );
}


