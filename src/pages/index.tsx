import { TodoList } from "../components/home";
import { Navbar } from "../components/layouts";

import { useState, useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    console.log("domloaded");
  }, []);
  return (
    <>
      {domLoaded && (
        <>
          <Navbar />
          <TodoList />
        </>
      )}
    </>
  );
}
