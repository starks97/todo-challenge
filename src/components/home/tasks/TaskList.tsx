import React from "react";

import {
  Input,
  Button,
  List,
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  useColorModeValue,
  ListItem,
  Checkbox,
} from "@chakra-ui/react";

import Image from "next/image";

import AddTask from "../../../assets/AddTask.svg";

type Props = {};

export default function TaskList({}: Props) {
  return (
    <Flex marginTop="1rem" flexDirection="column">
      <Flex alignItems="center" justifyContent="flex-start" fontWeight="bold">
        <Image src={AddTask} width="25px" height="25px" />
        <Text color="black" fontSize="lg" marginLeft="0.3rem">
          Add your tasks
        </Text>
      </Flex>

      <Flex marginTop="0.5rem">
        <FormControl>
          <Input type="text" />
        </FormControl>
      </Flex>

      <Flex marginTop="0.6rem">
        <List>
          <ListItem m="0.8rem">
            <Checkbox>first task</Checkbox>
          </ListItem>
          <ListItem m="0.8rem">
            <Checkbox>first task</Checkbox>
          </ListItem>
        </List>
      </Flex>
    </Flex>
  );
}
