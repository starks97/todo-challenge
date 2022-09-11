import React from 'react'

import Link from "next/link";

import {
  Box,

  Button,
  useColorModeValue,
 
} from "@chakra-ui/react";
import { ArrowLeftIcon } from '@chakra-ui/icons';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <Box bg={useColorModeValue("gray.700", "gray.600")} p="0.5rem" w="full">
        <Box>
          <Link href="/">
            <Button
              variant="solid"
              bg="#0b0707b2"
              color={useColorModeValue("white", "white")}
              _hover={{ bg: "rgba(0,0,0,0.7)", color: "gray" }}
              size="lg"
              aria-label={"home"}
              leftIcon={<ArrowLeftIcon />}
            >
              Home
            </Button>
          </Link>
        </Box>
      </Box>
  )
}