import { FC, useReducer, useEffect } from "react";
import { TaskProps, TodoContext, TodoReducer } from ".";

export interface TodoState {
  todo: TaskProps[];
}

const TODO_INITIAL_STATE: TodoState = {
  todo: [],
};

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoState, dispatch] = useReducer(TodoReducer, TODO_INITIAL_STATE);

  const createTodo = async (
    title: string,
    description: string,
    color: string
  ): Promise<boolean | null> => {
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
      dispatch({ type: "[Todo] -  Create a todo", payload: todoCreated });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <TodoContext.Provider value={{ ...todoState, createTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
