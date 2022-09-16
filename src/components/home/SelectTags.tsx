import React, { useContext, useState } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  Button,
  Container,
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
    <Container marginTop="1rem" justifyContent="flex-end">
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Options"
          leftIcon={<AddIcon />}
          variant="none"
          size="lg"
          width="10%"
          justifyContent="flex-end"
        >
          Select Tags
        </MenuButton>
        <MenuList>
          <MenuOptionGroup title="Tags" type={"checkbox"}>
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
    </Container>
  );
}
