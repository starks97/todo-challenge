import { FC, useReducer, useEffect } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

import Cookie from "js-cookie";

export interface TodoState {
  todos: TodoProps[];
}

const TODO_INITIAL_STATE: TodoState = {
  todos: Cookie.get("todo") ? JSON.parse(Cookie.get("todo") || "") : [],
};

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoState, dispatch] = useReducer(TodoReducer, TODO_INITIAL_STATE);

  useEffect(() => {
    Cookie.set("todo", JSON.stringify(todoState.todos));
  }, [todoState.todos]);

  useEffect(() => {
    try {
      dispatch({
        type: "[Todo] - LoadTodo from cookies | storage",
        payload: todoState.todos,
      });
    } catch (error) {
      dispatch({
        type: "[Todo] - LoadTodo from cookies | storage",
        payload: [],
      });
    }
  }, []);

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

      const { task } = todoCreated;

      dispatch({
        type: "[Todo] -  Create a todo",
        payload: [...todoState.todos, { ...task }],
      });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const deleteTodo = (task: TodoProps) => {
    dispatch({
      type: "[Todo] - Delete Todo",
      payload: task,
    });
  };

  return (
    <TodoContext.Provider value={{ ...todoState, createTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
