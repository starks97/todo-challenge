import React from "react";
import { Navbar, Sign } from "../../components/layouts";

type Props = {};

export default function login({}: Props) {
  return (
    <>
      <Navbar />
      <Sign />
    </>
  );
}
