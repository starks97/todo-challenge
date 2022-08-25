import React, { useState } from "react";

import { CirclePicker } from "react-color";

interface Props {
  color: string;
  setColor: (value: string) => void;
}

export default function ColorPicker({ color, setColor }: Props) {
  return (
    <CirclePicker
      color={color}
      onChangeComplete={(color) => setColor(color.hex)}
      colors={[
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#455562",
      ]}
    />
  );
}
