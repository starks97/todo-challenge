import React from "react";

import Link from "next/link";

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Text,
  FormControl,
  Input,
  FormLabel,
  Grid,
  GridItem,
  Tag,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, ArrowLeftIcon } from "@chakra-ui/icons";

type Props = {};

export default function cpanel({}: Props) {
  return (
    <>
      <Box bg={useColorModeValue("gray.700", "gray.600")} p="0.5rem">
        <Flex>
          <Box>
            <Link href="/">
              <Button
                variant="solid"
                bg="#0b0707b2"
                _hover={{ bg: "rgba(0,0,0,0.7)", color: "gray" }}
                size="lg"
                aria-label={"home"}
                leftIcon={<ArrowLeftIcon />}
              >
                Home
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>

      <Grid marginTop="1rem" gridTemplateRows={"repeat(2, 1fr)"} gridGap={20}>
        <GridItem w="50%" marginLeft="5rem">
          <Flex
            flexDirection="column"
            backgroundImage="linear-gradient(11deg, rgba(10,9,32,1) 0%, rgba(41,40,52,1) 49%, rgba(0,0,0,1) 100%)"
            p="8"
            borderRadius="1rem"
          >
            <Text fontSize="2xl" marginBottom="7">
              Reset your Password
            </Text>
            <Box>
              <FormControl>
                <FormLabel>OldPassword</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box marginTop="1rem">
              <FormControl>
                <FormLabel>NewPassword</FormLabel>
                <Input />
              </FormControl>
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="50%" marginLeft="5rem">
          <Flex
            flexDirection="column"
            backgroundImage="linear-gradient(11deg, rgba(10,9,32,1) 0%, rgba(41,40,52,1) 49%, rgba(0,0,0,1) 100%)"
            p="8"
            borderRadius="1rem"
            boxShadow="white"
          >
            <Text fontSize="2xl" marginBottom="7">
              My Tags
            </Text>
            <Flex gap={2}>
              <Flex gap={2}>
                <Tag bg={"red"}>Backend</Tag>
                <Tag bg={"green"}>Frontend</Tag>
                <Tag bg={"yellow"}>API</Tag>
              </Flex>
              <IconButton icon={<AddIcon />} aria-label={"add tag"}></IconButton>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
