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
  const { deleteTodo, updateTodo, todoSelected, setTodoSelected, todos } =
    useContext(TodoContext);

  const [initialTodoState, setInitialTodoState] = useState(todoSelected);

  const [tagsIds, setTagsIds] = useState(todoSelected.tagIds);

  //tasks

  const [taskCreated, setTaskCreated] = useState({
    title: "",
    completed: false,
  });

  useEffect(() => {
    if (initialTodoState.id !== todoSelected.id) {
      setInitialTodoState({ ...todoSelected });
    }
  }, [initialTodoState]);

  useEffect(() => {
    setTagsIds(todoSelected.tagIds);
  }, [todoSelected.tagIds]);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (todoSelected.color) {
      setColor(todoSelected.color);
    }
  }, [todoSelected]);

  const [color, setColor] = useState<string>(todoSelected.color);

  const handleEdit = () => {
    const newValues = {
      ...todoSelected,
      id: todoSelected.id,
      completed: todoSelected.completed,
      tagIds: tagsIds,
      tasks: todos.find((todo) => todo.id === todoSelected.id)!.tasks,
    };

    if (!todos.find((todo) => todo.id === todoSelected.id)) {
      return;
    }

    if (
      initialTodoState.title !== todoSelected.title ||
      initialTodoState.description !== todoSelected.description
    ) {
      updateTodo(newValues);
    }
    onClose();
  };

  return (
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

          {isLoggedIn === true ? (
            <SelectTags
              tagsIds={tagsIds}
              setTagsIds={setTagsIds}
              todo={todoSelected}
            />
          ) : (
            ""
          )}
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
