import { AddIcon } from "@chakra-ui/icons";
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalHeader,
  FormControl,
  FormLabel,
  ModalFooter,
  Box,
  Tag,
  Checkbox,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { ChangeEvent, useContext, useState } from "react";
import ColorPicker from "./ColorPicker";

import { TodoContext } from "../../context/todo";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onOpen, onClose }: Props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { createTodo } = useContext(TodoContext);

  const [color, setColor] = useState("");

  const [isCreatedTask, setIsCreatedTask] = useState<boolean>(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreatedTask(true);

      const response = await createTodo(data.title, data.description, color);

      setIsCreatedTask(false);
      setData({ title: "", description: "", completed: false });

      if (!response) {
        throw new Error("Something went wrong");
      }

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        {" "}
        <AddIcon />
      </Button>

      <Box
        as={Modal}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <form onSubmit={handleForm}>
          <ModalContent>
            <Tag bg={color} borderRadius="none" h="0.5rem" />
            <ModalHeader>Create your todo</ModalHeader>

            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="textarea"
                  ref={initialRef}
                  placeholder="Title"
                  value={data.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, title: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  value={data.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </FormControl>
              <Box
                marginTop={"2rem"}
                display="flex"
                flexDirection="column"
                gap="2"
              ></Box>
              <Flex marginTop="2rem">
                <ColorPicker color={color} setColor={setColor} />
              </Flex>
            </ModalBody>

            <ModalFooter borderTopColor={"white"}>
              <Box borderTopColor={"white"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  isLoading={isCreatedTask}
                  loadingText="Creating task..."
                  onClick={onClose}
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Box>
            </ModalFooter>
          </ModalContent>
        </form>
      </Box>
    </>
  );
}
