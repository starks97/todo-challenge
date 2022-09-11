import { Dispatch } from "react";
import { TodoProps } from "../TodoContext";
import { TodoState } from "../TodoProvider";

import { TodoActionType, TodoReducer } from "../todoReducer";

interface Props {
  title: string;
  description: string;
  color: string;
  dispatch: Dispatch<TodoActionType>;
  todoState: TodoState;
}

export const handleCreateTodo_from_DB = async ({
  title,
  description,
  color,
  dispatch,
  todoState,
}: Props): Promise<boolean | null> => {
  try {
    const response = await fetch("/api/todo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, color }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const todoCreated = await response.json();

    const { task } = todoCreated;

    dispatch({
      type: "[Todo] -  Create a todo",
      payload: [...todoState.todos, task],
    });

    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};


