import React, { useContext } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { TodoContext, Filters, F } from "../../context/todo";

const pickFilter = Object.entries(Filters);

export default function FilterTags() {
  const { todos, setFilterBy } = useContext(TodoContext);

  const handleFilter = (filter: F) => {
    setFilterBy(filter);
  };
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Filter
      </MenuButton>

      <MenuList>
        {pickFilter.map(([filter, label]) => (
          <MenuItem onClick={() => handleFilter(filter as F)} key={label.label}>
            {label.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
