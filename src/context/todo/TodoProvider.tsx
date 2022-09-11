import { FC, useReducer, useEffect, useContext } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

import { AuthContext } from "../auth";
import {
  handleCreateTodo_from_DB,
  handleCreateTodo_from_LS,
  handleDeleteTodo_from_DB,
  handleDeleteTodo_from_Ls,
  handleUpdateTodo_from_DB,
  handleUpdateTodo_from_Ls,
} from "./utils";

export interface TodoState {
  todos: TodoProps[];
}

const TODO_INITIAL_STATE: TodoState = {
  todos: [],
};

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoState, dispatch] = useReducer(TodoReducer, TODO_INITIAL_STATE);
  const { auth, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) return;

    if (!auth) {
      const todos = localStorage.getItem("todos") || "[]";
      if (todos) {
        dispatch({
          type: "[Todo] - LoadTodo from DB | storage",
          payload: JSON.parse(todos),
        });
      }
      return;
    }

    const getTodos = async () => {
      const response = await fetch("/api/todo/getTodos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response) return null;

      const { todos } = await response.json();

      dispatch({ type: "[Todo] - LoadTodo from DB | storage", payload: todos });
    };

    getTodos();
  }, [auth, isLoading]);

  const createTodo = async (
    title: string,
    description: string,
    color: string
  ) => {
    const args = {
      title,
      description,
      color,
      dispatch,
      todoState,
    };

    if (!auth) {
      return handleCreateTodo_from_LS(args);
    }
    const response = await handleCreateTodo_from_DB(args);

    return response;
  };

  const deleteTodo = async (todo: TodoProps) => {
    if (!auth) {
      return handleDeleteTodo_from_Ls({ dispatch, ...todo });
    }

    const response = await handleDeleteTodo_from_DB({ dispatch, ...todo });

    return response;
  };

  const updateTodo = async (todo: TodoProps) => {
    if (!auth) {
      return handleUpdateTodo_from_Ls({ dispatch, todoState, ...todo });
    }

    const response = await handleUpdateTodo_from_DB({
      dispatch,
      todoState,
      ...todo,
    });

    return response;
  };

  return (
    <TodoContext.Provider
      value={{ ...todoState, createTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
