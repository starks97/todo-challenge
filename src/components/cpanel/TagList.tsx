import React, { useContext } from "react";

import {
  Container,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { TagCard } from ".";

import { TagContext } from "../../context/tag";
import { AddTagModal } from "../Modal";

type Props = {};

export default function TagList({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tag } = useContext(TagContext);
  return (
    <Flex
      flexDirection="column"
      backgroundImage="linear-gradient(11deg, rgba(10,9,32,1) 0%, rgba(41,40,52,1) 49%, rgba(0,0,0,1) 100%)"
      p="8"
      borderRadius="1rem"
      boxShadow="2px white"
    >
      <Text
        fontSize="2xl"
        marginBottom="7"
        color={useColorModeValue("white", "white")}
      >
        My Tags
      </Text>
      <Flex gap={2}>
        <Grid
          gridTemplateRows={"repeat(1, 1fr)"}
          gridGap={2}
          w="80rem"
          marginBottom={"2rem"}
        >
          {tag?.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </Grid>
      </Flex>
      <AddTagModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
}
