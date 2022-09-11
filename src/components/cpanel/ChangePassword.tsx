import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function ChangePassword({}: Props) {
  return (
    <Flex
      flexDirection="column"
      backgroundImage="linear-gradient(11deg, rgba(10,9,32,1) 0%, rgba(41,40,52,1) 49%, rgba(0,0,0,1) 100%)"
      p="8"
      borderRadius="1rem"
      boxShadow="2px white"
      marginBottom="3rem"
    >
      <Text
        fontSize="2xl"
        marginBottom="7"
        color={useColorModeValue("white", "white")}
      >
        Reset your Password
      </Text>
      <Box>
        <FormControl>
          <FormLabel color={useColorModeValue("white", "white")}>
            OldPassword
          </FormLabel>
          <Input color={useColorModeValue("white", "white")} />
        </FormControl>
      </Box>
      <Box marginTop="1rem">
        <FormControl>
          <FormLabel color={useColorModeValue("white", "white")}>
            NewPassword
          </FormLabel>
          <Input color={useColorModeValue("white", "white")} />
        </FormControl>
      </Box>
    </Flex>
  );
}
