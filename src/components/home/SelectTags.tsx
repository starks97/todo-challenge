import React, { useContext, useState } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuOptionGroup,
} from "@chakra-ui/react";

import { TagContext } from "../../context/tag";
import { AddIcon } from "@chakra-ui/icons";
import TagSelected from "./TagSelected";
import { TodoProps } from "../../context/todo";

interface Props {
  setTagsIds: React.Dispatch<React.SetStateAction<string[]>>;
  tagsIds: string[];
  todo: TodoProps;
}

export default function SelectTags({ tagsIds, setTagsIds, todo }: Props) {
  const { tag } = useContext(TagContext);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AddIcon />}
        variant="outline"
        size="lg"
        width="10%"
      >
        Tag
      </MenuButton>
      <MenuList>
        <MenuOptionGroup title="Tags">
          {tag.map((tag) => (
            <TagSelected
              tag={tag}
              key={tag.id}
              setTagsIds={setTagsIds}
              tagsIds={tagsIds}
              todo={todo}
            />
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
