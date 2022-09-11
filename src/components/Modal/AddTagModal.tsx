import React, { ChangeEvent, useContext, useState } from "react";

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
  Flex,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import ColorPicker from "./ColorPicker";
import { TagContext } from "../../context/tag";
import { TodoContext } from "../../context/todo";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function AddTagModal({ isOpen, onOpen, onClose }: Props) {
  const { createTag } = useContext(TagContext);

  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  const [color, setColor] = useState("");

  const [isCreatedTag, setIsCreatedTag] = useState<boolean>(false);

  const [data, setData] = useState({
    title: "",
    toDoId: "",
  });

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreatedTag(true);

      const response = await createTag(data.title, color, data.toDoId);

      setIsCreatedTag(false);
      setData({ title: "", toDoId: "" });

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
            <ModalHeader>Create your Tag</ModalHeader>

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
                  isLoading={isCreatedTag}
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
