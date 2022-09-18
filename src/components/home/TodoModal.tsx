import React, { useContext, useEffect, useState } from "react";

import { EditIcon } from "@chakra-ui/icons";
import {
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
  Tag,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import { TaskList } from "./tasks";

import { SelectTags } from "./tags";

import { TodoContext } from "../../context/todo";
import { AuthContext } from "../../context/auth";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoModal({ isOpen, onClose }: IProps) {
  const { deleteTodo, updateTodo, todoSelected, setTodoSelected } =
    useContext(TodoContext);

  //tasks

  const [taskCreated, setTaskCreated] = useState({
    title: "",
    completed: false,
  });

  const { isLoggedIn } = useContext(AuthContext);

  const handleEdit = () => {
    updateTodo(todoSelected);

    onClose();
  };

  return (
    <Modal
      onClose={handleEdit}
      isOpen={isOpen}
      isCentered
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={handleEdit} />
        <Tag
          bg={todoSelected.color}
          w="full"
          borderBottomEndRadius={0}
          borderBottomStartRadius={0}
        />

        <ModalBody>
          <FormControl marginBottom="1.2rem">
            <FormLabel
              color={useColorModeValue("gray.800", "black")}
              fontSize="lg"
              fontWeight="bold"
            >
              Title
            </FormLabel>
            <InputGroup>
              <Input
                type="text"
                value={todoSelected.title}
                fontSize="lg"
                onChange={(e) =>
                  setTodoSelected({ ...todoSelected, title: e.target.value })
                }
                border="none"
                onKeyPress={(e) => (e.key === "Enter" ? handleEdit() : null)}
              />
              <InputLeftElement>
                <EditIcon />
              </InputLeftElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel
              color={useColorModeValue("gray.800", "black")}
              fontSize="lg"
              fontWeight="bold"
            >
              Description
            </FormLabel>
            <InputGroup>
              <Input
                type="text"
                value={todoSelected.description}
                fontSize="lg"
                border="none"
                onChange={(e) =>
                  setTodoSelected({
                    ...todoSelected,
                    description: e.target.value,
                  })
                }
                onKeyPress={(e) => (e.key === "Enter" ? handleEdit() : null)}
              />
              <InputLeftElement>
                <EditIcon />
              </InputLeftElement>
            </InputGroup>
          </FormControl>

          <TaskList taskCreated={taskCreated} setTaskCreated={setTaskCreated} />

          {isLoggedIn === true ? <SelectTags todo={todoSelected} /> : ""}
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              deleteTodo(todoSelected);
              onClose();
            }}
            bg="#de4237"
            _hover={{ bg: "#c72f24" }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
