import React, { useContext, useState } from "react";

import {
  Box,
  Text,
  GridItem,
  Tag,
  useColorModeValue,
  Stack,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import CounterTask from "../../assets/counterTask.svg";

import Image from "next/image";
import { TodoProps, TodoContext } from "../../context/todo";
import { EditIcon } from "@chakra-ui/icons";

export default function TaskCard({ todo }: { todo: TodoProps }) {
  const { deleteTodo, updateTodo, todos } = useContext(TodoContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [color, setColor] = useState<string>(todo.color);

  const [data, setData] = useState({
    title: todo.title,
    description: todo.description,
    color: todo.color,
  });

  const handleEdit = () => {
    const newValues = { ...data, id: todo.id, completed: todo.completed };

    if (todo.title !== data.title && todo.description !== data.description) {
      updateTodo(newValues);
    }

    onClose();
  };

  return (
    <>
      <GridItem w="full">
        <Box
          bg={useColorModeValue("whiteAlpha.300", "whiteAlpha.100")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          onClick={() => onOpen()}
        >
          <Tag
            bg={color}
            w="full"
            borderBottomEndRadius={0}
            borderBottomStartRadius={0}
          />
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"start"}
          >
            <Text
              fontSize={"2xl"}
              fontWeight={500}
              p={2}
              px={3}
              color={useColorModeValue("gray.800", "white")}
            >
              {todo.title}
            </Text>
            <Flex alignItems="center" p={2} px={3} gap={2}>
              <Image src={CounterTask} width={30} height={30} />
              <Text>0/3</Text>
            </Flex>
          </Stack>
        </Box>
      </GridItem>

      <Modal onClose={handleEdit} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={onClose} />
          <Tag
            bg={color}
            w="full"
            borderBottomEndRadius={0}
            borderBottomStartRadius={0}
          />

          <ModalBody>
            <FormControl marginBottom="1.2rem">
              <FormLabel
                color={useColorModeValue("gray.800", "black")}
                fontSize="lg"
              >
                Title
              </FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={data.title}
                  fontSize="2xl"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  border="none"
                  onKeyPress={(e) => (e.key === "Enter" ? handleEdit() : null)}
                />
                <InputLeftElement children={<EditIcon />} />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel
                color={useColorModeValue("gray.800", "black")}
                fontSize="lg"
              >
                Description
              </FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={data.description}
                  fontSize="xl"
                  border="none"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  onKeyPress={(e) => (e.key === "Enter" ? handleEdit() : null)}
                />
                <InputLeftElement children={<EditIcon />} />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                deleteTodo(todo);
              }}
              bg="#de4237"
              _hover={{ bg: "#c72f24" }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
