import { TaskList } from "../components/home";
import { Navbar } from "../components/layouts";

import { GetServerSideProps } from "next";
import { TaskTodo } from "../app/backend/todo";

type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <Navbar />
      <TaskList  />
    </>
  );
}

/*export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await TaskTodo.getTodos();

  return {
    props: {
      data,
    },
  };
};*/
