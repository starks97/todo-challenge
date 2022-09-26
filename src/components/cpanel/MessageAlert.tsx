import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
  } from '@chakra-ui/react';
  
  type F = string | string[] | number;
  interface Props<F> {
    title: F
    message: F;
  }
  
  export default function MessageAlert({ title, message }: Props<F>) {
    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{message}</AlertDescription>ß
      </Alert>
    );
  }