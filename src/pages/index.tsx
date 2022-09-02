import { TaskList } from "../components/home";
import { Navbar } from "../components/layouts";

import { GetServerSideProps } from "next";
import { TaskTodo } from "../app/backend/todo";
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
          <TaskList  />
        </>
      )}
    </>
  );
}


