import React, { ChangeEvent, useState } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from "@chakra-ui/react";
import MessageAlert from "./MessageAlert";


export default function ChangePassword() {

  const toast = useToast()

  const [newPassword, setNewPassword] = useState({
    password: "",
  });

  const handleChangePassword = async () => {

    try{
      const response = await fetch("/api/auth/update_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
      })
      if(!response.ok){
        toast({
          position: "top-right",
          render: () => (
            <MessageAlert
              title={"Error!"}
              message={"Your Password is not updated"}
            />
          ),
        });
      }
      toast({
        position: "top-right",
        render: () => (
          <MessageAlert
            title={"Aplication Submitted !"}
            message={"Your Password was change. Have a nice day !"}
          />
        ),
      });
      return response

    }catch(e){
      console.log(e)
      return null
    }

  } 

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex
      flexDirection="column"
      backgroundImage="linear-gradient(11deg, rgba(10,9,32,1) 0%, rgba(41,40,52,1) 49%, rgba(0,0,0,1) 100%)"
      p="8"
      borderRadius="1rem"
      boxShadow="2px white"
      marginBottom="3rem"
      gap={5}
    >
      <Text
        fontSize="2xl"
        marginBottom="7"
        color={useColorModeValue("white", "white")}
      >
        Reset your Password
      </Text>

      <Box marginTop="1rem">
        <FormControl>
          <FormLabel color={useColorModeValue("white", "white")}>
            NewPassword
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={newPassword.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword({ ...newPassword, password: e.target.value })
              }
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Flex flexDirection="column">
        <Button type="submit" onClick={() => handleChangePassword}>
          Change
        </Button>
      </Flex>
    </Flex>
  );
}
