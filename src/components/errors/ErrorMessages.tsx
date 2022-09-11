import { Box } from "@chakra-ui/react";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ErrorMessages({ children }: Props) {
  return (
    <Box color="red" fontSize="md" marginTop="1rem">
      {children}
    </Box>
  );
}
