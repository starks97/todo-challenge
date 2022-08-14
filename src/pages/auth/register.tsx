import React from "react";
import { Navbar, SignUp } from "../../components/layouts";

type Props = {};

export default function register({}: Props) {
  return (
    <>
      <Navbar />
      <SignUp />
    </>
  );
}
