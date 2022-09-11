import React from "react";

import { Container } from "@chakra-ui/react";

import { ChangePassword, Navbar, TagList } from "../components/cpanel";

type Props = {};

export default function cpanel({}: Props) {
  return (
    <>
      <Navbar />

      <Container marginTop="3rem" justifyContent="center">
        <ChangePassword />
        <TagList />
      </Container>
    </>
  );
}
