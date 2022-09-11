import { EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  GridItem,
  Tag,
  useColorModeValue,
  useDisclosure,
  InputLeftElement,
  FormControl,
  ModalFooter,
  ModalBody,
  InputGroup,
  Button,
  ModalContent,
  Modal,
  Input,
  FormLabel,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TagContext, TagProps } from "../../context/tag";
import { ColorPicker } from "../Modal";

export default function TagCard({ tag }: { tag: TagProps }) {
  const { updateTag, deleteTag } = useContext(TagContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [color, setColor] = useState<string>(tag.color);

  const [title, setTitle] = useState<string>(tag.title);

  const handleEdit = () => {
    const newValues = { title, id: tag.id, userId: tag.userId, color };

    if (tag.title !== title || tag.color !== color) {
      updateTag(newValues);
    }

    onClose();

    return;
  };

  return (
    <>
      <GridItem w="full">
        <Flex gap={2} color={useColorModeValue("white", "white")}>
          <Tag
            bg={color}
            w="full"
            sx={{ width: { base: "full", md: "full" } }}
            onClick={() => onOpen()}
          >
            {tag.title}
          </Tag>
        </Flex>
      </GridItem>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={onClose} />

          <ModalBody marginTop="2rem">
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
                  value={title}
                  fontSize="2xl"
                  onChange={(e) => setTitle(e.target.value)}
                  border="none"
                />
                <InputLeftElement children={<EditIcon />} />
              </InputGroup>
            </FormControl>

            <ColorPicker color={color} setColor={setColor} />
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                deleteTag(tag);
              }}
              bg="#de4237"
              _hover={{ bg: "#c72f24" }}
            >
              Delete
            </Button>
            <Button
              onClick={() => handleEdit()}
              bg="#07070b"
              _hover={{ bg: "#5267de" }}
              mr={3}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
